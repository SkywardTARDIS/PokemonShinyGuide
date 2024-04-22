import React, { useState } from "react";
import "../App.css";
import { ShinyForms, ShinyStatus } from "../interfaces/ShinyStatus";
import { ShinyCount } from "../interfaces/ShinyCount";
import { DisplayShinyGame } from "./DisplayShinyGame";
import { AddGame } from "./AddGame";
import { abbreviations } from "../interfaces/gameList";
import { FormObject } from "../interfaces/ShinyStatus";
import { FormDisplay } from "./FormDisplay";
import { GenderDisplay } from "./GenderDisplay";
import { sLockInterface } from "../interfaces/sLockInterface";
import shinyLock from "../assets/jsons/ShinyLock.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function SpeciesDisplay({
    status,
    addShinyGame,
    removeShinyGame,
    updateShinyCounts,
    formDex,
    updateFormPasser,
    updateGender
}: {
    status: ShinyStatus;
    addShinyGame: (species: string, game: string) => void;
    removeShinyGame: (species: string, game: string) => void;
    updateShinyCounts: (species: string, game: string, count: number) => void;
    formDex: ShinyForms;
    updateFormPasser: (
        species: string,
        formName: string,
        newForm: boolean
    ) => void;
    updateGender: (species: string, gender: string) => void;
}): JSX.Element {
    function addGame() {
        addShinyGame(status.species, currentGame);
        const newGameList = gameList.filter(
            (aGame: string): boolean => aGame !== currentGame
        );
        updateGames(newGameList);
        updateCurrentGame(newGameList[0]);
    }

    function deleteGame(game: string, count: number) {
        if (count == 0) {
            removeShinyGame(status.species, game);
            const newGamesList = [...gameList, game];
            const finalGameList = [...abbreviations].filter(
                (aGame: string): boolean => newGamesList.includes(aGame)
            );
            updateGames(finalGameList);
            updateCurrentGame(finalGameList[0]);
        }
    }

    const currentGames = status.counts.map(
        (aCount: ShinyCount): string => aCount.game
    );
    const remainingGames = [...abbreviations].filter(
        (aGame: string): boolean => !currentGames.includes(aGame)
    );

    const [gameList, updateGames] = useState<string[]>([...remainingGames]);
    const [currentGame, updateCurrentGame] = useState<string>(gameList[0]);
    function updateCurrent(event: ChangeEvent) {
        updateCurrentGame(event.target.value);
    }

    let allForms: FormObject[] = [];
    const getForms =
        formDex[status.species.replace("-", "") as keyof typeof formDex];
    if (typeof getForms !== "undefined") {
        const formKeys = Object.keys(getForms);
        allForms = formKeys.map(function (key: string) {
            const obtained = getForms[key as keyof typeof getForms];
            return { formName: key, formValue: obtained };
        });
    }

    let colorCode = 0;
    if (status.formsObtained >= status.forms) {
        colorCode = 2;
    } else if (status.formsObtained === 0) {
        colorCode = 0;
    } else {
        colorCode = 1;
    }
    if (status.gender === 1) {
        if (status.genderObtained === 3) {
            colorCode = 2;
        } else if (status.genderObtained > 0 || status.formsObtained > 0) {
            colorCode = 1;
        } else {
            colorCode = 0;
        }
    }
    const sLock: sLockInterface[] = shinyLock.ShinyLocked;
    const isShinyLocked: sLockInterface[] = sLock.filter(
        (aLock: sLockInterface): boolean => aLock.species === status.species
    );
    if (isShinyLocked.length > 0) {
        if (isShinyLocked[0].game === "All") {
            colorCode = -1;
        }
    }

    return (
        <div>
            <table>
                <td width="200px">
                    {colorCode === -1 && (
                        <h3 className="shinyLocked">{status.species}</h3>
                    )}
                    {colorCode === 0 && (
                        <h3 className="noShiny">{status.species}</h3>
                    )}
                    {colorCode === 1 && (
                        <h3 className="partialShiny">{status.species}</h3>
                    )}
                    {colorCode === 2 && (
                        <h3 className="fullShiny">{status.species}</h3>
                    )}
                </td>
                <td width="200px">
                    <AddGame
                        currentGame={currentGame}
                        updateCurrent={updateCurrent}
                        gameList={gameList}
                        addGame={addGame}
                    ></AddGame>
                </td>
                <td width="100px">
                    <table>
                        {status.forms > 1 &&
                            allForms.map(
                                (aForm: FormObject): JSX.Element => (
                                    <tr key={aForm.formName}>
                                        <FormDisplay
                                            formData={aForm}
                                            species={status.species.replace(
                                                "-",
                                                ""
                                            )}
                                            updateFormPasser={updateFormPasser}
                                        ></FormDisplay>
                                    </tr>
                                )
                            )}
                        {status.gender === 1 && (
                            <GenderDisplay
                                status={status}
                                updateGender={updateGender}
                            ></GenderDisplay>
                        )}
                    </table>
                </td>
                {status.counts.map(
                    (aCount: ShinyCount): JSX.Element => (
                        <td
                            key={aCount.game}
                            className="gameList"
                            width="125px"
                        >
                            <DisplayShinyGame
                                species={status.species}
                                count={aCount}
                                updateShinyCounts={updateShinyCounts}
                                deleteGame={deleteGame}
                            ></DisplayShinyGame>
                        </td>
                    )
                )}
            </table>
            <hr />
        </div>
    );
}
