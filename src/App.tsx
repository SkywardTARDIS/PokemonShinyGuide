import React, { useState } from "react";
import "./App.css";
import Spiritomb from "./assets/images/Spiritomb.png";
import Shuckle from "./assets/images/Shuckle.png";
import { Button } from "react-bootstrap";
import { ChangeLog } from "./components/ChangeLog";
import dexCounts from "./assets/jsons/dexCounts.json";
import { CalculatorWrapper } from "./components/CalculatorWrapper";
import { LivingDexWrapper } from "./components/LivingDexWrapper";
import { Pokedex, ShinyStatus } from "./interfaces/ShinyStatus";
import { ShinyCount } from "./interfaces/ShinyCount";
import { ShinyForms } from "./interfaces/ShinyStatus";
import { DexProgress } from "./interfaces/DexProgress";
import { sLockInterface } from "./interfaces/sLockInterface";
import shinyLock from "./assets/jsons/ShinyLock.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

function App(): JSX.Element {
    const [toggleChangeLog, updateToggle] = useState<boolean>(false);
    const [togglePage, updatePage] = useState<boolean>(true);

    const getDex = dexCounts.Pokedex;
    const livingKey = Object.keys(getDex);
    let livingDex: ShinyStatus[] = livingKey.map(function (key: string) {
        const currPokemon: ShinyStatus = getDex[key as keyof typeof getDex];
        const currCounts: ShinyCount[] = currPokemon.counts.map(function (
            counts: ShinyCount
        ) {
            const newCounts: ShinyCount = {
                game: counts.game,
                count: counts.count
            };
            return newCounts;
        });
        const newPokemon: ShinyStatus = {
            species: currPokemon.species,
            id: currPokemon.id,
            forms: currPokemon.forms,
            formsObtained: currPokemon.formsObtained,
            gender: currPokemon.gender,
            genderObtained: currPokemon.genderObtained,
            counts: [...currCounts]
        };
        //console.log(newPokemon);
        return newPokemon;
    });
    const getForms = dexCounts.Forms;
    let livingForms: ShinyForms = { ...getForms };

    const cookieGet = localStorage.getItem("dexCookie");
    let dexCookie: Pokedex;
    if (cookieGet) {
        //console.log(cookieGet);
        dexCookie = JSON.parse(cookieGet);
        const cookieDex = dexCookie.Pokedex;
        const livingKey = Object.keys(cookieDex);
        const importLiving: ShinyStatus[] = livingKey.map(function (
            key: string
        ) {
            const currPokemon: ShinyStatus = cookieDex[
                key as keyof typeof cookieDex
            ] as ShinyStatus;
            const currCounts: ShinyCount[] = currPokemon.counts.map(function (
                counts: ShinyCount
            ) {
                const newCounts: ShinyCount = {
                    game: counts.game,
                    count: counts.count
                };
                return newCounts;
            });
            const newPokemon: ShinyStatus = {
                species: currPokemon.species,
                id: currPokemon.id,
                forms: currPokemon.forms,
                formsObtained: currPokemon.formsObtained,
                gender: currPokemon.gender,
                genderObtained: currPokemon.genderObtained,
                counts: [...currCounts]
            };
            //console.log(newPokemon);
            return newPokemon;
        });
        //console.log(importLiving);
        livingDex = livingDex.map(function (aStatus: ShinyStatus) {
            const getImportStatus = importLiving.filter(
                (bStatus: ShinyStatus): boolean =>
                    aStatus.species === bStatus.species
            )[0];
            if (getImportStatus) {
                return {
                    ...aStatus,
                    formsObtained: getImportStatus.formsObtained,
                    genderObtained: getImportStatus.genderObtained,
                    counts: [...getImportStatus.counts]
                };
            } else {
                return aStatus;
            }
        });
        const getForms = dexCookie.Forms;
        const importForms: ShinyForms = getForms;
        livingForms = { ...livingForms, ...importForms };
    }

    const [formDex, updateForms] = useState<ShinyForms>(livingForms);
    //console.log(livingForms);

    function importAll(importDex: Pokedex) {
        const getDex = importDex.Pokedex;
        const livingKey = Object.keys(getDex);
        let importLiving: ShinyStatus[] = livingKey.map(function (key: string) {
            const currPokemon: ShinyStatus = getDex[
                key as keyof typeof getDex
            ] as ShinyStatus;
            const currCounts: ShinyCount[] = currPokemon.counts.map(function (
                counts: ShinyCount
            ) {
                const newCounts: ShinyCount = {
                    game: counts.game,
                    count: counts.count
                };
                return newCounts;
            });
            const newPokemon: ShinyStatus = {
                species: currPokemon.species,
                id: currPokemon.id,
                forms: currPokemon.forms,
                formsObtained: currPokemon.formsObtained,
                gender: currPokemon.gender,
                genderObtained: currPokemon.genderObtained,
                counts: [...currCounts]
            };
            //console.log(newPokemon);
            return newPokemon;
        });
        //console.log(importLiving);
        importLiving = shinyDex.map(function (aStatus: ShinyStatus) {
            const getImportStatus = importLiving.filter(
                (bStatus: ShinyStatus): boolean =>
                    aStatus.species === bStatus.species
            )[0];
            if (getImportStatus) {
                return {
                    ...aStatus,
                    formsObtained: getImportStatus.formsObtained,
                    genderObtained: getImportStatus.genderObtained,
                    counts: [...getImportStatus.counts]
                };
            } else {
                return aStatus;
            }
        });
        updateShinyDex(importLiving);
        const getForms = { ...formDex, ...importDex.Forms };
        const importForms: ShinyForms = getForms;
        updateForms(importForms);
        const search = searchFilter(importLiving, filterString);
        completionFilter(search, filterValue);
        calculateProgress(importLiving);
        saveCookie(importLiving, importForms);
        return;
    }

    //no idea why this works
    type AllKeysOf<T> = T extends T ? keyof T : never;

    function callFromCollection<
        K1 extends keyof typeof formDex,
        K2 extends AllKeysOf<typeof formDex[K1]>
    >(key1: K1, key2: K2, species: string): ShinyForms {
        if (formDex[key1] === undefined) {
            throw new Error("Invalid key1");
        }
        const c = formDex[key1][key2];
        formDex[key1][key2] = !c as unknown as ShinyForms[K1][K2];
        if (c === undefined) {
            throw new Error("Invalid key2");
        }
        const newSpecies =
            species === "TaurosPaldea" ? "Tauros-Paldea" : species;
        const oldStatus = [...shinyDex].filter(
            (aStatus: ShinyStatus): boolean => aStatus.species === newSpecies
        )[0];
        const subKeys = Object.keys(formDex[key1]);
        const forBools = subKeys.map(function (key: string) {
            return formDex[key1][key as K2] as unknown as ShinyForms[K1][K2];
        });
        const boolsMap = forBools.map((aBool: ShinyForms[K1][K2]): number =>
            (aBool as unknown as boolean) ? 1 : 0
        );
        const sumBools = boolsMap.reduce((sum, current) => sum + current);
        //console.log(sumBools);
        //cases: box selected but no counts (use boxes), or counts but no box selected (use 1)
        //see comment mid-line in addShinyGame for formsObtained
        const newStatus: ShinyStatus = {
            species: oldStatus.species,
            id: oldStatus.id,
            forms: oldStatus.forms,
            formsObtained: Math.max(sumBools, getCounts(oldStatus) > 0 ? 1 : 0),
            gender: oldStatus.gender,
            genderObtained: oldStatus.genderObtained,
            counts: [...oldStatus.counts]
        };
        const newList = shinyDex.map(
            (aStatus: ShinyStatus): ShinyStatus =>
                aStatus.species !== species ? aStatus : newStatus
        );
        updateShinyDex(newList);
        const search = searchFilter(newList, filterString);
        completionFilter(search, filterValue);
        calculateProgress(newList);
        saveCookie(newList, formDex);
        return formDex;
    }

    function sumBools<
        K1 extends keyof typeof formDex,
        K2 extends AllKeysOf<typeof formDex[K1]>
    >(key1: K1): number {
        if (formDex[key1] === undefined) {
            throw new Error("Invalid key1");
        }
        const subKeys = Object.keys(formDex[key1]);
        const forBools = subKeys.map(function (key: string) {
            return formDex[key1][key as K2] as unknown as ShinyForms[K1][K2];
        });
        const boolsMap = forBools.map((aBool: ShinyForms[K1][K2]): number =>
            (aBool as unknown as boolean) ? 1 : 0
        );
        const sumBools = boolsMap.reduce((sum, current) => sum + current);
        return sumBools;
    }

    //end of no idea why this works
    const sLock: sLockInterface[] = shinyLock.ShinyLocked;

    function isShinyLocked(species: string) {
        const isShinyLocked: sLockInterface[] = sLock.filter(
            (aLock: sLockInterface): boolean => aLock.species === species
        );
        if (isShinyLocked.length > 0) {
            if (isShinyLocked[0].game === "All") {
                return true;
            }
        }
        return false;
    }

    function returnDexProgress(dexProgress: ShinyStatus[]): DexProgress {
        //begin filter out Shiny Locked
        const isShinyLocked: ShinyStatus[] = dexProgress.filter(function (
            aStatus: ShinyStatus
        ): boolean {
            const isLockedAll: sLockInterface[] = sLock.filter(
                (aLock: sLockInterface): boolean =>
                    aLock.species === aStatus.species
            );
            if (isLockedAll.length > 0) {
                if (isLockedAll[0].game === "All") {
                    return false;
                }
            }
            return true;
        });
        //end filter out Shiny
        //all instances of isShinyLocked below were previously dexProgress
        const formTotalArr: number[] = isShinyLocked.map(
            (aStatus: ShinyStatus): number => aStatus.forms + aStatus.gender
        );
        const formProgArr: number[] = isShinyLocked.map(
            (aStatus: ShinyStatus): number =>
                (aStatus.forms > 1 ? aStatus.formsObtained : 0) +
                ((aStatus.genderObtained & 2 ||
                    aStatus.genderObtained & 1 ||
                    aStatus.formsObtained > 0) &&
                aStatus.forms === 1
                    ? 1
                    : 0) +
                (aStatus.genderObtained & 2 && aStatus.genderObtained & 1
                    ? 1
                    : 0)
        );
        const dexProgArr: number[] = isShinyLocked.map(
            (aStatus: ShinyStatus): number =>
                aStatus.formsObtained > 0 ? 1 : 0
        );
        const formTotal: number = formTotalArr.reduce(
            (sum, current) => sum + current
        );
        const formProg: number = formProgArr.reduce(
            (sum, current) => sum + current
        );
        const dexProg: number = dexProgArr.reduce(
            (sum, current) => sum + current
        );
        const dexTotal: number = isShinyLocked.length;
        return {
            speciesObtained: dexProg,
            speciesTotal: dexTotal,
            formsObtained: formProg,
            formTotal: formTotal
        } as DexProgress;
    }

    const [dexStats, updateDexStats] = useState<DexProgress>(
        returnDexProgress(livingDex)
    );

    function calculateProgress(dexProgress: ShinyStatus[]) {
        updateDexStats(returnDexProgress(dexProgress));
    }

    function updateFormPasser(species: string, formName: string) {
        const k1 = species as keyof typeof formDex;
        const val1 = formDex[k1];
        const k2 = formName as keyof typeof val1;
        updateForms(callFromCollection(k1, k2, species));
    }

    const [shinyDex, updateShinyDex] = useState<ShinyStatus[]>(livingDex);

    function saveCookie(updateDex: ShinyStatus[], updateFormDex: ShinyForms) {
        localStorage.setItem(
            "dexCookie",
            JSON.stringify({
                Pokedex: { ...updateDex },
                Forms: { ...updateFormDex }
            })
        );
        //console.log("update");
    }

    function addShinyGame(species: string, game: string) {
        const oldStatus = [...shinyDex].filter(
            (aStatus: ShinyStatus): boolean => aStatus.species === species
        )[0];
        const newStatus: ShinyStatus = {
            species: oldStatus.species,
            id: oldStatus.id,
            forms: oldStatus.forms,
            formsObtained:
                oldStatus.formsObtained === 0 //&& oldStatus.forms === 1
                    ? 1
                    : oldStatus.formsObtained,
            gender: oldStatus.gender,
            genderObtained: oldStatus.genderObtained,
            counts: [...oldStatus.counts, { game: game, count: 1 }]
        };
        const newList = shinyDex.map(
            (aStatus: ShinyStatus): ShinyStatus =>
                aStatus.species !== species ? aStatus : newStatus
        );
        updateShinyDex(newList);
        const search = searchFilter(newList, filterString);
        completionFilter(search, filterValue);
        calculateProgress(newList);
        saveCookie(newList, formDex);
        return;
    }
    function updateGender(species: string, gender: string) {
        const oldStatus = [...shinyDex].filter(
            (aStatus: ShinyStatus): boolean => aStatus.species === species
        )[0];
        let newGender = oldStatus.genderObtained;
        if (gender === "Male") {
            if (newGender % 2 === 1) {
                newGender = newGender - 1;
            } else {
                newGender = newGender + 1;
            }
        } else {
            if (newGender > 1) {
                newGender = newGender - 2;
            } else {
                newGender = newGender + 2;
            }
        }
        const newStatus: ShinyStatus = {
            species: oldStatus.species,
            id: oldStatus.id,
            forms: oldStatus.forms,
            formsObtained: oldStatus.formsObtained,
            gender: oldStatus.gender,
            genderObtained: newGender,
            counts: [...oldStatus.counts]
        };
        if (getCounts(newStatus) === 0 && newGender === 0) {
            newStatus.formsObtained = 0;
        }
        if (getCounts(newStatus) > 0 || newGender > 0) {
            newStatus.formsObtained = 1;
        }
        const newList = shinyDex.map(
            (aStatus: ShinyStatus): ShinyStatus =>
                aStatus.species !== species ? aStatus : newStatus
        );
        updateShinyDex(newList);
        const search = searchFilter(newList, filterString);
        completionFilter(search, filterValue);
        calculateProgress(newList);
        saveCookie(newList, formDex);
        return;
    }
    function removeShinyGame(species: string, game: string) {
        const oldStatus = [...shinyDex].filter(
            (aStatus: ShinyStatus): boolean => aStatus.species === species
        )[0];
        const newStatus: ShinyStatus = {
            species: oldStatus.species,
            id: oldStatus.id,
            forms: oldStatus.forms,
            formsObtained: oldStatus.formsObtained,
            gender: oldStatus.gender,
            genderObtained: oldStatus.genderObtained,
            counts: [...oldStatus.counts].filter(
                (aCount: ShinyCount): boolean => aCount.game !== game
            )
        };
        const newList = shinyDex.map(
            (aStatus: ShinyStatus): ShinyStatus =>
                aStatus.species !== species ? aStatus : newStatus
        );
        updateShinyDex(newList);
        const search = searchFilter(newList, filterString);
        completionFilter(search, filterValue);
        calculateProgress(newList);
        saveCookie(newList, formDex);
        return;
    }
    function updateShinyCounts(species: string, game: string, count: number) {
        const oldStatus = [...shinyDex].filter(
            (aStatus: ShinyStatus): boolean => aStatus.species === species
        )[0];
        const newStatus: ShinyStatus = {
            species: oldStatus.species,
            id: oldStatus.id,
            forms: oldStatus.forms,
            formsObtained: oldStatus.formsObtained,
            gender: oldStatus.gender,
            genderObtained: oldStatus.genderObtained,
            counts: [...oldStatus.counts].map(
                (aCount: ShinyCount): ShinyCount =>
                    aCount.game !== game ? aCount : { ...aCount, count: count }
            )
        };
        const fullCounts = getCounts(newStatus);
        if (
            fullCounts > 0 &&
            newStatus.formsObtained === 0 &&
            !(newStatus.forms > 1)
        ) {
            newStatus.formsObtained = 1;
        } else if (
            fullCounts === 0 &&
            !(newStatus.forms > 1) &&
            !(newStatus.genderObtained > 0)
        ) {
            newStatus.formsObtained = 0;
        } else if (
            newStatus.forms > 1 &&
            sumBools(
                (newStatus.species === "Tauros-Paldea"
                    ? "TaurosPaldea"
                    : newStatus.species) as keyof typeof formDex
            ) === 0
        ) {
            newStatus.formsObtained = fullCounts > 0 ? 1 : 0;
        }
        const newList = shinyDex.map(
            (aStatus: ShinyStatus): ShinyStatus =>
                aStatus.species !== species ? aStatus : newStatus
        );
        //console.log(newStatus);
        updateShinyDex(newList);
        const search = searchFilter(newList, filterString);
        completionFilter(search, filterValue);
        calculateProgress(newList);
        saveCookie(newList, formDex);
        return;
    }

    function getCounts(status: ShinyStatus): number {
        const newCounts = status.counts.map(
            (aCount: ShinyCount): number => aCount.count
        );
        return newCounts.reduce((sum, current) => sum + current, 0);
    }

    const [filterDex, updateFilter] = useState<ShinyStatus[]>([...shinyDex]);
    const [filterString, updateFilterString] = useState<string>("");
    const [filterValue, updateFilterValue] = useState<number>(15);
    function searchFilter(
        currentDex: ShinyStatus[],
        filter: string
    ): ShinyStatus[] {
        const newFilter: ShinyStatus[] = currentDex.filter(
            (aStatus: ShinyStatus): boolean =>
                aStatus.species.toLowerCase().includes(filter.toLowerCase())
        );
        updateFilter(newFilter);
        return newFilter;
    }

    function completionFilter(
        currentDex: ShinyStatus[],
        filterValue: number
    ): ShinyStatus[] {
        const newFilter: ShinyStatus[] = currentDex.filter(
            (aStatus: ShinyStatus): boolean => {
                let colorCode = 0;
                if (aStatus.formsObtained >= aStatus.forms) {
                    colorCode = 2;
                } else if (aStatus.formsObtained === 0) {
                    colorCode = 0;
                } else {
                    colorCode = 1;
                }
                if (aStatus.gender === 1) {
                    if (aStatus.genderObtained === 3) {
                        colorCode = 2;
                    } else if (
                        aStatus.genderObtained > 0 ||
                        aStatus.formsObtained > 0
                    ) {
                        colorCode = 1;
                    } else {
                        colorCode = 0;
                    }
                }
                if (filterValue > 7 && isShinyLocked(aStatus.species)) {
                    return true;
                } else if ((filterValue & (2 ** colorCode) & 4) === 4) {
                    return true;
                } else if ((filterValue & (2 ** colorCode) & 2) === 2) {
                    return true;
                } else if (
                    (filterValue & (2 ** colorCode) & 1) === 1 &&
                    !isShinyLocked(aStatus.species)
                ) {
                    return true;
                }
                return false;
            }
        );
        updateFilter(newFilter);
        return newFilter;
    }

    function filterStringPasser(event: ChangeEvent) {
        updateFilterString(event.target.value);
        const search = searchFilter(shinyDex, event.target.value);
        completionFilter(search, filterValue);
    }

    function filterCompletionPasser(completion: number) {
        //console.log(completion);
        updateFilterValue(completion);
        const search = searchFilter(shinyDex, filterString);
        completionFilter(search, completion);
    }

    function setCalculator() {
        updatePage(true);
    }

    function setLivingDex() {
        updatePage(false);
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <img src={Spiritomb} width="200px"></img>
                    Comprehensive Shiny Hunting Guide
                    <img src={Shuckle} width="200px"></img>
                </div>
            </header>
            <Button onClick={() => setCalculator()}>Method Calculator</Button>
            <Button onClick={() => setLivingDex()}>Dex Tracker</Button>
            <hr />
            {togglePage && (
                <div>
                    <body>
                        <div>
                            <table>
                                <td width="20%"></td>
                                <td width="60%">
                                    <p>
                                        Welcome to the wonderful world of
                                        Pokemon! This is a personal project I
                                        have been working on, for fun. As an
                                        avid shiny hunter, I eventually began to
                                        wonder what the optimal way to go about
                                        it was. And so, this tool was born. It
                                        collects all of the encounter
                                        information from every single Pokemon in
                                        the game, and from that calculates the
                                        fastest method by which to obtain each
                                        and every one.
                                        <hr />
                                        This tool is quite simple to use:
                                    </p>
                                    <table>
                                        <td width="25%"></td>
                                        <td width="50%">
                                            <ul>
                                                <li>Select your hunt target</li>
                                                <li>
                                                    Select the list of games you
                                                    own or wish to hunt in
                                                </li>
                                                <li>
                                                    Choose which charms you have
                                                    in each game
                                                </li>
                                            </ul>
                                        </td>
                                        <td width="25%"></td>
                                    </table>
                                </td>
                                <td width="20%"></td>
                            </table>
                        </div>
                    </body>
                    <br />
                    <body>
                        <CalculatorWrapper></CalculatorWrapper>
                        <br />
                        <hr />
                    </body>
                </div>
            )}
            {!togglePage && (
                <div>
                    <LivingDexWrapper
                        filterDex={filterDex}
                        fullDex={shinyDex}
                        addShinyGame={addShinyGame}
                        removeShinyGame={removeShinyGame}
                        updateShinyCounts={updateShinyCounts}
                        formDex={formDex}
                        updateFormPasser={updateFormPasser}
                        updateGender={updateGender}
                        filterStringPasser={filterStringPasser}
                        filterValue={filterValue}
                        filterCompletionPasser={filterCompletionPasser}
                        importAll={importAll}
                        dexStats={dexStats}
                    ></LivingDexWrapper>
                </div>
            )}
            <body>
                <Button onClick={() => updateToggle(!toggleChangeLog)}>
                    View Change Log:
                </Button>
                {toggleChangeLog && <ChangeLog></ChangeLog>}
            </body>
        </div>
    );
}

export default App;
