import { ShinyCount } from "./ShinyCount";

export interface Pokedex {
    Pokedex: ShinyStatus[];
    Forms: ShinyForms;
}

export interface ShinyStatus {
    species: string;
    id: number;
    forms: number;
    formsObtained: number;
    gender: number;
    genderObtained: number;
    counts: ShinyCount[];
}

export interface FormObject {
    formName: string;
    formValue: boolean;
}

export interface ShinyForms {
    TaurosPaldea: TaurosPaldea;
    Unown: Unown;
    Castform: Castform;
    Deoxys: Deoxys;
    Burmy: Burmy;
    Wormadam: Wormadam;
    Shellos: Shellos;
    Gastrodon: Gastrodon;
    Rotom: Rotom;
    Dialga: Dialga;
    Palkia: Palkia;
    Giratina: Giratina;
    Shaymin: Shaymin;
    Basculin: Basculin;
    Deerling: Deerling;
    Sawsbuck: Sawsbuck;
    Tornadus: Tornadus;
    Thundurus: Thundurus;
    Landorus: Landorus;
    Enamorus: Enamorus;
    Kyurem: Kyurem;
    Keldeo: Keldeo;
    Meloetta: Meloetta;
    Vivillon: Vivillon;
    Flabebe: Flabebe;
    Floette: Floette;
    Florges: Florges;
    Pumpkaboo: Pumpkaboo;
    Gourgeist: Gourgeist;
    Zygarde: Zygarde;
    Hoopa: Hoopa;
    Oricorio: Oricorio;
    Lycanroc: Lycanroc;
    Minior: Minior;
    Necrozma: Necrozma;
    Magearna: Magearna;
    Toxtricity: Toxtricity;
    Sinistea: Sinistea;
    Polteageist: Polteageist;
    Alcremie: Alcremie;
    Urshifu: Urshifu;
    Calyrex: Calyrex;
    Ursaluna: Ursaluna;
    Maushold: Maushold;
    Squawkabilly: Squawkabilly;
    Tatsugiri: Tatsugiri;
    Dudunsparce: Dudunsparce;
    Gimmighoul: Gimmighoul;
    Poltchageist: Poltchageist;
    Sinistcha: Sinistcha;
}

export interface TaurosPaldea {
    Combat: boolean;
    Blaze: boolean;
    Aqua: boolean;
}

