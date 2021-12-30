import React from 'react';
import './App.css';
import AddPeople from './Components/add-people';
import AddRelationships from './Components/add-relationships';
import ConnectionsHeader from './Components/connections-header';
import GetDegrees from './Components/get-degrees';

function App() {
  return (
    <div className="App px-4 mx-auto relative py-10 2xl:py-10 overflow-hidden">
      <ConnectionsHeader />
      <div className='flex flex-wrap -m-6'>
        <AddPeople />
        <AddRelationships />
      </div>
      <GetDegrees />
    </div>
  );
}

export default App;
