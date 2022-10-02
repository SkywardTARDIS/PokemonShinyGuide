import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GameData } from "../interfaces/GameData";
import { Pokemon } from "../interfaces/Pokemon";
import { EncounterMethod } from "../interfaces/EncounterMethod";
import { DisplayMethod } from "./DisplayMethod";
import Legendaries from "../assets/jsons/Legendaries.json";
import noEggs from "../assets/jsons/NoEggs.json";
import FriendSafari from "../assets/jsons/FriendSafari.json";
import galarDex from "../assets/jsons/GalarDex.json";
/*
import guaranteed from "../assets/jsons/Guaranteed.json";
import hisuiDex from "../assets/jsons/HisuiDex.json";
import Pokedex from "../assets/jsons/PokedexV3.json";
*/
import { sLockInterface } from "../interfaces/sLockInterface";
import shinyLock from "../assets/jsons/ShinyLock.json";
//import { gameList } from "../interfaces/gameList";

export function FinalCalcs({
    finalGames,
    fullDex,
    huntTarget
}: {
    finalGames: GameData[];
    fullDex: Pokemon[];
    huntTarget: Pokemon;
}): JSX.Element {
    const oldOdds = 8192;
    const newOdds = 4096;
    const [foundOdds, updateOdds] = useState<Pokemon[]>([]);
    const [method, upMethod] = useState<string>("");
    function passMethod(aMethod: string) {
        upMethod(aMethod);
    }
    function calculation(target: Pokemon): Pokemon[] {
        //const Legends: string[] = Legendaries.Legendaries;
        //const Mythicals: string[] = Legendaries.Mythicals;
        const allLocks = [...shinyLock.ShinyLocked].filter(
            (aLock: sLockInterface): boolean => aLock.game === "All"
        );
        const partialLocks = [...shinyLock.ShinyLocked].filter(
            (aLock: sLockInterface): boolean =>
                aLock.game !== "All" && aLock.species === target.species
        );
        const lockGames = partialLocks.map(
            (aLock: sLockInterface): string => aLock.game
        );
        //clear out shiny locks
        if (
            allLocks
                .map((aLock: sLockInterface): string => aLock.species)
                .includes(target.species)
        ) {
            return [{ ...target, methods: [] }];
        }

        const getGames = [...finalGames].map(
            (aGame: GameData): string => aGame.game
        );

        const stripMethods = [...target.methods].filter(
            (aMeth: EncounterMethod): boolean =>
                getGames.includes(aMeth.game) || aMeth.game === "Pokémon GO"
        );

        let addDyna = [...stripMethods];
        if (
            getGames.includes("Pokémon Sword") &&
            !target.species.includes("Regi") &&
            !target.species.includes("ion") &&
            target.species !== "Silvally" &&
            Legendaries.Legendaries.includes(target.species)
        ) {
            addDyna = [
                ...addDyna,
                {
                    game: "Pokémon Sword",
                    location: "Dynamax Adventures",
                    rarity: "--%",
                    environment: "Max Raid Battle",
                    time: "N/A",
                    weather: "N/A",
                    season: "N/A",
                    SOS: "N/A"
                }
            ];
        }
        if (
            getGames.includes("Pokémon Shield") &&
            !target.species.includes("Regi") &&
            !target.species.includes("ion") &&
            target.species !== "Silvally" &&
            Legendaries.Legendaries.includes(target.species)
        ) {
            addDyna = [
                ...addDyna,
                {
                    game: "Pokémon Shield",
                    location: "Dynamax Adventures",
                    rarity: "--%",
                    environment: "Max Raid Battle",
                    time: "N/A",
                    weather: "N/A",
                    season: "N/A",
                    SOS: "N/A"
                }
            ];
        }

        let stripLocks = [...addDyna];
        if (lockGames.length > 0) {
            stripLocks = [...addDyna].filter(
                (aMeth: EncounterMethod): boolean =>
                    [...lockGames].filter(
                        (aGame: string): boolean => !aGame.includes(aMeth.game)
                    ).length > 0
            );
        }

        const techEggs = [
            "Pichu",
            "Cleffa",
            "Igglybuff",
            "Togepi",
            "Tyrogue",
            "Smoochum",
            "Elekid",
            "Magby",
            "Azurill",
            "Wynaut",
            "Budew",
            "Chingling",
            "Bonsly",
            "Mime Jr.",
            "Happiny",
            "Munchlax",
            "Riolu",
            "Mantyke",
            "Toxel"
        ];

        //adds Masuda for every game it exists in
        let addMasuda = [...stripLocks];
        if (
            !noEggs.noEggFound.includes(target.species) ||
            techEggs.includes(target.species)
        ) {
            const eggGames = [...getGames].filter(
                (aGame: string): boolean =>
                    !(
                        aGame.includes("Legends") ||
                        target.species.includes("Hisui") ||
                        (target.species.includes("Galar") &&
                            getGen(aGame) < 8) ||
                        (target.species.includes("Alola") &&
                            (getGen(aGame) < 7 ||
                                aGame.includes("Diamond") ||
                                aGame.includes("Pearl")))
                    )
            );

            const masudaGames = [...eggGames].filter(
                (aGame: string): boolean => getGen(aGame) > 3
            );
            const preMasuda = [...eggGames].filter(
                (aGame: string): boolean => getGen(aGame) < 4
            );

            const masudaExists = [...masudaGames].map(function (
                aGame: string
            ): EncounterMethod {
                return {
                    game: aGame,
                    location: "Day Care Center",
                    rarity: "--%",
                    environment: "Masuda Method",
                    time: "N/A",
                    weather: "N/A",
                    season: "N/A",
                    SOS: "N/A"
                };
            });

            const noMasuda = [...preMasuda].map(function (
                aGame: string
            ): EncounterMethod {
                return {
                    game: aGame,
                    location: "Day Care Center",
                    rarity: "--%",
                    environment: "Hatch an Egg",
                    time: "N/A",
                    weather: "N/A",
                    season: "N/A",
                    SOS: "N/A"
                };
            });

            addMasuda = [...stripLocks, ...masudaExists, ...noMasuda];
        }

        const galarFix = [...addMasuda].filter(
            (aMeth: EncounterMethod): boolean =>
                !(
                    (aMeth.game.includes("Sword") ||
                        aMeth.game.includes("Shield")) &&
                    aMeth.environment.includes("Masuda") &&
                    !galarDex.Galar.includes(target.species)
                )
        );

        let addSafari = [...galarFix];
        if (FriendSafari.FriendSafari.includes(target.species)) {
            const xy = [...getGames].filter(
                (aGame: string): boolean => aGame === "X" || aGame === "Y"
            );
            if (xy.length > 0) {
                const newSafari = [...xy].map(function (
                    aGame: string
                ): EncounterMethod {
                    return {
                        game: aGame,
                        location: "Friend Safari",
                        rarity: "33%",
                        environment: "Friend Safari",
                        time: "N/A",
                        weather: "N/A",
                        season: "N/A",
                        SOS: "N/A"
                    };
                });
                addSafari = [...addSafari, ...newSafari];
            }
        }
        let addLgpeAlola = [...addSafari];
        console.log([...getGames]);
        const LGPEGames = [...getGames].filter((aGame: string): boolean =>
            aGame.includes("Let's Go")
        );
        if (LGPEGames.length > 0 && huntTarget.species.includes("Alola")) {
            const newLGPE = [...LGPEGames].map(function (
                aGame: string
            ): EncounterMethod {
                return {
                    game: aGame,
                    location: "Trade with trainer",
                    rarity: "--%",
                    environment: "Trade",
                    time: "N/A",
                    weather: "N/A",
                    season: "N/A",
                    SOS: "N/A"
                };
            });
            addLgpeAlola = [...addLgpeAlola, ...newLGPE];
        }

        //all proper methods are now included or excluded
        //mapping all methods to include time to hunt, via calls to finalCalc
        const finalOdds = [...addLgpeAlola].map(function (
            aMeth: EncounterMethod
        ): EncounterMethod {
            return finalCalc(aMeth, target);
        });

        const revizedPoke: Pokemon = {
            ...target,
            methods: [...finalOdds]
        };
        //console.log(revizedPoke);
        let targetList = [revizedPoke];
        if (target.prevolution !== "") {
            const newTarget = [...fullDex].filter(
                (aPoke: Pokemon): boolean =>
                    aPoke.species === target.prevolution
            );
            targetList = [...targetList, ...calculation(newTarget[0])];
        }
        console.log(targetList);
        return targetList;
    }

    function returnTop(thePoke: Pokemon) {
        const allMeth = calculation(thePoke);
        const filterMeth = allMeth.map(function (aPoke: Pokemon): Pokemon {
            let theMeth = [...aPoke.methods];
            if (aPoke.methods.length > 0) {
                theMeth = [...aPoke.methods].sort(
                    (a, b) => Number(a.rarity) - Number(b.rarity)
                );
            } else {
                const noMethods: EncounterMethod = {
                    game: "None",
                    location: "None",
                    rarity: 100000000000,
                    environment: "None",
                    time: "N/A",
                    weather: "N/A",
                    season: "N/A",
                    SOS: "N/A"
                };
                theMeth = [noMethods];
            }
            const bestMeth = [...theMeth][0];
            const newPoke = { ...aPoke, methods: [bestMeth] };
            return newPoke;
        });
        const sortFilter = filterMeth.sort(
            (a, b) => Number(a.methods[0].rarity) - Number(b.methods[0].rarity)
        );
        console.log(sortFilter);
        updateOdds(sortFilter);
    }

    //the official function for calculating the time of each method
    function finalCalc(
        aMeth: EncounterMethod,
        target: Pokemon
    ): EncounterMethod {
        const shinyCharm =
            finalGames.filter(
                (aGame: GameData): boolean =>
                    aGame.game === aMeth.game && aGame.hasShiny
            ).length > 0
                ? 2
                : 0;
        const ovalCharm =
            finalGames.filter(
                (aGame: GameData): boolean =>
                    aGame.game === aMeth.game && aGame.hasOval
            ).length > 0
                ? 1
                : 0;
        const newMeth = { ...aMeth };
        const gen = getGen(aMeth.game);
        if (newMeth.environment === "Masuda Method") {
            if (gen < 4) {
                newMeth.rarity = ((60 * 4) / 5) * oldOdds;
            } else if (gen === 4) {
                newMeth.rarity = (((60 * 4) / 5) * oldOdds) / 5;
            } else if (gen === 5) {
                newMeth.rarity =
                    (((60 * 4) / (5 + ovalCharm)) * oldOdds) / (6 + shinyCharm);
            } else {
                newMeth.rarity =
                    (((60 * 4) / (5 + ovalCharm)) * newOdds) / (6 + shinyCharm);
            }
            return newMeth;
        }
        if (gen === 1) {
            if (newMeth.environment === "Interact") {
                newMeth.rarity = (30 * newOdds) / (1 + shinyCharm);
            } else if (newMeth.environment.includes("Sky -")) {
                newMeth.rarity = 1000000000;
            } else if (newMeth.environment.includes("- Rare")) {
                newMeth.rarity = (40 * newOdds) / (13 + shinyCharm);
            } else if (newMeth.environment.includes("Trade")) {
                newMeth.rarity = (30 * newOdds) / (1 + shinyCharm);
            } else {
                newMeth.rarity = (10 * newOdds) / (13 + shinyCharm);
            }
            return newMeth;
        } else if (gen === 2) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            newMeth.rarity = (30 * oldOdds) / numRarity;
            return newMeth;
        } else if (gen === 3) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            newMeth.rarity = (30 * oldOdds) / numRarity;
            return newMeth;
        } else if (gen === 4) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            if (
                newMeth.game.includes("Diamond") ||
                newMeth.game.includes("Pearl") ||
                newMeth.game.includes("Platinum")
            ) {
                if (
                    target.species === "Feebas" ||
                    target.species === "Mesprit" ||
                    target.species === "Articuno" ||
                    target.species === "Zapdos" ||
                    target.species === "Moltres" ||
                    target.species === "Cresselia" ||
                    newMeth.environment.includes("Trees")
                ) {
                    newMeth.rarity = 1000000000;
                } else if (
                    radarLocation(newMeth.location, newMeth.environment)
                ) {
                    const isGameInserted = [...finalGames].map(
                        (aGame: GameData): string => aGame.game
                    );
                    const gen3Games = [...isGameInserted].filter(
                        (aGame: string): boolean => getGen(aGame) === 3
                    );
                    if (
                        (newMeth.environment.includes("FireRed") ||
                            newMeth.environment.includes("LeafGreen") ||
                            newMeth.environment.includes("Ruby") ||
                            newMeth.environment.includes("Sapphire") ||
                            newMeth.environment.includes("Emerald")) &&
                        isGameInserted.length > 0
                    ) {
                        const filterGame = [...gen3Games].filter(
                            (aGame: string): boolean =>
                                newMeth.environment.includes(aGame)
                        );
                        if (filterGame.length > 0) {
                            newMeth.rarity = 3600 + 50 * 20;
                            newMeth.environment =
                                newMeth.environment + "- PokeRadar";
                        } else {
                            newMeth.rarity = (30 * oldOdds) / numRarity;
                        }
                    } else {
                        newMeth.rarity = 3600 + 50 * 20;
                        newMeth.environment =
                            newMeth.environment + "- PokeRadar";
                    }
                } else {
                    newMeth.rarity = (30 * oldOdds) / numRarity;
                }
            } else {
                newMeth.rarity = (30 * oldOdds) / numRarity;
            }
            return newMeth;
        } else if (gen === 5) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            if (newMeth.environment === "Double Grass") {
                newMeth.rarity =
                    (30 * oldOdds) / (1 + shinyCharm) / (numRarity * 2);
            } else {
                newMeth.rarity = (30 * oldOdds) / (1 + shinyCharm) / numRarity;
            }
            return newMeth;
        } else if (gen === 6) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            if (newMeth.game === "X" || newMeth.game === "Y") {
                if (newMeth.environment.includes("Horde")) {
                    newMeth.rarity =
                        (6 * newOdds) / (1 + shinyCharm) / numRarity;
                } else if (newMeth.environment.includes("Rod")) {
                    newMeth.rarity =
                        700 + (28 * newOdds) / (41 + shinyCharm) / numRarity;
                } else if (
                    newMeth.environment.includes("Rock Smash") ||
                    newMeth.environment.includes("Special") ||
                    newMeth.environment.includes("Surf") ||
                    newMeth.environment.includes("Tall Grass") ||
                    newMeth.environment.includes("Snow") ||
                    newMeth.environment.includes("Dust") ||
                    newMeth.location.includes("Route 9")
                ) {
                    newMeth.rarity =
                        (30 * newOdds) / (1 + shinyCharm) / numRarity;
                } else if (
                    XYradarLocation(newMeth.location, newMeth.environment)
                ) {
                    newMeth.rarity = 3600 + 50 * 20;
                    newMeth.environment = newMeth.environment + " - PokeRadar";
                } else if (newMeth.environment === "Friend Safari") {
                    newMeth.rarity = 30 * 512;
                } else {
                    newMeth.rarity =
                        (30 * newOdds) / (1 + shinyCharm) / numRarity;
                }
            } else {
                if (newMeth.environment.includes("Horde")) {
                    newMeth.rarity =
                        (6 * newOdds) / (1 + shinyCharm) / numRarity;
                } else if (newMeth.environment.includes("Rod")) {
                    newMeth.rarity =
                        700 + (28 * newOdds) / (41 + shinyCharm) / numRarity;
                } else if (
                    newMeth.environment === "Dexnav" ||
                    newMeth.environment.includes("Grass") ||
                    newMeth.environment.includes("Surf")
                ) {
                    newMeth.environment = newMeth.environment + " - Dexnav";
                    newMeth.rarity =
                        (35 * newOdds) / (4 + shinyCharm) / numRarity;
                } else {
                    newMeth.rarity =
                        (30 * newOdds) / (1 + shinyCharm) / numRarity;
                }
            }
            return newMeth;
        } else if (gen === 7) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            if (!(newMeth.SOS === "N/A")) {
                if (newMeth.SOS.includes("Initial")) {
                    newMeth.rarity = (30 * newOdds) / (13 + shinyCharm);
                } else {
                    newMeth.rarity = (30 * 5 * newOdds) / (13 + shinyCharm);
                }
            } else {
                newMeth.rarity = (30 * newOdds) / (1 + shinyCharm) / numRarity;
            }
            return newMeth;
        } else if (gen === 8) {
            let rarity = newMeth.rarity.toString().replaceAll(/[^0-9]/gi, "");
            if (rarity === "") {
                rarity = "100";
            }
            const numRarity = Number(rarity) / 100;
            if (
                newMeth.game.includes("Sword") ||
                newMeth.game.includes("Shield")
            ) {
                if (newMeth.environment.includes("Curry")) {
                    newMeth.rarity = 1000000000;
                } else {
                    newMeth.rarity =
                        (30 * newOdds) / (2 + shinyCharm) / numRarity;
                }
            } else if (
                newMeth.game.includes("Diamond") ||
                newMeth.game.includes("Pearl")
            ) {
                if (
                    target.species === "Feebas" ||
                    target.species === "Mesprit" ||
                    newMeth.environment.includes("Trees")
                ) {
                    newMeth.rarity = 1000000000;
                } else if (
                    radarLocation(newMeth.location, newMeth.environment)
                ) {
                    newMeth.rarity = 3600 + 50 * 20;
                    newMeth.environment = "PokeRadar";
                } else {
                    newMeth.rarity = (30 * newOdds) / numRarity;
                }
            } else {
                if (newMeth.environment.includes("Mass Outbreak")) {
                    newMeth.rarity = 60 * 60 * 2;
                } else {
                    newMeth.rarity = newMeth.rarity =
                        (20 * newOdds) / (1 + shinyCharm) / numRarity;
                }
            }
            return newMeth;
        } else {
            return newMeth;
        }
    }

    function XYradarLocation(location: string, environment: string) {
        return (
            location.includes("Route") ||
            (location.includes("Village") && environment.includes("Flowers")) ||
            environment.includes("Walking")
        );
    }

    function radarLocation(location: string, environment: string): boolean {
        return (
            !environment.includes("Cave") &&
            !environment.includes("Surf") &&
            !environment.includes("Tall Grass") &&
            (environment.includes("Radar") ||
                environment.includes("Ruby") ||
                environment.includes("Sapphire") ||
                environment.includes("Emerald") ||
                environment.includes("FireRed") ||
                environment.includes("LeafGreen") ||
                environment.includes("Swarm") ||
                (environment.includes("Walk") &&
                    ((location.includes("Route") &&
                        !location.includes("210 - South")) ||
                        location.includes("Lakefront") ||
                        location.includes("Valley") ||
                        location.includes("Forest") ||
                        location.includes("Fuego") ||
                        location.includes("Trophy") ||
                        location.includes("Coronet - Top") ||
                        location.includes("Coronet - Snow"))))
        );
    }

    function getGen(game: string): number {
        if (game.includes("Let's Go")) {
            return 1;
        } else if (
            game === "Pokémon Gold" ||
            game === "Pokémon Silver" ||
            game === "Pokémon Crystal"
        ) {
            return 2;
        } else if (
            game === "Ruby" ||
            game === "Sapphire" ||
            game === "Emerald" ||
            game === "FireRed" ||
            game === "LeafGreen"
        ) {
            return 3;
        } else if (
            game === "Diamond" ||
            game === "Pearl" ||
            game === "Platinum" ||
            game === "HeartGold" ||
            game === "SoulSilver"
        ) {
            return 4;
        } else if (game.includes("Black") || game.includes("White")) {
            return 5;
        } else if (
            game === "X" ||
            game === "Y" ||
            game === "Omega Ruby" ||
            game === "Alpha Sapphire"
        ) {
            return 6;
        } else if (game.includes("Sun") || game.includes("Moon")) {
            return 7;
        } else if (
            game.includes("Sword") ||
            game.includes("Shield") ||
            game.includes("Legends")
        ) {
            return 8;
        } else {
            return 8;
        }
    }

    return (
        <div>
            Optimal Method: <hr />
            <Button onClick={() => returnTop(huntTarget)}>Calculate</Button>
            <br />
            <br />
            <ul>
                <div>
                    {foundOdds.map((aPoke: Pokemon) => (
                        <div key={aPoke.species}>
                            <DisplayMethod
                                display={aPoke}
                                methPass={method}
                                upMethod={passMethod}
                            ></DisplayMethod>
                            <br />
                            <br />
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
}
