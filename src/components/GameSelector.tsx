import React from "react";
import { Form } from "react-bootstrap";
import { GameData } from "../interfaces/GameData";
import { GameList } from "./GameList";

export function GameSelector({
    games,
    allSelect,
    upOwned,
    addAll
}: {
    games: GameData[];
    allSelect: boolean;
    upOwned: (game: GameData) => void;
    addAll: (currentState: boolean) => void;
}): JSX.Element {
    return (
        <div>
            Select your games:
            <hr />
            <div>
                <table width="100%">
                    <td width="10%">
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Check
                                type="checkbox"
                                role="checkbox"
                                aria-label="gameOwned"
                                checked={allSelect}
                                onClick={() => addAll(allSelect)}
                            />
                        </Form.Group>
                    </td>
                    <td width="90%" className="gameList" valign="bottom">
                        Select All
                    </td>
                </table>
            </div>
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
