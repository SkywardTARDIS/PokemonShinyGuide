import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function PokemonSelector({
    options
}: {
    options: string[];
}): JSX.Element {
    const [selected, changeSelect] = useState<string>(options[0]);
    function upChoice(event: ChangeEvent) {
        changeSelect(event.target.value);
    }

    return (
        <div>
            <div>Multiple Choice Question</div>
            <Form.Group>
                <Form.Label>
                    <Form.Select value={selected} onChange={upChoice}>
                        {options.map(
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
