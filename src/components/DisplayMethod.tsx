import React from "react";
import { Pokemon } from "../interfaces/Pokemon";
//import { getGen } from "./FinalCalcs";
import Egg from "../assets/images/Egg.jpg";
import fullOdds from "../assets/images/FullOdds.jpg";
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

export function DisplayMethod({ display }: { display: Pokemon }): JSX.Element {
    let methodImage = MissingNo;
    let methodString = "Not Obtainable";
    if (display.methods[0].environment !== "None") {
        methodImage = fullOdds;
        methodString = "Full Odds";
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
            methodString = "Friend Safari";
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
            methodString = "Egg Hatching Purgatory";
        } else if (display.species === "Jirachi") {
            methodImage = Jirachi;
            methodString = "Game Resetting Purgatory";
        } else if (display.species === "Celebi") {
            methodImage = IlexForest;
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
            <div>SOS: {display.methods[0].SOS}</div>
            <div>Weather: {display.methods[0].weather}</div>
            <div>Time: {display.methods[0].time}</div>
            {(display.methods[0].game.includes("Black") ||
                display.methods[0].game.includes("White")) && (
                <div>Season: {display.methods[0].season}</div>
            )}
        </div>
    );
}