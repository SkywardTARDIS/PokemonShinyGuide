import { EncounterMethod } from "./EncounterMethod";

export interface Pokemon {
    species: string;
    id: number;
    methods: EncounterMethod[];
}
