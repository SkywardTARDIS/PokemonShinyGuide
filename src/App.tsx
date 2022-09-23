import React from "react";
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

    console.log(testDex);
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
                        <td width="17%"></td>
                        <td width="66%">
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
                                <br />
                                This tool is quite simple to use: Simply type
                                and/or select the name of the Pokemon that you
                                wish to shiny hunt, and put in a list of all the
                                games you own. Additionally, there are
                                indicators for whether or not you have acquired
                                the Shiny and Oval Charms in each game.
                            </p>
                        </td>
                        <td width="17%"></td>
                    </table>
                </div>
            </body>

            <PokemonSelector options={testDex}></PokemonSelector>
        </div>
    );
}

export default App;
