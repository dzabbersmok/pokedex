import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string | null;
}

export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > "
    });

    const commandsRegistry = getCommands();
    const api = new PokeAPI();

    return {
        readline: rl,
        commands: commandsRegistry,
        api: api,
        nextLocationsURL: "",
        prevLocationsURL: null
    }
}