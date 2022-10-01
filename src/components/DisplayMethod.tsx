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

export function DisplayMethod({ display }: { display: Pokemon }): JSX.Element {
    let methodImage = MissingNo;
    if (display.methods[0].environment !== "None") {
        methodImage = fullOdds;
        if (display.methods[0].environment.includes("Masuda")) {
            methodImage = Egg;
        } else if (display.methods[0].environment.includes("Radar")) {
            methodImage = Radar;
        } else if (display.methods[0].environment.includes("Friend Safari")) {
            methodImage = FriendSafari;
        } else if (
            display.methods[0].SOS !== "N/A" &&
            display.methods[0].SOS !== ""
        ) {
            methodImage = SOS;
        } else if (display.methods[0].environment.includes("Dexnav")) {
            methodImage = Dexnav;
        } else if (display.methods[0].environment.includes("Massive Mass")) {
            methodImage = MMO;
        } else if (display.methods[0].environment.includes("Horde")) {
            methodImage = Horde;
        } else if (display.methods[0].environment.includes("Max Raid")) {
            methodImage = Dynamax;
        } else if (
            display.methods[0].environment.includes("Rod") &&
            (display.methods[0].game === "X" ||
                display.methods[0].game === "Y" ||
                display.methods[0].game === "Omega Ruby" ||
                display.methods[0].game === "Alpha Sapphire")
        ) {
            methodImage = ChainFish;
        }
    }
    return (
        <div>
            <h5>{display.species}</h5>
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
