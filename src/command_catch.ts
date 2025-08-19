import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    const pokemonName = args[0];

    if (!pokemonName) {
        console.log("Pokemon name is REQUIRED!");
        return;
    }

    try {
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemon = await state.api.fetchPokemon(pokemonName);

        const max_base_experience = 300;
        let catchChance = 5;
        if (pokemon.base_experience < max_base_experience) {
            catchChance = Math.round(((max_base_experience - pokemon.base_experience) * 100) / max_base_experience);

            if (catchChance < 5) {
                catchChance = 5; 
            }
        }

        const catchRoll = Math.round((Math.random() * 100) + 1);
        if (catchChance > catchRoll) {
            console.log(`${pokemonName} was caught!`);
            // UPDATE STATE
            state.pokedex[pokemon.name] = pokemon;
        } else {
            console.log(`${pokemonName} escaped!`);
        }

    } catch (error) {
        console.log((error as Error).message);
    }

}
