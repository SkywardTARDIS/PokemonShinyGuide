/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from "react";
import "../App.css";
import { Form } from "react-bootstrap";

export function GenFilter({
    genValue,
    filterGenerationPasser,
}: {
    genValue: number;
    filterGenerationPasser: (generations: number) => void;
}): React.JSX.Element {
    const genList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div>
            {genList.map((aGen: number): React.JSX.Element => {
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
