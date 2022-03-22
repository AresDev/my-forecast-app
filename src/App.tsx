import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss";
import ForecastApp from "./features/ForecastApp/ForecastApp";
import Footer from "./ui/Footer/Footer";
import Header from "./ui/Header/Header";

function App() {
  return (
    <div className="App">
      <div className="ares-container">
        <Header />

        <main className="content">
          <ForecastApp />
        </main>

        <nav className="ares-footer">
          <Footer />
        </nav>
      </div>
    </div>
  );
}

export default App;
