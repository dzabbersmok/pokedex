import { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const location = args[0]
    console.log("EXPLORE LOCATION", location);
    if (!location) {
        console.log("Location name REQUIRED!");
        return;
    }

    try {
        const response = await state.api.fetchLocation(location);
        const encounters = response.pokemon_encounters;
        console.log(`Exploring ${location}...`);
        console.log("Found Pokemon:");
        for (const encounter of encounters) {
            console.log(`- ${encounter.pokemon.name}`);
        }
    } catch (error) {
        console.log((error as Error).message);
    }
}