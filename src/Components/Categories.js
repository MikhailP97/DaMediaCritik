
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../Components/Card';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    trendings,
    getAsyncMovies,
    releaseMovies,
    getAsyncMoviesRelease
} from '../features/movies/movieSlice';
import { serverPosters } from '../apiMovieDatabase';

function Categories() {

    const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
    const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=7b6c4ae4c36a426a868e59064d239972";
    // const movies_categories = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-09&primary_release_date.lte=2022-12-31&api_key=7b6c4ae4c36a426a868e59064d239972";

    // const [moviesCategories, setmoviesCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    function getmoviesCategories() {
        axios.get(
            'https://api.themoviedb.org/3/search/movie?api_key=7b6c4ae4c36a426a868e59064d239972&language=en-US&query=av').then(({data}) => {
          console.log(data.results);
            // setmoviesCategories(data.results) 
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


    const movies = useSelector(releaseMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getAsyncMoviesRelease())

    }, [])

    console.log(movies)

    const navigate = useNavigate();

return (
    <>
        <div className="text-white">
            <select id="genres" className='text-white bg-black mt-20 md:mt-0' title="Choisir un genre...">
                <option key={-1}>Choississez un genre</option>
                <option key={0} disabled>---------------------------</option> 
                {
                    genres?.length && genres.map(g => (
                    <>                
                        <option key={g.id} value={g.id}>{g.name} </option>                
                    </>))
                }
            </select>                   
        </div> 

        <div className=" relative flex py-5 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold text-center">Films par catégorie</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>
    {/* <div className="bg-indigo-50">
        <section className="min-h-screen body-font text-gray-600 ">
            <div className="container mx-auto px-5 py-10">
                <div className="-m-4 flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                    <a href="#" className="relative block h-48 overflow-hidden rounded"/>
    */}
        <center>
        { movies.length ?
            <div className="grid 2xl:grid-cols-8 xl:lg:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-1 gap-10">
                        {
                            movies?.length && movies.map(mv => { return(
                            <>
                                <Card key={mv.id} 
                                        img={serverPosters+mv.poster_path} 
                                        id={mv.id} 
                                        // className="block h-full mx-auto object-cover object-center cursor-pointer"
                                        
                                        title={mv.title} 
                                        alt={mv.title}
                                        cat={mv.genre_ids}
                                        year={mv.release_date}
                                        style={{width: "250px", padding: "10px"}}
                                        click={() => navigate(`/page-film/${mv.id}`)} 
                                />                            
                            </>
                            )
                            }) 
                        }   
            </div>
        :   
            <div class="flex justify-center items-center">
                <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        }
        </center>
    </>
    )
}
export default Categories;
