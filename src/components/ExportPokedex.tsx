import React from "react";
import { Button } from "react-bootstrap";
import pokeJSON from "../assets/exports/MethodsTableTemplate.json";
import { PokemonExport } from "../interfaces/PokemonExport";

export function ExportPokedex({
    mapFullDex
}: {
    mapFullDex: (dexList: string[]) => PokemonExport[];
}): JSX.Element {
    function dexToString(fullDex: PokemonExport[]) {
        const dexArray = fullDex.map(
            (aPoke: PokemonExport): string =>
                aPoke.species +
                "," +
                aPoke.target +
                "," +
                (aPoke.methods[0].environment.includes("Masuda")
                    ? "Any"
                    : aPoke.methods[0].game.replaceAll(",", "")) +
                "," +
                aPoke.methods[0].location +
                "," +
                aPoke.methods[0].environment.replaceAll(",", ";") +
                "," +
                aPoke.methods[0].time +
                "," +
                aPoke.methods[0].weather +
                "," +
                aPoke.methods[0].season +
                "," +
                aPoke.methods[0].SOS +
                "\n"
        );
        const dexString =
            "Species,Target As,Game,Location,Environment,Time,Weater,Season,SOS\n" +
            dexArray.reduce((fullstring, current) => fullstring + current);
        return dexString;
    }

    function exportFile() {
        const fullDexMethods = mapFullDex(pokeJSON.Pokedex);
        downloadBlob(
            dexToString(fullDexMethods),
            "FullDexMethods.csv",
            "text/csv;charset=utf-8;"
        );
    }

    function downloadBlob(
        content: string,
        filename: string,
        contentType: string
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
            <Button onClick={() => exportFile()}>Calculate Full Pokedex</Button>
        </div>
    );
}
