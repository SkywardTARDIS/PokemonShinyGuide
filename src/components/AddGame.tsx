import React from "react";
import "../App.css";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function AddGame({
    currentGame,
    updateCurrent,
    gameList,
    addGame
}: {
    currentGame: string;
    updateCurrent: (event: ChangeEvent) => void;
    gameList: string[];
    addGame: () => void;
}): JSX.Element {
    return (
        <div>
            <table>
                <td>
                    <Form.Group>
                        <Form.Select
                            value={currentGame}
                            onChange={updateCurrent}
                        >
                            {gameList.map(
                                (game: string): JSX.Element => (
                                    <option key={game} value={game}>
                                        {game}
                                    </option>
                                )
                            )}
                        </Form.Select>
                    </Form.Group>
                </td>
                <td>
                    <Button onClick={addGame}>Add</Button>
                </td>
            </table>
        </div>
    );
}
