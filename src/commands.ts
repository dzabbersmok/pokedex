import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        map: {
            name: "map",
            description: "Displays the names of 20 location areas in the Pokemon world",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays the names of previous 20 location areas in the Pokemon world",
            callback: commandMapB
        },
        explore: {
            name: "explore",
            description: "Displays location information",
            callback: commandExplore
        }
        // TODO: add more commands here
    }
}