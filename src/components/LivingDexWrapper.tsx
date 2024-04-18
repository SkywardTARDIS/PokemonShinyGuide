import React from "react";
import "../App.css";
import { Pokedex, ShinyForms, ShinyStatus } from "../interfaces/ShinyStatus";
import { SpeciesDisplay } from "./SpeciesDisplay";
import { Form } from "react-bootstrap";
import { ExportJson } from "./ExportJson";
import { ImportJson } from "./ImportJson";
import { DexProgress } from "../interfaces/DexProgress";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function LivingDexWrapper({
    filterDex,
    fullDex,
    addShinyGame,
    removeShinyGame,
    updateShinyCounts,
    formDex,
    updateFormPasser,
    updateGender,
    filterStringPasser,
    filterCompletionPasser,
    filterValue,
    importAll,
    dexStats
}: {
    filterDex: ShinyStatus[];
    fullDex: ShinyStatus[];
    addShinyGame: (species: string, game: string) => void;
    removeShinyGame: (species: string, game: string) => void;
    updateShinyCounts: (species: string, game: string, count: number) => void;
    formDex: ShinyForms;
    updateFormPasser: (species: string, formName: string) => void;
    updateGender: (species: string, gender: string) => void;
    filterStringPasser: (event: ChangeEvent) => void;
    filterCompletionPasser: (completion: number) => void;
    filterValue: number;
    importAll: (importDex: Pokedex) => void;
    dexStats: DexProgress;
}): JSX.Element {
    function updateCompletionNone() {
        if ((filterValue & 1) > 0) {
            filterCompletionPasser(filterValue - 1);
        } else {
            filterCompletionPasser(filterValue + 1);
        }
    }

    function updateCompletionPartial() {
        if ((filterValue & 2) > 0) {
            filterCompletionPasser(filterValue - 2);
        } else {
            filterCompletionPasser(filterValue + 2);
        }
    }

    function updateCompletionComplete() {
        if ((filterValue & 4) > 0) {
            filterCompletionPasser(filterValue - 4);
        } else {
            filterCompletionPasser(filterValue + 4);
        }
    }

    return (
        <div>
            <div>
                <h3>Pokedex Filters:</h3>
                <table>
                    <td>
                        Search:
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Search here"
                                onChange={filterStringPasser}
                            />
                        </Form.Group>
                    </td>
                    <td width="50px"></td>
                    <td>
                        <tr>
                            <Form.Group>
                                <Form.Check
                                    label="No Shiny"
                                    defaultChecked={(filterValue & 1) > 0}
                                    onChange={updateCompletionNone}
                                />
                            </Form.Group>
                        </tr>
                        <tr>
                            <Form.Group>
                                <Form.Check
                                    label="Partial"
                                    defaultChecked={(filterValue & 2) > 0}
                                    onChange={updateCompletionPartial}
                                />
                            </Form.Group>
                        </tr>
                        <tr>
                            <Form.Group>
                                <Form.Check
                                    label="Complete"
                                    defaultChecked={(filterValue & 4) > 0}
                                    onChange={updateCompletionComplete}
                                />
                            </Form.Group>
                        </tr>
                    </td>
                    <td width="50px"></td>
                    <td width="150px">
                        <tr>
                            <ExportJson
                                fullDex={fullDex}
                                fullForms={formDex}
                            ></ExportJson>
                        </tr>
                        <tr>
                            <ImportJson importAll={importAll}></ImportJson>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            Species Dex: {dexStats.speciesObtained}/
                            {dexStats.speciesTotal}
                        </tr>
                        <tr>
                            Form Dex: {dexStats.formsObtained}/
                            {dexStats.formTotal}
                        </tr>
                    </td>
                </table>
                <hr />
            </div>
            {filterDex.map(
                (aStatus: ShinyStatus): JSX.Element => (
                    <SpeciesDisplay
                        key={aStatus.species}
                        status={aStatus}
                        addShinyGame={addShinyGame}
                        removeShinyGame={removeShinyGame}
                        updateShinyCounts={updateShinyCounts}
                        formDex={formDex}
                        updateFormPasser={updateFormPasser}
                        updateGender={updateGender}
                    ></SpeciesDisplay>
                )
            )}
        </div>
    );
}
