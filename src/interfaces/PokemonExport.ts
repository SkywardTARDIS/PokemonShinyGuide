import { EncounterMethod } from "./EncounterMethod";

export interface PokemonExport {
    species: string;
    target: string;
    methods: EncounterMethod[];
}
