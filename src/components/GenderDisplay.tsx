import React from "react";
import "../App.css";
import { Form } from "react-bootstrap";
import { ShinyStatus } from "../interfaces/ShinyStatus";

export function GenderDisplay({
    status,
    updateGender
}: {
    status: ShinyStatus;
    updateGender: (species: string, gender: string) => void;
}): JSX.Element {
    function updateGenderMale() {
        updateGender(status.species, "Male");
    }
    function updateGenderFemale() {
        updateGender(status.species, "Female");
    }
    return (
        <div>
            <tr>
                <Form.Group>
                    <Form.Check
                        label="Male"
                        defaultChecked={status.genderObtained % 2 === 1}
                        checked={status.genderObtained % 2 === 1}
                        onClick={updateGenderMale}
                    />
                </Form.Group>
            </tr>
            <tr>
                <Form.Group>
                    <Form.Check
                        label="Female"
                        defaultChecked={status.genderObtained > 1}
                        checked={status.genderObtained > 1}
                        onClick={updateGenderFemale}
                    />
                </Form.Group>
            </tr>
        </div>
    );
}
