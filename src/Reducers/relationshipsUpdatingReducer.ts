import { IRelationship } from "../interfaces";

export default function relationshipsUpdatingReducer(state = [], action: any) {
    switch (action.type) {
        case "ADD_RELATIONSHIPS":
            return [...state, action.payload];
        case "REMOVE_RELATIONSHIPS":
            return state.filter((relation: IRelationship) => relation !== action.payload);
        default:
            return state;
    }
}