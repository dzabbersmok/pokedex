export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(`${pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`}`);
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
    return response.json();
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