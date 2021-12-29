import {useState, useEffect} from 'react';
import { addPeople } from "../Actions/addPeople";
import { IPeople, IStateStore } from '../interfaces';
import {useSelector, useDispatch} from 'react-redux'

function AddPeople() {
    const dispatch = useDispatch();
    const people = useSelector((state: IStateStore) => state.people);
    const [personName, setPersonName] = useState('');

    useEffect(() => {
        console.log(people);
    }, [people]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        let name: string = personName;
        const person: IPeople = {
            name: name,
        };
        for (let p of people) {
            if (p.name === person.name) {
                alert("Person already exists");
                return;
            }
        }
        dispatch(addPeople(person));
    }
    return (
        <div>
            <h3>Add People</h3>
            <form>
                <label> Add Person Name </label>
                <input type="text" id="person-name" name="person-name" placeholder='person name'
                onChange={(event) => setPersonName(event.target.value)}
                ></input> <br />
                <button onClick={handleSubmit}> Add Person </button>
            </form>
        </div>
    )
}

export default AddPeople;