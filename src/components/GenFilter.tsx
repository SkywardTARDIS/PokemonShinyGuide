import React from "react";
import "../App.css";
import { Form } from "react-bootstrap";

export function GenFilter({
    genValue,
    filterGenerationPasser
}: {
    genValue: number;
    filterGenerationPasser: (generations: number) => void;
}): JSX.Element {
    const genList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div>
            {genList.map((aGen: number): JSX.Element => {
                return (
                    <tr key={aGen}>
                        <Form.Group>
                            <Form.Check
                                type="radio"
                                label={aGen === 0 ? "All" : "Gen " + aGen}
                                defaultChecked={aGen === genValue}
                                checked={aGen === genValue}
                                onChange={() => filterGenerationPasser(aGen)}
                            />
                        </Form.Group>
                    </tr>
                );
            })}
        </div>
    );
}
