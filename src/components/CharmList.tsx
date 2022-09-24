import React from "react";
import { Form } from "react-bootstrap";
import { GameData } from "../interfaces/GameData";

export function CharmList({
    game,
    upCharm
}: {
    game: GameData;
    upCharm: (game: GameData, charmID: boolean) => void;
}): JSX.Element {
    return (
        <div>
            <li className="charmList">
                <table width="150">
                    <tr>
                        <td colSpan={2}>
                            <h5>{game.game}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td width="30%">
                            <div>
                                {game.sExists && (
                                    <Form.Group>
                                        <Form.Label>Shiny</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            role="checkbox"
                                            aria-label="gameOwned"
                                            checked={game.hasShiny}
                                            onClick={() => upCharm(game, true)}
                                        />
                                    </Form.Group>
                                )}
                            </div>
                        </td>
                        <td width="30%">
                            <div>
                                {game.oExists && (
                                    <Form.Group>
                                        <Form.Label>Oval</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            role="checkbox"
                                            aria-label="gameOwned"
                                            checked={game.hasOval}
                                            onClick={() => upCharm(game, false)}
                                        />
                                    </Form.Group>
                                )}
                            </div>
                        </td>
                    </tr>
                </table>
            </li>
            <hr />
        </div>
    );
}
