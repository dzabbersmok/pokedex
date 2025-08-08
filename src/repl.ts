import { createInterface } from "readline";

import { getCommands } from "./commandsRegistry.js";

export function cleanInput(input: string): string[] {
    return input
            .toLowerCase()
            .trim()
            .split(" ")
            .filter(word => word !== "");
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > "
    });

    const commandsRegistry = getCommands();

    rl.prompt();

    rl.on('line', (line) => {
        const input = cleanInput(line);

        if (input.length === 0) {
            rl.prompt();
            return;
        } 

        const command = input[0];

        if (commandsRegistry[command]) {
            commandsRegistry[command].callback(commandsRegistry);
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}