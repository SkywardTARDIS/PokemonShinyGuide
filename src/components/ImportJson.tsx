import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Pokedex } from "../interfaces/ShinyStatus";

export function ImportJson({
    importAll
}: {
    importAll: (importDex: Pokedex) => void;
}): JSX.Element {
    const [contents, setContents] = useState<string>("");
    const [view, toggleView] = useState<boolean>(false);
    function importFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const filename = event.target.files[0];
            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                const newContent =
                    loadEvent.target?.result || "Data was not loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContents(newContent as string);
            };
            // Actually read the file
            reader.readAsText(filename);
        }
    }

    function changeToggle() {
        toggleView(true);
    }

    function makeChange() {
        toggleView(false);
        const makeDex: Pokedex = JSON.parse(contents);
        importAll(makeDex);
        setContents("");
    }

    return (
        <div>
            {!view && <Button onClick={changeToggle}>Upload File</Button>}
            {view && (
                <div>
                    <Form.Group controlId="exampleForm">
                        <Form.Label>Upload a Shiny Dex</Form.Label>
                        <Form.Control type="file" onChange={importFile} />
                    </Form.Group>
                    <Button onClick={makeChange}>Import File</Button>
                </div>
            )}
        </div>
    );
}
