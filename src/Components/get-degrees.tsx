import {useState, useEffect} from 'react';
import { IPeople, IRelationship, IStateStore } from '../interfaces';
import {useSelector} from 'react-redux'

function GetDegrees(){
    const people = useSelector((state: IStateStore) => state.people);
    const relations = useSelector((state: IStateStore) => state.relations);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();

    }

    return (
        <div>
            <h3>Get Degrees</h3>
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


export default GetDegrees;