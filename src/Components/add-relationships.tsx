import {useState, useEffect} from 'react';
import { addRelation } from "../Actions/addRelation";
import { IPeople, IRelationship, IStateStore } from '../interfaces';
import {useSelector, useDispatch} from 'react-redux'

function AddRelationships() {
    const dispatch = useDispatch();
    const people = useSelector((state: IStateStore) => state.people);
    const relations = useSelector((state: IStateStore) => state.relations);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');

    useEffect(() => {
        console.log(relations);
    }, [relations]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        let name1: IPeople = {
            name: person1
        };
        let name2: IPeople = {
            name: person2
        };
        const relation: IRelationship = {
            person1 : name1,
            person2 : name2,
        };
        let flag1: Boolean = false, flag2: Boolean = false;
        for(let p of people){
            if(p.name === relation.person1.name){
                flag1 = true;
            }
            if(p.name === relation.person2.name){
                flag2 = true;
            }
        }
        if(!flag1 || !flag2) {
            alert("Person does not exist");
            return;
        }
        if(relation.person1.name === relation.person2.name) {
            alert("Person cannot be same");
            return;
        }
        for(let r of relations){
            if(r.person1.name === relation.person1.name && r.person2.name === relation.person2.name){
                alert("Relation already exists");
                return;
            }
            if(r.person1.name === relation.person2.name && r.person2.name === relation.person1.name){
                alert("Relation already exists");
                return;
            }
        }
        dispatch(addRelation(relation));
    }
    return (
        <div>
            <h3>Add Relationships</h3>
            <form>
                <label> Add Person 1 Name </label>
                <input type="text" id="person-name1" name="person-name1" placeholder='Enter person name'
                onChange={(event) => setPerson1(event.target.value)}
                ></input> <br />
                <label> Add Person 2 Name </label>
                <input type="text" id="person-name2" name="person-name2" placeholder='Enter person name'
                onChange={(event) => setPerson2(event.target.value)}
                ></input> <br />
                <button onClick={handleSubmit}> Add Relation </button>
            </form>
        </div>
    )
}

export default AddRelationships;