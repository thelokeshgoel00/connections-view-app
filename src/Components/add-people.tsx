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
        <div className='relative w-full lg:w-1/2 p-6 px-6 '>
            <div className='ml-5 mr-5 md:ml-20 md:mr-20 px-6 lg:px-20 py-12 lg:py-24 bg-[#fafafa] rounded-lg shadow-md border border-gray-200'>
                <h3 className='mb-10 text-2xl text-black font-bold font-heading'>Add People</h3>
                <form>
                    <label htmlFor='person' className='text-sm font-medium text-gray-900 block mb-2'> Add Person Name </label>
                    <input type="text" id="person-name" name="person-name" placeholder='person name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    onChange={(event) => setPersonName(event.target.value)}
                    ></input>
                    <button onClick={handleSubmit} className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-12' > Add Person </button>
                </form>
                <div className='md:pt-12 md:pb-12'></div>
            </div>
        </div>
    )
}

export default AddPeople;