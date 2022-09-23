import React from "react";
import { Form } from "react-bootstrap";
import { GameData } from "../interfaces/GameData";

export function GameList({
    game,
    upOwned
}: {
    game: GameData;
    upOwned: (game: GameData) => void;
}): JSX.Element {
    return (
        <div>
            <li className="noBullet">
                <table width="100%">
                    <td width="10%">
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Check
                                type="checkbox"
                                role="checkbox"
                                aria-label="gameOwned"
                                checked={game.owned}
                                onClick={() => upOwned(game)}
                            />
                        </Form.Group>
                    </td>
                    <td width="90%" className="gameList" valign="bottom">
                        {game.game}
                    </td>
                </table>
            </li>
        </div>
    );
}
