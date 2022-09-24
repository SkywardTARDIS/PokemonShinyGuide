import { GameData } from "./GameData";

const games: string[] = [
    "Gold",
    "Silver",
    "Crystal",
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
    "Sword",
    "Shield",
    "Let's Go, Pikachu!",
    "Let's Go, Eevee!",
    "Legends: Arceus"
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
        sExists: index > 12 ? true : false,
        oExists: index > 12 && index < 27 ? true : false
    };
});

export { gameList };
