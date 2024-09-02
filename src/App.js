import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './Views/NavBar';
import Home from "../src/Views/Home.js";
import Films from "../src/Views/Films.js";
import FilmsParGenres from "../src/Views/FilmsParGenres.js";
import PageFilm from "./Views/PageFilmView.js";
import Profile from "../src/Views/Profile.js";
import Inscription from './Views/Inscription';
import ForgottenPassword from './Views/ForgottenPassword';
import Connexion from './Views/Connexion';
import Conditions from './Views/Conditions';
import Mentions from './Views/Mentions';
import Politiques from './Views/Politiques';
import Contact from './Views/Contact';
import NotFound from './Views/NotFound';
import NewFooter from './Components/NewFooter';
import GenresMobile from './Views/GenresMobile';
import { useEffect, useState } from 'react';
import {AuthProvider} from './authContext'
import {auth} from './firebase/index'
import {onAuthStateChanged} from 'firebase/auth'
import ScrollToTop from './Components/ScrollTop';


function App() {

  const [currentUser, setCurrentUser] = useState(null)

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user)
  })
}, [currentUser])

  return (
    <div className="App">
      <AuthProvider value={{currentUser}}>
        <BrowserRouter>
        <ScrollToTop />
        
          <NavBar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Connexion />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/films" element={<Films />} />
            <Route path="/genres" element={<FilmsParGenres />} />
            <Route path="/genres-mobile" element={<GenresMobile />} />
            <Route path="/genres/:id" element={<FilmsParGenres />} />
            <Route path="/page-film/:id" element={<PageFilm />} />
            <Route path="/page-film" element={<PageFilm />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/forgotten-pass" element={<ForgottenPassword />} />
            <Route exact path="/conditions" element={<Conditions />} />
            <Route exact path="/mentions" element={<Mentions />} />
            <Route exact path="/politiques" element={<Politiques />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path='*' element={<NotFound />} />

          </Routes>

          <NewFooter />

        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;