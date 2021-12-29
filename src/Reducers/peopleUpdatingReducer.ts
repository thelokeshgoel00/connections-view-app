import { IPeople } from "../interfaces";

export default function peopleUpdatingReducer(state = [], action: any) {
    switch (action.type) {
        case "ADD_PEOPLE":
            return [...state, action.payload];
        case "REMOVE_PEOPLE":
            return state.filter((people: IPeople) => people !== action.payload);
        default:
            return state;
    }
}