import React from "react";
import "../App.css";
import { Form } from "react-bootstrap";
import { FormObject } from "../interfaces/ShinyStatus";

export function FormDisplay({
    formData,
    species,
    updateFormPasser
}: {
    formData: FormObject;
    species: string;
    updateFormPasser: (
        species: string,
        formName: string,
        newForm: boolean
    ) => void;
}): JSX.Element {
    function updateFormPasserPasser() {
        updateFormPasser(species, formData.formName, !formData.formValue);
    }
    const renameForm = { Exclaim: "!", Question: "?" };
    const newFormName =
        renameForm[formData.formName as keyof typeof renameForm] ||
        formData.formName;
    return (
        <div>
            <Form.Group>
                <Form.Check
                    label={newFormName}
                    defaultChecked={formData.formValue}
                    checked={formData.formValue}
                    onChange={updateFormPasserPasser}
                />
            </Form.Group>
        </div>
    );
}
