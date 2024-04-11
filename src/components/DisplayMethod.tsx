import React from "react";
import { Pokemon } from "../interfaces/Pokemon";
import { getGen } from "./FinalCalcs";
import Egg from "../assets/images/Egg.jpg";
import Gen1 from "../assets/images/Gen1.png";
import Gen2 from "../assets/images/Gen2.png";
import Gen3 from "../assets/images/Gen3.png";
import Gen4 from "../assets/images/Gen4.png";
import Gen5 from "../assets/images/Gen5.png";
import Gen6 from "../assets/images/Gen6.png";
import Gen7 from "../assets/images/FullOdds.jpg";
import Gen8 from "../assets/images/Gen8.png";
import Gen9 from "../assets/images/Gen9.png";
import SVOutbreak from "../assets/images/SVOutbreak.png";
import MMO from "../assets/images/MMO.jpeg";
import SOS from "../assets/images/SOS.jpg";
import FriendSafari from "../assets/images/FriendSafari.jpeg";
import Radar from "../assets/images/PokeRadar.png";
import Dexnav from "../assets/images/Dexnav.jpg";
import ChainFish from "../assets/images/ChainFishing.jpg";
import Horde from "../assets/images/Horde.jpg";
import MissingNo from "../assets/images/MissingNo.png";
import Dynamax from "../assets/images/Dynamax.jpg";
import Starter from "../assets/images/starters.jpg";
import Mystery from "../assets/images/MysteryBox.png";
import Jirachi from "../assets/images/Jirachi.jpg";
import Manaphy from "../assets/images/Manaphy.png";
import IlexForest from "../assets/images/IlexForest.png";
import OddEgg from "../assets/images/OddEgg.jpg";
import Chaining from "../assets/images/Chaining.png";
import Legendaries from "../assets/jsons/Legendaries.json";

export function DisplayMethod({ display }: { display: Pokemon }): JSX.Element {
    let methodImage = MissingNo;
    let methodString = "Not Obtainable";
    if (display.methods[0].environment !== "None") {
        methodString = "Full Odds";
        if (getGen(display.methods[0].game) === 1) {
            methodImage = Gen1;
            if (
                display.methods[0].environment !== "Interact" &&
                !display.methods[0].environment.includes("Trade")
            ) {
                methodString = "Catch Chaining";
                methodImage = Chaining;
            }
        } else if (getGen(display.methods[0].game) === 2) {
            methodImage = Gen2;
        } else if (getGen(display.methods[0].game) === 3) {
            methodImage = Gen3;
        } else if (getGen(display.methods[0].game) === 4) {
            methodImage = Gen4;
        } else if (getGen(display.methods[0].game) === 5) {
            methodImage = Gen5;
        } else if (getGen(display.methods[0].game) === 6) {
            methodImage = Gen6;
        } else if (getGen(display.methods[0].game) === 7) {
            methodImage = Gen7;
        } else if (getGen(display.methods[0].game) === 8) {
            methodImage = Gen8;
        } else if (getGen(display.methods[0].game) === 9) {
            methodImage = Gen9;
        }
        if (
            display.methods[0].environment.includes("Masuda") ||
            display.methods[0].environment.includes("Egg")
        ) {
            if (display.methods[0].environment.includes("Odd")) {
                methodImage = OddEgg;
                methodString = "Odd Egg";
            } else {
                methodImage = Egg;
                methodString = "Eggs";
            }
        } else if (display.methods[0].environment.includes("Radar")) {
            methodImage = Radar;
            methodString = "PokeRadar";
        } else if (display.methods[0].environment.includes("Friend Safari")) {
            methodImage = FriendSafari;
            methodString = "Friend Safari - Function no longer available";
        } else if (
            display.methods[0].SOS !== "N/A" &&
            display.methods[0].SOS !== ""
        ) {
            methodImage = SOS;
            methodString = "SOS Chaining";
        } else if (display.methods[0].environment.includes("Dexnav")) {
            methodImage = Dexnav;
            methodString = "Dexnav Chaining";
        } else if (display.methods[0].environment.includes("Massive Mass")) {
            methodImage = MMO;
            methodString = "Massive Mass Outbreaks";
        } else if (display.methods[0].environment.includes("SV Outbreak")) {
            methodImage = SVOutbreak;
            methodString = "Mass Outbreaks";
        } else if (display.methods[0].environment.includes("Horde")) {
            methodImage = Horde;
            methodString = "Horde Encounters";
        } else if (display.methods[0].environment.includes("Starter")) {
            methodImage = Starter;
            methodString = "Starter Reset";
        } else if (display.methods[0].environment.includes("Max Raid")) {
            methodImage = Dynamax;
            methodString = "Dynamax Adventures";
        } else if (display.species === "Meltan") {
            methodImage = Mystery;
            methodString = "Mystery Box";
        } else if (
            display.methods[0].environment.includes("Rod") &&
            (display.methods[0].game === "X" ||
                display.methods[0].game === "Y" ||
                display.methods[0].game === "Omega Ruby" ||
                display.methods[0].game === "Alpha Sapphire")
        ) {
            methodImage = ChainFish;
            methodString = "Chain Fishing";
        } else if (display.species === "Manaphy") {
            methodImage = Manaphy;
            methodString = "Egg Hatching Purgatory/ACE";
        } else if (display.species === "Jirachi") {
            methodImage = Jirachi;
            methodString = "Game Resetting Purgatory";
        } else if (display.species === "Celebi") {
            methodImage = IlexForest;
        } else if (
            display.methods[0].location.includes("Ultra Space") &&
            !Legendaries.Legendaries.includes(display.species)
        ) {
            methodString = "Wormhole Hunt";
        }
    }
    return (
        <div>
            <h5>{display.species}</h5>
            Hunt Method: {methodString}
            <div>
                <img className="pokeGif" src={methodImage}></img>
            </div>
            <div>Game: {display.methods[0].game}</div>
            <div>Location: {display.methods[0].location}</div>
            <div>Environment: {display.methods[0].environment}</div>
            {display.methods[0].SOS !== "N/A" && (
                <div>SOS: {display.methods[0].SOS}</div>
            )}
            {display.methods[0].weather !== "N/A" && (
                <div>Weather: {display.methods[0].weather}</div>
            )}
            {display.methods[0].time !== "N/A" && (
                <div>Time: {display.methods[0].time}</div>
            )}
            {(display.methods[0].game.includes("Black") ||
                display.methods[0].game.includes("White")) && (
                <div>Season: {display.methods[0].season}</div>
            )}
        </div>
    );
}
