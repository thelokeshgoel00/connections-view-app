import {useState, useEffect} from 'react';
import { IPeople, IRelationship, IStateStore } from '../interfaces';
import {useSelector} from 'react-redux'

function GetDegrees(){
    const people = useSelector((state: IStateStore) => state.people);
    const relations = useSelector((state: IStateStore) => state.relations);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    let pathsType: string[][] = [];
    const [allPaths, setAllPaths] = useState(pathsType);
    //const [pathContent, setPathContent] = useState('');

    const isVisited = (person: string, visited: string[]) => {
        for(let p of visited){
            if(p === person){
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
        let flag1: Boolean = false, flag2: Boolean = false;
        for(let p of people){
            if(p.name === name1.name){
                flag1 = true;
            }
            if(p.name === name2.name){
                flag2 = true;
            }
        }
        if(!flag1 || !flag2) {
            alert("Person does not exist");
            return;
        }

        // Convert all relations to adjacency list
        let adjacencyList: {[key: string]: string[]} = {};
        for(let r of relations){
            if(!adjacencyList[r.person1.name]){
                adjacencyList[r.person1.name] = [];
            }
            adjacencyList[r.person1.name].push(r.person2.name);

            if(!adjacencyList[r.person2.name]){
                adjacencyList[r.person2.name] = [];
            }
            adjacencyList[r.person2.name].push(r.person1.name);
        }
        interface IQueue{
            name: string;
            path: string[];
        };
        // Find All the Paths
        let paths: string[][] = [];
        let queue: IQueue[] = [];
        queue.push({
            name : name1.name,
            path: [name1.name]
        });
        while(queue.length > 0){
            let current = queue.shift() as IQueue;

            if(current.name === name2.name){
                paths.push(current.path);
                continue;
            }
            for(let neighbour of adjacencyList[current.name]){
                if(!isVisited(neighbour, current.path)){
                    queue.push({
                        name: neighbour,
                        path: [...current.path, neighbour]
                    });
                }
            }
        }
        setAllPaths(paths);
    }

    // useEffect(() => {
    //     // print all the paths 
    //     let pathContentCurrent: string = "";
    //     for(let path of allPaths){
    //         pathContentCurrent += `${path.join(" -> ")}`;
    //         pathContentCurrent += "<br/>";
    //     }
    //     setPathContent(pathContentCurrent);

    // }, [allPaths]);

    return (
        <div>
            <h3>Get Degrees Of Seperation</h3>
            <form>
                <label> Add Person 1 Name </label>
                <input type="text" id="person-name1" name="person-name1" placeholder='Enter person name'
                onChange={(event) => setPerson1(event.target.value)}
                ></input> <br />
                <label> Add Person 2 Name </label>
                <input type="text" id="person-name2" name="person-name2" placeholder='Enter person name'
                onChange={(event) => setPerson2(event.target.value)}
                ></input> <br />
                <button onClick={handleSubmit}> Get Degrees </button>
            </form>
            <div id="paths">
                {
                    allPaths.map((path: string[], index: number) => {
                        return <div key={index}>{`${index+1}. ${path.join(" -> ")}`}</div>
                    })
                }
            </div>
        </div>

    )
}


export default GetDegrees;