import React from 'react';
import './App.css';
import AddPeople from './Components/add-people';
import AddRelationships from './Components/add-relationships';
import ConnectionsHeader from './Components/connections-header';
import GetDegrees from './Components/get-degrees';

function App() {
  return (
    <div className="App">
      <ConnectionsHeader />
      <AddPeople />
      <AddRelationships />
      <GetDegrees />
    </div>
  );
}

export default App;
