import React from "react";
import { Form } from "react-bootstrap";
import { Pokemon } from "../interfaces/Pokemon";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function PokemonSelector({
    options,
    selectedPoke,
    selectPasser
}: {
    options: Pokemon[];
    selectedPoke: string;
    selectPasser: (event: ChangeEvent) => void;
}): JSX.Element {
    const species: string[] = options.map(
        (poke: Pokemon): string => poke.species
    );

    return (
        <div>
            <div>Select Your Shiny Target:</div>
            <hr />
            <Form.Group>
                <Form.Label>
                    <Form.Select value={selectedPoke} onChange={selectPasser}>
                        {species.map(
                            (choice: string): JSX.Element => (
                                <option key={choice} value={choice}>
                                    {choice}
                                </option>
                            )
                        )}
                    </Form.Select>
                </Form.Label>
            </Form.Group>
        </div>
    );
}
