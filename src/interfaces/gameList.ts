import { GameData } from "./GameData";

export const preShinyLock: string[] = [
    "Pokémon Gold",
    "Pokémon Silver",
    "Pokémon Crystal",
    "Ruby",
    "Sapphire",
    "Emerald",
    "FireRed",
    "LeafGreen",
    "Diamond",
    "Pearl",
    "Platinum",
    "HeartGold",
    "SoulSilver"
];

export const games: string[] = [
    "Pokémon Gold",
    "Pokémon Silver",
    "Pokémon Crystal",
    "Ruby",
    "Sapphire",
    "Emerald",
    "FireRed",
    "LeafGreen",
    "Diamond",
    "Pearl",
    "Platinum",
    "HeartGold",
    "SoulSilver",
    "Black",
    "White",
    "Black 2",
    "White 2",
    "X",
    "Y",
    "Omega Ruby",
    "Alpha Sapphire",
    "Sun",
    "Moon",
    "Ultra Sun",
    "Ultra Moon",
    "Pokémon Sword",
    "Pokémon Shield",
    "Pokémon Brilliant Diamond",
    "Pokémon Shining Pearl",
    "Let's Go, Pikachu!",
    "Let's Go, Eevee!",
    "Legends: Arceus",
    "Scarlet",
    "Violet"
];

const fullData: GameData[] = games.map(function (theGame: string) {
    const newGame: GameData = {
        game: theGame,
        owned: false,
        sExists: false,
        oExists: false,
        hasShiny: false,
        hasOval: false
    };
    return newGame;
});

const gameList = fullData.map((currElement: GameData, index: number) => {
    return {
        ...currElement,
        sExists: index > 14 ? true : false,
        oExists: index > 14 && index < 29 ? true : false
    };
});

export { gameList };
