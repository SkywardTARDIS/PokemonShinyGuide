import React from "react";
import { GameData } from "../interfaces/GameData";
import { CharmList } from "./CharmList";

export function CharmInfo({
    games,
    upCharm
}: {
    games: GameData[];
    upCharm: (game: GameData, charmID: boolean) => void;
}): JSX.Element {
    return (
        <div>
            Select your charms:
            <hr />
            <ul>
                {games.map((aGame: GameData) => (
                    <div key={aGame.game}>
                        <CharmList game={aGame} upCharm={upCharm}></CharmList>
                    </div>
                ))}
            </ul>
        </div>
    );
}
