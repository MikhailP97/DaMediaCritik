import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import NavBar from './Views/NavBar';
import Home from "../src/Views/Home.js";
import Connexion from "../src/Views/Connexion.js";
import Inscription from "../src/Views/Inscription.js";
import Films from "../src/Views/Films.js";
import FilmsParCategorie from "../src/Views/FilmsParCategorie.js";
import PageFilm from "../src/Views/PageFilm.js";
import Profile from "../src/Views/Profile.js";



import Footer from './Components/Footer.js'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p className='text-xl text-red-500'>yguy</p>
      </header> */}
      <BrowserRouter>
          
                {/* <div>AppBar</div> */}
                <NavBar />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/films" element={<Films />} />
                    <Route path="/films-par-categorie" element={<FilmsParCategorie />} />
                    <Route path="/page-film" element={<PageFilm />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/inscription" element={<Inscription />} />
                </Routes>

      </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
