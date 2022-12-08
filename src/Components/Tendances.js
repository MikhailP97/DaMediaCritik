import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Card from '../Components/Card';
import '../App.css';

const Tendances = () => {

      function sayHello() {
          alert('Helloo!');
      }

      const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
      const movies_url = "https://api.themoviedb.org/3/trending/movie/week?api_key=7b6c4ae4c36a426a868e59064d239972";

      const [movies, setMovies] = useState([]);

      function getMovies() {
        axios.get(movies_url).then(({data}) => {
          console.log(data.results);
          setMovies(data.results.slice(0,6))
        })
      } 

      useEffect(() => {
        getMovies();
      }, []);

      return(
        <>
          <div align='left' style={{margin:+20}}><h1>Tendances</h1></div>
          <div className="card">
          {
              movies?.length && movies.map(mv => <img key={mv.id} src={server+mv.poster_path} id={mv.id} title={'Id : '+mv.id+'\n '+mv.title} alt={mv.title} style={{width: "250px", padding: "10px"}} onClick={sayHello} /> )     
          }   
          </div>

          <br/>
          <br/>
        </>
      )
}
export default Tendances;