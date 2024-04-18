import React from "react";
import "../App.css";
import { ShinyCount } from "../interfaces/ShinyCount";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function DisplayShinyGame({
    species,
    count,
    updateShinyCounts,
    deleteGame
}: {
    species: string;
    count: ShinyCount;
    updateShinyCounts: (species: string, game: string, count: number) => void;
    deleteGame: (game: string, count: number) => void;
}): JSX.Element {
    function updateShinies(event: ChangeEvent) {
        updateShinyCounts(species, count.game, Number(event.target.value));
    }
    function deleteGamePasser() {
        deleteGame(count.game, count.count);
    }
    return (
        <div>
            <table>
                <tr>{count.game}:</tr>
                <tr>
                    <td className="shinyGame">
                        <Form.Group>
                            <Form.Control
                                type="number"
                                min="0"
                                placeholder="counts"
                                value={count.count}
                                onChange={updateShinies}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <Button
                            disabled={count.count > 0}
                            onClick={deleteGamePasser}
                            variant="danger"
                        >
                            {"🗑️"}
                        </Button>
                    </td>
                </tr>
            </table>
        </div>
    );
}
