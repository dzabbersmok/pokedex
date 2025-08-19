import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]) {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("Pokemon name is REQUIRED!");
        return;
    }

    const selectedPokemon = state.pokedex[pokemonName];
    if (!selectedPokemon) {
        console.log("You have not caught that pokemon yet.");
        return;
    }

    console.log(`Name: ${selectedPokemon.name}`);
    console.log(`Height: ${selectedPokemon.height}`);
    console.log(`Weight: ${selectedPokemon.weight}`);
    console.log("Stats:");
    for (const stat of selectedPokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const types of selectedPokemon.types) {
        console.log(`  - ${types.type.name}`);
    }
}