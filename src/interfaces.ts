export interface IPeople {
    name: string;
};

export interface IRelationship {
    person1 : IPeople;
    person2 : IPeople;
}

export interface IStateStore {
    people: IPeople[];
    relations: IRelationship[];
}