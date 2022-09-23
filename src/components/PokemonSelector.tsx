import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Pokemon } from "../interfaces/Pokemon";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function PokemonSelector({
    options
}: {
    options: Pokemon[];
}): JSX.Element {
    const species: string[] = options.map(
        (poke: Pokemon): string => poke.species
    );
    const [selected, changeSelect] = useState<string>(species[0]);
    function upChoice(event: ChangeEvent) {
        changeSelect(event.target.value);
    }

    return (
        <div>
            <div>Select Your Shiny Target:</div>
            <Form.Group>
                <Form.Label>
                    <Form.Select value={selected} onChange={upChoice}>
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
