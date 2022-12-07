import "./App.css";
import Router from "./Router";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <Navbar />
          </ul>
        </nav>
      </header>
      <Router />
    </div>
  );
}

export default App;
