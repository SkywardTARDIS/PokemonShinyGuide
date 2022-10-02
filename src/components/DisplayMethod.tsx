import React from "react";
import { Pokemon } from "../interfaces/Pokemon";
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

export function DisplayMethod({
    display,
    methPass,
    upMethod
}: {
    display: Pokemon;
    methPass: string;
    upMethod: (aMethod: string) => void;
}): JSX.Element {
    let methodImage = MissingNo;
    upMethod("Not Obtainable");
    if (display.methods[0].environment !== "None") {
        methodImage = fullOdds;
        upMethod("Full Odds");
        if (
            display.methods[0].environment.includes("Masuda") ||
            display.methods[0].environment.includes("Egg")
        ) {
            methodImage = Egg;
            upMethod("Eggs");
        } else if (display.methods[0].environment.includes("Radar")) {
            methodImage = Radar;
            upMethod("PokeRadar");
        } else if (display.methods[0].environment.includes("Friend Safari")) {
            methodImage = FriendSafari;
            upMethod("Friend Safari");
        } else if (
            display.methods[0].SOS !== "N/A" &&
            display.methods[0].SOS !== ""
        ) {
            methodImage = SOS;
            upMethod("SOS Chaining");
        } else if (display.methods[0].environment.includes("Dexnav")) {
            methodImage = Dexnav;
            upMethod("Dexnav Chaining");
        } else if (display.methods[0].environment.includes("Massive Mass")) {
            methodImage = MMO;
            upMethod("Massive Mass Outbreaks");
        } else if (display.methods[0].environment.includes("Horde")) {
            methodImage = Horde;
            upMethod("Horde Encounters");
        } else if (display.methods[0].environment.includes("Starter")) {
            methodImage = Starter;
            upMethod("Starter Reset");
        } else if (display.methods[0].environment.includes("Max Raid")) {
            methodImage = Dynamax;
            upMethod("Dynamax Adventures");
        } else if (display.species === "Meltan") {
            methodImage = Mystery;
            upMethod("Mystery Box");
        } else if (
            display.methods[0].environment.includes("Rod") &&
            (display.methods[0].game === "X" ||
                display.methods[0].game === "Y" ||
                display.methods[0].game === "Omega Ruby" ||
                display.methods[0].game === "Alpha Sapphire")
        ) {
            methodImage = ChainFish;
            upMethod("Chain Fishing");
        } else if (display.species === "Manaphy") {
            methodImage = Manaphy;
            upMethod("Egg Hatching Purgatory");
        } else if (display.species === "Jirachi") {
            methodImage = Jirachi;
            upMethod("Reset the entire game");
        }
    }
    return (
        <div>
            <h5>{display.species}</h5>
            Hunt Method: {methPass}
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
