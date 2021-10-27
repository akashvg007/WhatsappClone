import './App.scss';
import LeftHandMenu from "./components/LeftContainer/LeftContainer";
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  return (
    <div className="App">
      <div className="back-header"></div>
      <div className="back-body"></div>
      <div className="main-body">
        <div className="container">
          <div className="lefthandmenu">
            <LeftHandMenu />
          </div>
          <div className="main-area">
            <MainContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
