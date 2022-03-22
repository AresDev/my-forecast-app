
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import ForecastApp from './features/ForecastApp';

function App() {
  return (
    <div className="App">
      <div className="ares-container">
        <nav className="ares-header">
          {/* <div className="ares-logo">
            <FontAwesomeIcon icon={["fal", "coffee"]} />
          </div> */}
            <h1>My ForecastApp</h1>
        </nav>

        <main className="content">
          <ForecastApp />
        </main>

        <nav className="ares-footer">
          <span>
            Made with <span className="heart">❤</span> in 🇨🇴 Colombia
          </span>
        </nav>
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
