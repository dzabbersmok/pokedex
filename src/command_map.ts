import { State } from "./state";

export async function commandMap(state: State) {
    
    const locations = await state.api.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const [key, value] of Object.entries(locations.results)) {
        console.log(value.name);
    }
}

export async function commandMapB(state: State) {
    if (state.prevLocationsURL === null) {
        console.log("You're on the first page");
        return
    }

    const locations = await state.api.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const [key, value] of Object.entries(locations.results)) {
        console.log(value.name);
    }
}