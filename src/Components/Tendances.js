import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Components/Card';
import '../App.css';

const Tendances = () => {

      const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
      const movies_url = "https://api.themoviedb.org/3/trending/movie/week?api_key=7b6c4ae4c36a426a868e59064d239972";

      const [movies, setMovies] = useState([]);

      function getMovies() {
        axios.get(movies_url).then(({data}) => {
          //console.log(data.results);
          setMovies(data.results.slice(0,6))
        })
      } 

      useEffect(() => {
        getMovies();
      }, []);

      return(
        <>
         <div className=" mt-5 relative flex py-5 items-center">
          <div className="flex-grow border-t ml-20 border-amber-50"></div>
          <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">Tendances</span>
          <div className="flex-grow border-t mr-20 border-amber-50"></div>
            <center>
          <div className="grid 2xl:grid-cols-8 xl:lg:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-1 gap-10">
       
        </div>
        <p>Code ici....</p>
          <div align='left' style={{margin:+20}}><h1>Tendances</h1></div>
          <div className="card">
          {
              movies?.length && movies.map(mv => <Card key={mv.id} 
                                                       img={server+mv.poster_path} 
                                                       id={mv.id} 
                                                       title={mv.title} 
                                                       alt={mv.title} 
                                                       cat={mv.genre_ids}
                                                       year={mv.release_date}
                                                       style={{width: "250px", padding: "10px"}}>
                                                  </Card> )     
          }   
          </div>
          </center>
          <br/>
          <br/>
        </>
      )
}
export default Tendances;