import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card';
import '../App.css';
import '../Navbar.css';

function Genres() {
    let id = (new URL(window.location.href)).searchParams.get('id');
    // let id = this.props.genreId;
    console.log(id);
    // console.log(id);

    const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
    const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=7b6c4ae4c36a426a868e59064d239972";
    //const movies_categories = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-10&primary_release_date.lte=2022-12-10&api_key=7b6c4ae4c36a426a868e59064d239972";
    const movies_genre = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-10&primary_release_date.lte=2022-12-31&with_genres="+ id +"&api_key=7b6c4ae4c36a426a868e59064d239972";
    const tab_genres= {28:"Action", 12:"Aventure", 16:"Animation", 35:"Comédie", 80:"Crime", 99:"Documentaire", 18:"Drame", 10751:"Familial", 14:"Fantastique", 36:"Histoire", 27:"Horreur", 10402:"Musique", 9648:"Mystère", 10749:"Romance", 878:"Science-Fiction", 10770:"Téléfilm", 53:"Thriller", 10752: "Guerre", 37:"Western"};

    const [moviesCategories, setmoviesCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    function getmoviesCategories() {
        // axios.get(movies_categories).then(({data}) => {
        axios.get(movies_genre).then(({data}) => {
          //console.log(data.results);
          setmoviesCategories(data.results.slice(0,10)) 
        })
    } 

      function getGenres() {
        axios.get(genres_url).then(({data}) => {
          //console.log(data.genres);
          setGenres(data.genres)
        })
    }

    useEffect(() => {
        getmoviesCategories();
        getGenres();
    }, []);

  return (
    <>
        <div className="text-white">
            <select id="genres" className='text-white bg-black' title="Choisir un genre...">
                <option key={99}>Choississez un genre</option>
                {/* <option key={0} disabled>---------------------------</option>  */}
                {
                    genres?.length && genres.map(g => (
                    <>                
                        <option key={g.id} value={g.id} >{g.name} </option>                
                    </>
                    )
                    )
                }
            </select>                   
        </div> 

        <div align='left' style={{margin:+20}}>
            <h1 className='text-4xl text-white py-0 font-bold'>Films par genres</h1>
        </div>

        <center>
            <div className="grid 2xl:grid-cols-6 xl:lg:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-2 gap-10">
            {               
               moviesCategories?.length && moviesCategories.map(mv => {    
                    return(
                        <Card key={mv.id} 
                              img={server+mv.poster_path} 
                              id={mv.id} 
                              // className="block h-full mx-auto object-cover object-center cursor-pointer"                        
                              title={mv.title} 
                              alt={mv.title}
                              cat={mv.genre_ids.map(name => { return tab_genres[name] + ' ' })}
                              year={mv.release_date}
                              resume={mv.overview}
                              style={{width: "250px", padding: "10px"}} >                            
                        </Card>  
                    )
                })                 
            }   
            </div>
        </center>
        <br/><br/>
    </>                
  )
}
export default Genres