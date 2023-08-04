import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Paper from './components/Paper.jsx'
import Splash from './components/Splash.jsx'

function App() {
  const [pairList, setPairList] = useState([])

  return (
    <div className="App">
      <Paper pairList = {pairList} setPairList = {setPairList}></Paper>
    </div>
  );
}

export default App;
