import { IRelationship } from "../interfaces";

export const addRelation = (relation: IRelationship) => ({
    type: "ADD_RELATIONSHIPS",
    payload: relation
});