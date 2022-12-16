import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Components/Card';
import '../App.css';

const Tendances = () => {

      const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
      const movies_url = "https://api.themoviedb.org/3/trending/movie/week?language=fr&api_key=7b6c4ae4c36a426a868e59064d239972";
      const tab_genres= {28:"Action", 12:"Aventure", 16:"Animation", 35:"Comédie", 80:"Crime", 99:"Documentaire", 18:"Drame", 10751:"Familial", 14:"Fantastique", 36:"Histoire", 27:"Horreur", 10402:"Musique", 9648:"Mystère", 10749:"Romance", 878:"Science-Fiction", 10770:"Téléfilm", 53:"Thriller", 10752: "Guerre", 37:"Western"};

      const [movies, setMovies] = useState([]);

      function getMovies() {
          axios.get(movies_url).then(({data}) => {
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
          </div>
            
              <div className="grid 2xl:grid-cols-8-mx-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xm:grid-cols-1 gap-5">
              {
                  movies?.length && movies.map(mv => <Card key={mv.id} 
                                                           img={server+mv.poster_path} 
                                                           id={mv.id} 
                                                           title={mv.title} 
                                                           alt={mv.title} 
                                                           cat={mv.genre_ids.map(name => { return tab_genres[name] + ' ' })}                                                           year={mv.release_date}
                                                           resume={mv.overview}
                                                           note={mv.vote_average.toFixed(2)+' / 10'}
                                                           style={{width: "250px", padding: "10px"}}>
                                                      </Card> )     
              }   
              </div>

          <br/><br/>
        </>
      )
}
export default Tendances;