import React from "react";
import { Button } from "react-bootstrap";
import { GameData } from "../interfaces/GameData";
import { Pokemon } from "../interfaces/Pokemon";
import { EncounterMethod } from "../interfaces/EncounterMethod";
import Legendaries from "../assets/jsons/Legendaries.json";
import noEggs from "../assets/jsons/NoEggs.json";
import FriendSafari from "../assets/jsons/FriendSafari.json";
import galarDex from "../assets/jsons/GalarDex.json";
/*
import guaranteed from "../assets/jsons/Guaranteed.json";
import hisuiDex from "../assets/jsons/HisuiDex.json";
import Pokedex from "../assets/jsons/PokedexV2.json";
*/
import { sLockInterface } from "../interfaces/sLockInterface";
import shinyLock from "../assets/jsons/ShinyLock.json";
//import { gameList } from "../interfaces/gameList";

export function FinalCalcs({
    finalGames,
    huntTarget
}: {
    finalGames: GameData[];
    huntTarget: Pokemon;
}): JSX.Element {
    const oldOdds = 8092;
    const newOdds = 4096;
    function calculation(): Pokemon {
        //const Legends: string[] = Legendaries.Legendaries;
        //const Mythicals: string[] = Legendaries.Mythicals;
        const allLocks = [...shinyLock.ShinyLocked].filter(
            (aLock: sLockInterface): boolean => aLock.game === "All"
        );
        const partialLocks = [...shinyLock.ShinyLocked].filter(
            (aLock: sLockInterface): boolean =>
                aLock.game !== "All" && aLock.species === huntTarget.species
        );
        const lockGames = partialLocks.map(
            (aLock: sLockInterface): string => aLock.game
        );
        //clear out shiny locks
        if (
            allLocks
                .map((aLock: sLockInterface): string => aLock.species)
                .includes(huntTarget.species)
        ) {
            return { ...huntTarget, methods: [] };
        }

        const getGames = [...finalGames].map(
            (aGame: GameData): string => aGame.game
        );

        const stripMethods = [...huntTarget.methods].filter(
            (aMeth: EncounterMethod): boolean => getGames.includes(aMeth.game)
        );

        let addDyna = [...stripMethods];
        if (
            getGames.includes("Pokémon Sword") &&
            !huntTarget.species.includes("Regi") &&
            Legendaries.Legendaries.includes(huntTarget.species)
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
            !huntTarget.species.includes("Regi") &&
            !huntTarget.species.includes("ion") &&
            Legendaries.Legendaries.includes(huntTarget.species)
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
            !noEggs.noEggFound.includes(huntTarget.species) ||
            techEggs.includes(huntTarget.species)
        ) {
            const eggGames = [...getGames].filter(
                (aGame: string): boolean =>
                    !(getGen(aGame) < 4 || aGame.includes("Legends"))
            );

            const masudaExists = [...eggGames].map(function (
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
            addMasuda = [...stripLocks, ...masudaExists];
        }

        const galarFix = [...addMasuda].filter(
            (aMeth: EncounterMethod): boolean =>
                !(
                    (aMeth.game.includes("Sword") ||
                        aMeth.game.includes("Shield")) &&
                    aMeth.environment.includes("Masuda") &&
                    !galarDex.Galar.includes(huntTarget.species)
                )
        );

        let addSafari = [...galarFix];
        if (FriendSafari.FriendSafari.includes(huntTarget.species)) {
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

        //all proper methods are now included or excluded
        //mapping all methods to include time to hunt, via calls to finalCalc
        const finalOdds = [...addSafari].map(function (
            aMeth: EncounterMethod
        ): EncounterMethod {
            return finalCalc(aMeth);
        });

        const revizedPoke: Pokemon = {
            ...huntTarget,
            methods: [...finalOdds]
        };
        console.log(revizedPoke);

        return huntTarget;
    }

    //the official function for calculating the time of each method
    function finalCalc(aMeth: EncounterMethod): EncounterMethod {
        const shinyCharm =
            finalGames.filter(
                (aGame: GameData): boolean =>
                    aGame.game === aMeth.game && aGame.hasShiny
            ).length > 0
                ? 0
                : 2;
        const ovalCharm =
            finalGames.filter(
                (aGame: GameData): boolean =>
                    aGame.game === aMeth.game && aGame.hasOval
            ).length > 0
                ? 0
                : 1;
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
                    huntTarget.species === "Feebas" ||
                    huntTarget.species === "Mesprit" ||
                    huntTarget.species === "Articuno" ||
                    huntTarget.species === "Zapdos" ||
                    huntTarget.species === "Moltres" ||
                    huntTarget.species === "Cresselia" ||
                    newMeth.environment.includes("Trees")
                ) {
                    newMeth.rarity = 1000000000;
                } else if (
                    radarLocation(newMeth.location, newMeth.environment)
                ) {
                    newMeth.rarity = 3600 + 50 * 20;
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
                    XYradarLocation(newMeth.location, newMeth.environment)
                ) {
                    newMeth.rarity = 3600 + 50 * 20;
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
                newMeth.rarity = (30 * newOdds) / (2 + shinyCharm) / numRarity;
            } else if (
                newMeth.game.includes("Diamond") ||
                newMeth.game.includes("Pearl")
            ) {
                if (
                    huntTarget.species === "Feebas" ||
                    huntTarget.species === "Mesprit" ||
                    newMeth.environment.includes("Trees")
                ) {
                    newMeth.rarity = 1000000000;
                } else if (
                    radarLocation(newMeth.location, newMeth.environment)
                ) {
                    newMeth.rarity = 3600 + 50 * 20;
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
        } else {
            return 8;
        }
    }

    return (
        <div>
            Optimal Method: <hr />
            <Button onClick={calculation}>Calculate</Button>
        </div>
    );
}
