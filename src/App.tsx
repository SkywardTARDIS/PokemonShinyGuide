import React, { useState } from "react";
import "./App.css";
import Spiritomb from "./assets/images/Spiritomb.png";
import Shuckle from "./assets/images/Shuckle.png";
import { PokemonSelector } from "./components/PokemonSelector";
//import Legendaries from "./assets/jsons/Legendaries.json";
import { Pokemon } from "./interfaces/Pokemon";
import { EncounterMethod } from "./interfaces/EncounterMethod";
import Pokedex from "./assets/jsons/PokedexV2.json";
//import sLock from "./assets/jsons/ShinyLock.json";
//import { EncounterMethod } from "./interfaces/EncounterMethod";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

function App(): JSX.Element {
    const dexKey = Object.keys(Pokedex);
    const testDex: Pokemon[] = dexKey.map(function (key: string) {
        const currPokemon: Pokemon = Pokedex[key as keyof typeof Pokedex];
        const currMethods: EncounterMethod[] = currPokemon.methods.map(
            function (method: EncounterMethod) {
                const newEncounter: EncounterMethod = {
                    game: method.game,
                    location: method.location,
                    rarity: method.rarity,
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
            methods: [...currMethods]
        };
        return newPokemon;
    });

    const [dexList] = useState<Pokemon[]>(testDex);
    const [spriteURL, upSprite] = useState<string>(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
    );
    const [selectedPoke, updateSelect] = useState<Pokemon>(testDex[0]);
    function selectPasser(event: ChangeEvent) {
        const species: string = event.target.value;
        const selection = dexList.filter(
            (poke: Pokemon): boolean => poke.species === species
        );
        updateSelect(selection[0]);
        const newURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${selection[0].id}.png`;
        console.log(newURL);
        upSprite(newURL);
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <img src={Spiritomb} width="200px"></img>
                    Comprehensive Shiny Hunting Guide
                    <img src={Shuckle} width="200px"></img>
                </div>
            </header>
            <body>
                <div>
                    <table>
                        <td width="20%"></td>
                        <td width="60%">
                            <p>
                                Welcome to the wonderful world of Pokemon! This
                                is a personal project I have been working on,
                                for fun. As an avid shiny hunter, I eventually
                                began to wonder what the optimal way to go about
                                it was. And so, this tool was born. It collects
                                all of the encounter information from every
                                single Pokemon in the game, and from that
                                calculates the fastest method by which to obtain
                                each and every one.
                                <hr />
                                This tool is quite simple to use:
                            </p>
                            <table>
                                <td width="25%"></td>
                                <td width="50%">
                                    <ul>
                                        <li>Select your hunt target</li>
                                        <li>
                                            Select the list of games you own
                                        </li>
                                        <li>
                                            Choose which charms you have in each
                                            game
                                        </li>
                                    </ul>
                                </td>
                                <td width="25%"></td>
                            </table>
                        </td>
                        <td width="20%"></td>
                    </table>
                </div>
            </body>
            <br />
            <body>
                <table width="100%">
                    <td width="33%">
                        <PokemonSelector
                            options={dexList}
                            selectedPoke={selectedPoke.species}
                            selectPasser={selectPasser}
                        ></PokemonSelector>
                        <img src={spriteURL} width="300px" />
                    </td>
                    <td width="33%"></td>
                    <td width="33%"></td>
                </table>
                <br />
            </body>
        </div>
    );
}

export default App;
