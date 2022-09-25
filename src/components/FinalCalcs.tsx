import React from "react";
import { Button } from "react-bootstrap";
import { GameData } from "../interfaces/GameData";
import { Pokemon } from "../interfaces/Pokemon";
import { EncounterMethod } from "../interfaces/EncounterMethod";
/*
import Legendaries from "../assets/jsons/Legendaries.json";
import noEggs from "../assets/jsons/NoEggs.json";
import FriendSafari from "../assets/jsons/FriendSafari.json";
import galarDex from "../assets/jsons/GalarDex.json";
import guaranteed from "../assets/jsons/Guaranteed.json";
import hisuiDex from "../assets/jsons/HisuiDex.json";
import Pokedex from "../assets/jsons/PokedexV2.json";
import { games, preShinyLock } from "../interfaces/gameList";
*/
import { sLockInterface } from "../interfaces/sLockInterface";
import shinyLock from "../assets/jsons/ShinyLock.json";

export function FinalCalcs({
    finalGames,
    huntTarget
}: {
    finalGames: GameData[];
    huntTarget: Pokemon;
}): JSX.Element {
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

        let stripLocks = [...stripMethods];
        if (lockGames.length > 0) {
            stripLocks = [...stripMethods].filter(
                (aMeth: EncounterMethod): boolean =>
                    [...lockGames].filter(
                        (aGame: string): boolean => !aGame.includes(aMeth.game)
                    ).length > 0
            );
        }
        //all proper methods are now included or excluded (remember to add: Dynamax Adventures, and Masuda Method)

        const revizedPoke: Pokemon = {
            ...huntTarget,
            methods: [...stripLocks]
        };
        console.log(revizedPoke);

        return huntTarget;
    }

    return (
        <div>
            Optimal Method: <hr />
            <Button onClick={calculation}>Calculate</Button>
        </div>
    );
}
