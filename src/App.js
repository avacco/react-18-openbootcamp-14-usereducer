import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import LoginUseState from './components/LoginUseState';
import LoginUseReducer from './components/LoginUseReducer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      {/*<Counter/>*/}
      {/*<LoginUseState/>*/}
      <LoginUseReducer/>

      </header>
    </div>
  );
}

export default App;
