import React, { useState } from "react";
import "../App.css";
import MissingNo from "../assets/images/MissingNo.png";
import { PokemonSelector } from "../components/PokemonSelector";
import { Pokemon } from "../interfaces/Pokemon";
import { EncounterMethod } from "../interfaces/EncounterMethod";
import { GameData } from "../interfaces/GameData";
import Pokedex from "../assets/jsons/PokedexV4.json";
import RegionalDex from "../assets/jsons/RegionalDex.json";
import { gameList } from "../interfaces/gameList";
import { GameSelector } from "../components/GameSelector";
import { CharmInfo } from "../components/CharmInfo";
import { FinalCalcs } from "../components/FinalCalcs";
import gifs from "../assets/gifs/exportGifs";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function CalculatorWrapper(): JSX.Element {
    const dexKey = Object.keys(Pokedex);
    const testDex: Pokemon[] = dexKey.map(function (key: string) {
        const currPokemon: Pokemon = Pokedex[key as keyof typeof Pokedex];
        const currMethods: EncounterMethod[] = currPokemon.methods.map(
            function (method: EncounterMethod) {
                const newEncounter: EncounterMethod = {
                    game: method.game,
                    location: method.location,
                    rarity: method.rarity.toString(),
                    environment: method.environment,
                    time: method.time,
                    weather: method.weather,
                    season: method.season,
                    SOS: method.SOS
                };
                return newEncounter;
            }
        );
        const newPokemon: Pokemon = {
            species: currPokemon.species,
            id: currPokemon.id,
            prevolution: currPokemon.prevolution,
            methods: [...currMethods]
        };
        return newPokemon;
    });
    const regionDexKey = Object.keys(RegionalDex);
    const regionDex: Pokemon[] = regionDexKey.map(function (key: string) {
        const currPokemon: Pokemon =
            RegionalDex[key as keyof typeof RegionalDex];
        const currMethods: EncounterMethod[] = currPokemon.methods.map(
            function (method: EncounterMethod) {
                const newEncounter: EncounterMethod = {
                    game: method.game,
                    location: method.location,
                    rarity: method.rarity.toString(),
                    environment: method.environment,
                    time: method.time,
                    weather: method.weather,
                    season: method.season,
                    SOS: method.SOS
                };
                return newEncounter;
            }
        );
        const newPokemon: Pokemon = {
            species: currPokemon.species,
            id: currPokemon.id,
            prevolution: currPokemon.prevolution,
            methods: [...currMethods]
        };
        return newPokemon;
    });

    const [dexList] = useState<Pokemon[]>(testDex);
    const [regionals] = useState<Pokemon[]>(regionDex);
    const [trueFullDex] = useState<Pokemon[]>([...dexList, ...regionals]);
    const [spriteURL, upSprite] = useState<string>(
        "https://play.pokemonshowdown.com/sprites/ani-shiny/celebi.gif"
    );
    //const hisuiGif = [157, 503, 570, 571, 724];

    const [regionSelect, updateRegionSelect] = useState<Pokemon>(regionals[0]);
    const [selectedPoke, updateSelect] = useState<Pokemon>(testDex[250]);
    const [trueSelected, updateTrueSelect] = useState<Pokemon>(testDex[250]);
    const [allSelected, updateAllGames] = useState<boolean>(false);

    function selectPasser(event: ChangeEvent) {
        const species: string = event.target.value;
        const selection = dexList.filter(
            (poke: Pokemon): boolean => poke.species === species
        );
        updateSelect(selection[0]);
        updateTrueSelect(selection[0]);
        possibleGames(selection[0]);
        if (selection[0].id < 906) {
            const copyName = selection[0].species;
            let newName = copyName
                .replaceAll(/[ ':.]/g, "")
                .replace("♀", "f")
                .replace("♂", "m")
                .replaceAll("é", "e");
            if (newName.includes("-o")) {
                newName = newName.replace("-", "");
            }
            if (newName === "Unown") {
                newName = newName + "-question";
            }
            const newURL = `https://play.pokemonshowdown.com/sprites/ani-shiny/${newName.toLocaleLowerCase()}.gif`;
            upSprite(newURL);
        } else if (selection[0].id <= 905) {
            const newURL = `https://www.serebii.net/Shiny/SWSH/${selection[0].id}.png`;
            upSprite(newURL);
        } else if (selection[0].id <= 1010) {
            //const newURL = `https://www.serebii.net/Shiny/SV/new/${selection[0].id}.png`;
            //const newURL = paldeaGifs[selection[0].id.toString() as keyof unknown];
            const newURL =
                gifs[("p" + selection[0].id.toString()) as keyof unknown];
            console.log(newURL);
            upSprite(newURL);
        } else {
            const newURL = `https://img.pokemondb.net/sprites/home/shiny/${selection[0].species
                .toLocaleLowerCase()
                .replaceAll(" ", "-")}.png`;
            upSprite(newURL);
        }
    }

    function selectRegionPasser(event: ChangeEvent) {
        const species: string = event.target.value;
        const selection = regionals.filter(
            (poke: Pokemon): boolean => poke.species === species
        );
        updateRegionSelect(selection[0]);
        updateTrueSelect(selection[0]);
        possibleGames(selection[0]);
        const copyName = selection[0].species;
        const newName = copyName.replaceAll(/[ ':.]/g, "");
        let newURL = `https://play.pokemonshowdown.com/sprites/ani-shiny/${newName.toLocaleLowerCase()}.gif`;
        if (copyName.includes("Basculin")) {
            newURL =
                "https://play.pokemonshowdown.com/sprites/ani-shiny/basculin-whitestriped.gif";
        } else if (copyName.includes("Qwilfish")) {
            newURL = gifs["p211"];
        }
        /*
        if (copyName.includes("Hisui") && !hisuiGif.includes(selection[0].id)) {
            let newID = selection[0].id.toString();
            if (newID.length === 2) {
                newID = "0" + newID;
            }
            if (selection[0].id !== 550) {
                newURL = `https://www.serebii.net/Shiny/SWSH/${newID}-h.png`;
            } else {
                newURL = `https://www.serebii.net/Shiny/SWSH/${newID}-w.png`;
            }
        }
        */
        if (copyName.includes("Paldea")) {
            let newID = selection[0].id.toString();
            if (newID.length === 2) {
                newID = "0" + newID;
            }
            //newURL = `https://www.serebii.net/Shiny/SV/new/${newID}-p.png`;
            //newURL = paldeaGifs[selection[0].id.toString() as keyof unknown];
            newURL = gifs[("p" + selection[0].id.toString()) as keyof unknown];
        }
        upSprite(newURL);
    }

    const [allGames, updateGames] = useState<GameData[]>(gameList);
    const [huntableGames, updateAvailable] = useState<GameData[]>([
        ...gameList.slice(0, 29),
        ...gameList.slice(31)
    ]);
    const [selectedGames, updateSelected] = useState<GameData[]>([]);

    function possibleGames(target: Pokemon) {
        const remGen1 =
            target.id > 151 && target.id != 808 && target.id != 809
                ? [...allGames.slice(0, 29), ...allGames.slice(31)]
                : [...allGames];
        const remGen2 = target.id > 251 ? [...remGen1.slice(3)] : [...remGen1];
        const remGen3 = target.id > 386 ? [...remGen2.slice(5)] : [...remGen2];
        const remGen4 =
            target.id > 493
                ? [...remGen3.slice(5, 19), ...remGen3.slice(21)]
                : [...remGen3];
        const remGen5 = target.id > 649 ? [...remGen4.slice(4)] : [...remGen4];
        const remGen6 = target.id > 721 ? [...remGen5.slice(4)] : [...remGen5];
        const remGen7 = target.id > 809 ? [...remGen6.slice(4)] : [...remGen6];
        const remGen8 = target.id > 898 ? [...remGen7.slice(2)] : [...remGen7];
        updateAvailable(remGen8);
        const charmList = remGen8.filter(
            (aGame: GameData): boolean => aGame.owned
        );
        updateSelected(charmList);
    }

    function upOwned(game: GameData) {
        if (game.owned === true) {
            updateAllGames(false);
        }
        const newData: GameData = { ...game, owned: !game.owned };
        const newList = allGames.map((aGame: GameData) =>
            aGame.game === game.game ? { ...newData } : { ...aGame }
        );
        updateGames(newList);

        const availableList = huntableGames.map((aGame: GameData) =>
            aGame.game === game.game ? { ...newData } : { ...aGame }
        );
        updateAvailable(availableList);

        const charmList = availableList.filter(
            (aGame: GameData): boolean => aGame.owned
        );
        updateSelected(charmList);
    }

    function addAll(currentState: boolean) {
        let newList = [...allGames];
        let charmList = [...allGames];
        let availableList = [...huntableGames];
        if (!currentState) {
            newList = allGames.map(function (aGame: GameData) {
                return { ...aGame, owned: true };
            });
            availableList = [...huntableGames].map(function (aGame: GameData) {
                return { ...aGame, owned: true };
            });
            charmList = availableList;
        } else {
            newList = allGames.map(function (aGame: GameData) {
                return { ...aGame, owned: false };
            });
            availableList = [...huntableGames].map(function (aGame: GameData) {
                return { ...aGame, owned: false };
            });
            charmList = [...availableList].filter(
                (aGame: GameData): boolean => aGame.owned
            );
        }
        updateGames(newList);
        updateAvailable(availableList);
        updateSelected(charmList);
        updateAllGames(!currentState);
    }

    function upCharm(game: GameData, charmID: boolean) {
        const newData: GameData = charmID
            ? { ...game, hasShiny: !game.hasShiny }
            : { ...game, hasOval: !game.hasOval };

        const newList = allGames.map((aGame: GameData) =>
            aGame.game === game.game ? { ...newData } : { ...aGame }
        );
        updateGames(newList);

        const availableList = huntableGames.map((aGame: GameData) =>
            aGame.game === game.game ? { ...newData } : { ...aGame }
        );
        updateAvailable(availableList);

        const charmList = availableList.filter(
            (aGame: GameData): boolean => aGame.owned
        );
        updateSelected(charmList);
    }

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        event.currentTarget.src = MissingNo;
    };

    return (
        <div>
            <table className="infoTable" width="100%">
                <td width="33%" valign="top" height="33%">
                    <PokemonSelector
                        options={dexList}
                        regions={regionals}
                        selectedPoke={selectedPoke.species}
                        regionSelected={regionSelect.species}
                        selectPasser={selectPasser}
                        regionPasser={selectRegionPasser}
                    ></PokemonSelector>
                    <img
                        className="pokeGif"
                        src={spriteURL}
                        onError={imageOnErrorHandler}
                    />
                </td>
                <td width="16%">
                    <GameSelector
                        games={huntableGames}
                        upOwned={upOwned}
                        allSelect={allSelected}
                        addAll={addAll}
                    ></GameSelector>
                </td>
                <td width="18%" valign="top">
                    <CharmInfo
                        games={selectedGames}
                        upCharm={upCharm}
                    ></CharmInfo>
                </td>
                <td width="33%">
                    <FinalCalcs
                        finalGames={selectedGames}
                        fullDex={trueFullDex}
                        huntTarget={trueSelected}
                    ></FinalCalcs>
                </td>
            </table>
        </div>
    );
}
