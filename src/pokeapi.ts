import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache = new Cache(5000);

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL && this.#cache.get(pageURL)) {
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
            return this.#cache.get(url)?.val;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        this.#cache.add(url, data);

        return data;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}/`;

        const cached = this.#cache.get<Pokemon>(url);
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const pokemon = await response.json();
            this.#cache.add(url, pokemon);

            return pokemon;
        } catch (error) {
            throw new Error(
                    `Error fetching pokemon '${pokemonName}': ${(error as Error).message}`,
                );
        }
        
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

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};