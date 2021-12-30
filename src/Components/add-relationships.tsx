import { useState, useEffect } from 'react';
import { addRelation } from "../Actions/addRelation";
import { IPeople, IRelationship, IStateStore } from '../interfaces';
import { useSelector, useDispatch } from 'react-redux'

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
            person1: name1,
            person2: name2,
        };
        let flag1: Boolean = false, flag2: Boolean = false;
        for (let p of people) {
            if (p.name === relation.person1.name) {
                flag1 = true;
            }
            if (p.name === relation.person2.name) {
                flag2 = true;
            }
        }
        if (!flag1 || !flag2) {
            alert("Person does not exist");
            return;
        }
        if (relation.person1.name === relation.person2.name) {
            alert("Person cannot be same");
            return;
        }
        for (let r of relations) {
            if (r.person1.name === relation.person1.name && r.person2.name === relation.person2.name) {
                alert("Relation already exists");
                return;
            }
            if (r.person1.name === relation.person2.name && r.person2.name === relation.person1.name) {
                alert("Relation already exists");
                return;
            }
        }
        dispatch(addRelation(relation));
    }
    return (
        <div className='relative w-full lg:w-1/2 p-6 px-6'>
            <div className='ml-5 mr-5 md:ml-20 md:mr-20 px-6 lg:px-20 py-12 lg:py-24 bg-[#fafafa] rounded-lg shadow-md border border-gray-200'>
                <h3 className='mb-10 text-2xl text-black font-bold font-heading'>Add Relationships</h3>
                <form>
                    <label className='text-sm font-medium text-gray-900 block mb-2'> Add Person 1 Name </label>
                    <input type="text" id="person-name1" name="person-name1" placeholder='Enter person name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        onChange={(event) => setPerson1(event.target.value)}
                    ></input> <br />
                    <label className='text-sm font-medium text-gray-900 block mb-2'> Add Person 2 Name </label>
                    <input type="text" id="person-name2" name="person-name2" placeholder='Enter person name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        onChange={(event) => setPerson2(event.target.value)}
                    ></input>
                    <button onClick={handleSubmit} className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-12'> Add Relation </button>
                </form>
            </div>
        </div>
    )
}

export default AddRelationships;