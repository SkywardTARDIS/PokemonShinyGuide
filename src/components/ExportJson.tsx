/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from "react";
import { Button } from "react-bootstrap";
import { ShinyForms, ShinyStatus } from "../interfaces/ShinyStatus";

export function ExportJson({
    fullDex,
    fullForms,
}: {
    fullDex: ShinyStatus[];
    fullForms: ShinyForms;
}): React.JSX.Element {
    function exportFile(fullDex: ShinyStatus[], fullForms: ShinyForms) {
        const toExport = { Pokedex: { ...fullDex }, Forms: { ...fullForms } };
        const exportString = JSON.stringify(toExport);
        downloadBlob(exportString, "ShinyDex.json", "text/csv;charset=utf-8;");
    }

    function downloadBlob(
        content: string,
        filename: string,
        contentType: string,
    ) {
        // Create a blob
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        pom.click();
    }

    return (
        <div>
            <Button onClick={() => exportFile(fullDex, fullForms)}>
                Export File
            </Button>
        </div>
    );
}
