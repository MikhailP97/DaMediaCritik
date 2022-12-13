import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Components/Card';
import '../App.css';

const FilmsListe = () => {

      const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
      //const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=7b6c4ae4c36a426a868e59064d239972";
      const movies_dates_url = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-10&primary_release_date.lte=2022-12-10&api_key=7b6c4ae4c36a426a868e59064d239972";
      const tab_genres= {28:"Action", 12:"Aventure", 16:"Animation", 35:"Comédie", 80:"Crime", 99:"Documentaire", 18:"Drame", 10751:"Familial", 14:"Fantastique", 36:"Histoire", 27:"Horreur", 10402:"Musique", 9648:"Mystère", 10749:"Romance", 878:"Science-Fiction", 10770:"Téléfilm", 53:"Thriller", 10752: "Guerre", 37:"Western"};

      const [moviesDates, setMoviesDates] = useState([]);
      //const [genres, setGenres] = useState([]);
      
      function getMoviesDates() {
        axios.get(movies_dates_url).then(({data}) => {
          setMoviesDates(data.results.slice(0,10)) //20 Max
        })
      } 

      // function getGenres() {
      //   axios.get(genres_url).then(({data}) => {
      //     //console.log(data.genres);
      //     setGenres(data.genres)
      //   })
      // } 

      useEffect(() => {
        getMoviesDates();
        //getGenres();
      }, []);

      return(
        <>
          <div align='left' style={{margin:+20}}><h1 className='text-4xl text-white py-0 font-bold'>Films du jour</h1></div>
          <center>
            <div className="grid 2xl:grid-cols-8 xl:lg:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-1 gap-10">
            {
                moviesDates?.length && moviesDates.map(mv => <Card key={mv.id} 
                                                                    img={server+mv.poster_path} 
                                                                    id={mv.id} 
                                                                    title={mv.title} 
                                                                    adult={mv.adult}
                                                                    alt={mv.title} 
                                                                    cat={mv.genre_ids.map(name => { return tab_genres[name] + ' ' })}
                                                                    year={mv.release_date}
                                                                    resume={mv.overview}
                                                                    style={{width: "250px", padding: "10px"}}>
                                                              </Card>
                )     
            }   
            </div>
          </center>

          <br/>
          <br/>
        </>
      )
}
export default FilmsListe;