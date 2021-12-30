import { useState } from 'react';
import { IPeople, IStateStore } from '../interfaces';
import { useSelector } from 'react-redux'

function GetDegrees() {
    const people = useSelector((state: IStateStore) => state.people);
    const relations = useSelector((state: IStateStore) => state.relations);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    let pathsType: string[][] = [];
    const [allPaths, setAllPaths] = useState(pathsType);
    const [buttonClicked, setButtonClicked] = useState(0);

    const isVisited = (person: string, visited: string[]) => {
        for (let p of visited) {
            if (p === person) {
                return true;
            }
        }
        return false;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let name1: IPeople = {
            name: person1
        };
        let name2: IPeople = {
            name: person2
        };

        if (name1.name === name2.name) {
            alert("Person cannot be same");
            setButtonClicked(0);
            return;
        }
        let flag1: Boolean = false, flag2: Boolean = false;
        for (let p of people) {
            if (p.name === name1.name) {
                flag1 = true;
            }
            if (p.name === name2.name) {
                flag2 = true;
            }
        }
        if (!flag1 || !flag2) {
            alert("Person does not exist");
            setButtonClicked(0);
            return;
        }

        // Convert all relations to adjacency list
        let adjacencyList: { [key: string]: string[] } = {};
        for (let p of people) {
            adjacencyList[p.name] = [];
        }
        for (let r of relations) {
            adjacencyList[r.person1.name].push(r.person2.name);
            adjacencyList[r.person2.name].push(r.person1.name);
        }
        interface IQueue {
            name: string;
            path: string[];
        };
        // Find All the Paths
        let paths: string[][] = [];
        let queue: IQueue[] = [];
        queue.push({
            name: name1.name,
            path: [name1.name]
        });
        while (queue.length > 0) {
            let current = queue.shift() as IQueue;

            if (current.name === name2.name) {
                paths.push(current.path);
                continue;
            }
            for (let neighbour of adjacencyList[current.name]) {
                if (!isVisited(neighbour, current.path)) {
                    queue.push({
                        name: neighbour,
                        path: [...current.path, neighbour]
                    });
                }
            }
        }
        setButtonClicked(1);
        setAllPaths(paths);
    }

    return (
        <div className='relative flex-col items-center'>
            <div className='w-11/12 ml-5 lg:w-2/5 lg:mx-auto mt-10 bg-[#fafafa] shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 sm:pl-12 lg:pl-16 sm:pr-12 lg:pr-16'>
                <h3 className='mb-10 text-2xl text-black font-bold font-heading'>Get Degrees Of Seperation</h3>
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
                    <button onClick={handleSubmit} className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-12'> Get Degrees </button>
                </form>
                
            </div>
            {buttonClicked === 1 &&
                    <div id="paths" className='w-11/12 ml-5 lg:w-2/5 lg:mx-auto mt-10 bg-[#fafafa] shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 sm:pl-12 lg:pl-16 sm:pr-12 lg:pr-16'>
                        <h3 className='mb-10 text-2xl text-black font-bold font-heading'>Paths</h3>
                        {
                            allPaths.length > 0 ?
                                allPaths.map((path: string[], index: number) => {
                                    return <div key={index}>{`${index + 1}. ${path.join(" -> ")}`}</div>
                                })
                                :
                                <h3 className='mb-10 text-2xl text-black font-bold font-heading'>No Paths Found</h3>
                        }
                    </div>
                }
        </div>

    )
}


export default GetDegrees;