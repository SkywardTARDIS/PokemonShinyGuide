import React from "react";
import { GameData } from "../interfaces/GameData";
import { GameList } from "./GameList";

export function GameSelector({
    games,
    upOwned
}: {
    games: GameData[];
    upOwned: (game: GameData) => void;
}): JSX.Element {
    return (
        <div>
            Select your games:
            <hr />
            <ul>
                {games.map((aGame: GameData) => (
                    <div key={aGame.game}>
                        <GameList game={aGame} upOwned={upOwned}></GameList>
                    </div>
                ))}
            </ul>
        </div>
    );
}