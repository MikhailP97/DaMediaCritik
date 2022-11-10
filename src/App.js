import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import NavBar from './Views/NavBar';
import Home from "../src/Views/Home.js";
import Films from "../src/Views/Films.js";
import FilmsParCategorie from "../src/Views/FilmsParCategorie.js";
import PageFilm from "../src/Views/PageFilm.js";
import Profile from "../src/Views/Profile.js";

import Footer from './Components/Footer.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>

                <NavBar />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/films" element={<Films />} />
                    <Route path="/categories" element={<FilmsParCategorie />} />
                    <Route path="/page-film" element={<PageFilm />} />
                </Routes>

      </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
