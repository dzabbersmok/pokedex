import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
            .toLowerCase()
            .trim()
            .split(" ")
            .filter(word => word !== "");
}

export function startREPL(state: State) {
    state.readline.prompt();

    state.readline.on('line', async (line) => {
        const input = cleanInput(line);

        if (input.length === 0) {
            state.readline.prompt();
            return;
        }

        const command = input[0];

        if (!state.commands[command]) {
            console.log(`Unknown command: "${command}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }

        try {
            state.commands[command].callback(state);
        } catch (error) {
            console.log(error);
        }

        state.readline.prompt();
    });
}