import { CLICommand } from "./command";

export function commandHelp(commandsRegistry: Record<string, CLICommand>) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const command in commandsRegistry) {
        console.log(`${command}: ${commandsRegistry[command].description}`);
    }
    console.log();
}