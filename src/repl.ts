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

    rl.prompt();

    rl.on('line', (line) => {
        const input = cleanInput(line);

        if (input.length === 0) {
            rl.prompt();
            return;
        } 

        const command = input[0];
        const commandsRegistry = getCommands();

        if (!commandsRegistry[command]) {
            console.log(`Unknown command: "${command}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }

        try {
            commandsRegistry[command].callback(commandsRegistry);
        } catch (error) {
            console.log(error);
        }

        rl.prompt();
});
}