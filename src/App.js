import React, { useState } from 'react';
import './App.scss';
import LeftHandMenu from "./components/LeftContainer/LeftContainer";
import MainContainer from './components/MainContainer/MainContainer';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [selected, setSelected] = useState(false);
  const [userData, setUserData] = useState({})
  const handleClick = (data) => {
    console.log("handleClick::clicked", data);
    setSelected(true);
    setUserData(data);
  }
  return (
    <div className="App">
      <div className="back-header"></div>
      <div className="back-body"></div>
      <div className="main-body">
        <div className="container">
          <div className="lefthandmenu">
            <LeftHandMenu click={handleClick} />
          </div>
          <div className="main-area">
            <div className="bglayer">
              {selected ? <MainContainer data={userData} />
                : <LandingPage />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
