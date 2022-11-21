import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import FirstScreen from "./screens/first/firstScreen";
import SecondScreen from "./screens/second/secondScreen";
import Victory from "./screens/third/victory";
import Defeat from "./screens/third/defeat";
import { Toaster } from "react-hot-toast";

export enum gameStates {
  Home = "Home",
  Game = "Game",
  Victory = "Victory",
  Defeat = "Defeat",
}

function App() {
  const [status, setStatus] = useState<gameStates>(gameStates.Home);

  return (
    <div className="App">
      <Toaster />
      {status === gameStates.Home && <FirstScreen setStatus={setStatus}></FirstScreen>}
      {status === gameStates.Game && <SecondScreen setStatus={setStatus}></SecondScreen>}
      {status === gameStates.Victory && <Victory setStatus={setStatus}></Victory>}
      {status === gameStates.Defeat && <Defeat setStatus={setStatus}></Defeat>}
    </div>
  );
}

export default App;
