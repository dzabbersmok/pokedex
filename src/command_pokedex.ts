import { State } from "./state";

export async function commandPokedex(state: State) {
    const pokedex = state.pokedex;
    if (Object.keys(pokedex).length === 0) {
        console.log("Your pokedex is empty... Go catch some pokemon!");
        return;
    }

    console.log("Your Pokedex:")
    for (const record of Object.entries(pokedex)) {
        console.log(`  - ${record[0]}`);
    }
}