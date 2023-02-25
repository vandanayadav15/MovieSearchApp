import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route
            exact
            path="/moviedetails/:imdbID"
            element={<MovieDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