export interface Unown {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
    E: boolean;
    F: boolean;
    G: boolean;
    H: boolean;
    I: boolean;
    J: boolean;
    K: boolean;
    L: boolean;
    M: boolean;
    N: boolean;
    O: boolean;
    P: boolean;
    Q: boolean;
    R: boolean;
    S: boolean;
    T: boolean;
    U: boolean;
    V: boolean;
    W: boolean;
    X: boolean;
    Y: boolean;
    Z: boolean;
    Exclaim: boolean;
    Question: boolean;
}
export interface Castform {
    Normal: boolean;
    Sunny: boolean;
    Rainy: boolean;
    Snowy: boolean;
}
export interface Deoxys {
    Normal: boolean;
    Attack: boolean;
    Defense: boolean;
    Speed: boolean;
}
export interface Burmy {
    Plant: boolean;
    Sandy: boolean;
    Trash: boolean;
}
export interface Wormadam {
    Plant: boolean;
    Sandy: boolean;
    Trash: boolean;
}
export interface Shellos {
    East: boolean;
    West: boolean;
}
export interface Gastrodon {
    East: boolean;
    West: boolean;
}
export interface Rotom {
    Normal: boolean;
    Heat: boolean;
    Wash: boolean;
    Frost: boolean;
    Fan: boolean;
    Mow: boolean;
}
export interface Dialga {
    Altered: boolean;
    Origin: boolean;
}
export interface Palkia {
    Altered: boolean;
    Origin: boolean;
}
export interface Giratina {
    Altered: boolean;
    Origin: boolean;
}
export interface Shaymin {
    Land: boolean;
    Sky: boolean;
}
export interface Basculin {
    RedStriped: boolean;
    BlueStriped: boolean;
}
export interface Deerling {
    Spring: boolean;
    Summer: boolean;
    Autumn: boolean;
    Winter: boolean;
}
export interface Sawsbuck {
    Spring: boolean;
    Summer: boolean;
    Autumn: boolean;
    Winter: boolean;
}
export interface Tornadus {
    Incarnate: boolean;
    Therian: boolean;
}
export interface Thundurus {
    Incarnate: boolean;
    Therian: boolean;
}
export interface Landorus {
    Incarnate: boolean;
    Therian: boolean;
}
export interface Enamorus {
    Incarnate: boolean;
    Therian: boolean;
}
export interface Kyurem {
    Standard: boolean;
    White: boolean;
    Black: boolean;
}
export interface Keldeo {
    Ordinary: boolean;
    Resolute: boolean;
}
export interface Meloetta {
    Aria: boolean;
    Pirouette: boolean;
}
export interface Vivillon {
    Archipelago: boolean;
    Continental: boolean;
    Elegant: boolean;
    Fancy: boolean;
    Garden: boolean;
    HighPlains: boolean;
    IcySnow: boolean;
    Jungle: boolean;
    Marine: boolean;
    Meadow: boolean;
    Modern: boolean;
    Monsoon: boolean;
    Ocean: boolean;
    Pokeball: boolean;
    Polar: boolean;
    River: boolean;
    Sandstorm: boolean;
    Savanna: boolean;
    Sun: boolean;
    Tundra: boolean;
}
export interface Flabebe {
    Red: boolean;
    Yellow: boolean;
    Orange: boolean;
    Blue: boolean;
    White: boolean;
}
export interface Floette {
    Red: boolean;
    Yellow: boolean;
    Orange: boolean;
    Blue: boolean;
    White: boolean;
}
export interface Florges {
    Red: boolean;
    Yellow: boolean;
    Orange: boolean;
    Blue: boolean;
    White: boolean;
}
export interface Pumpkaboo {
    Sm: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
}
export interface Gourgeist {
    Sm: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
}
export interface Zygarde {
    TenPercent: boolean;
    FiftyPercent: boolean;
    Complete: boolean;
}
export interface Hoopa {
    Confined: boolean;
    Unbound: boolean;
}
export interface Oricorio {
    Baile: boolean;
    PomPom: boolean;
    Pau: boolean;
    Sensu: boolean;
}
export interface Lycanroc {
    Midday: boolean;
    Midnight: boolean;
    Dusk: boolean;
}
export interface Minior {
    Red: boolean;
    Orange: boolean;
    Yellow: boolean;
    Green: boolean;
    Blue: boolean;
    Indigo: boolean;
    Violet: boolean;
}
export interface Necrozma {
    Normal: boolean;
    DuskMane: boolean;
    DawnWings: boolean;
}
export interface Magearna {
    Old: boolean;
    Original: boolean;
}
export interface Toxtricity {
    AmpedUp: boolean;
    LowKey: boolean;
}
export interface Sinistea {
    Phony: boolean;
    Antique: boolean;
}
export interface Polteageist {
    Phony: boolean;
    Antique: boolean;
}
export interface Alcremie {
    Strawberry: boolean;
    Berry: boolean;
    Love: boolean;
    Star: boolean;
    Clover: boolean;
    Flower: boolean;
    Ribbon: boolean;
}
export interface Urshifu {
    SingleStrike: boolean;
    RapidStrike: boolean;
}
export interface Calyrex {
    Normal: boolean;
    IceRider: boolean;
    ShadowRider: boolean;
}
export interface Ursaluna {
    Normal: boolean;
    BloodMoon: boolean;
}
export interface Maushold {
    FourFamily: boolean;
    ThreeFamily: boolean;
}
export interface Squawkabilly {
    Green: boolean;
    Blue: boolean;
    Yellow: boolean;
    White: boolean;
}
export interface Tatsugiri {
    Curly: boolean;
    Droopy: boolean;
    Stretchy: boolean;
}
export interface Dudunsparce {
    TwoSegment: boolean;
    ThreeSegment: boolean;
}
export interface Gimmighoul {
    Chest: boolean;
    Roaming: boolean;
}
export interface Poltchageist {
    Counterfeit: boolean;
    Artisan: boolean;
}
export interface Sinistcha {
    Counterfeit: boolean;
    Artisan: boolean;
}
