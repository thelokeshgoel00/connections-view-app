import { IPeople } from "../interfaces";

export const addPeople = (people: IPeople) => ({
    type: "ADD_PEOPLE",
    payload: people
});