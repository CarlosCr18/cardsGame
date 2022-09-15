import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import FirstScreen from './screens/first/firstScreen';
import SecondScreen from './screens/second/secondScreen';
import Victory from './screens/third/victory';
import Defeat from './screens/third/defeat';

function App() {
  const [status,setStatus] = useState('Home');
  
  return (
    <div className="App">
    {status == 'Home' && 
    <FirstScreen setStatus={setStatus}></FirstScreen>}
    {status == 'Game' && 
    <SecondScreen setStatus={setStatus}></SecondScreen>}
    {status == 'Victory' && 
    <Victory setStatus={setStatus}></Victory>}
    {status == 'Defeat' && 
    <Defeat setStatus={setStatus}></Defeat>}
    
    </div>
  );
}

export default App;
