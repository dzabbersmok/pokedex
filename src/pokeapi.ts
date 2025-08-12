import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache = new Cache(5000);

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL && this.#cache.get(pageURL)) {
            console.log("CACHE USED");
            return this.#cache.get(pageURL)?.val;
        }

        const url = `${pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`}`
        const response = await fetch(url);
        const location = await response.json();
        this.#cache.add(url, location);
        return location;
    
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`
        if (this.#cache.get(url)) {
            console.log("CACHE USED");
            return this.#cache.get(url)?.val;
        }
        
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        const data = await response.json();
        this.#cache.add(url, data);
        return data;
    }
}

export type LocationResult = {
    name: string;
    url: string;
};

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string | null;
    results: LocationResult[];
};

export type LocationName = {
    name: string;
    language: LocationResult;
}

export type EncounterVersionDetails = {
    rate: number;
    version: LocationResult
}

export type EncounterMethodRate = {
    encounter_method: LocationResult;
    version_details: EncounterVersionDetails[];
}

export type PokemonEncounter = {
    pokemon: LocationResult;
    version_details: EncounterVersionDetails[];
}

export type Location = {
    encounter_method_rates: EncounterMethodRate[];
    game_index: number;
    id: number;
    location: LocationResult;
    name: string;
    names: LocationName[];
    pokemon_encounters: PokemonEncounter[];
}