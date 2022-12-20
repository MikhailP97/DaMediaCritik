import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card';
import '../App.css';
import '../Navbar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncMovieCategories, moviesByCategory } from '../features/movies/movieSlice';
import moment from 'moment';
import { genres_url } from '../apiMovieDatabase';

function Genres() {

    const { id } = useParams();

    const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
    // const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=7b6c4ae4c36a426a868e59064d239972";
    //const movies_categories = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-10&primary_release_date.lte=2022-12-10&api_key=7b6c4ae4c36a426a868e59064d239972";
    const movies_genre = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-10&primary_release_date.lte=2022-12-31&with_genres="+ id +"&api_key=7b6c4ae4c36a426a868e59064d239972";
    const tab_genres = {28:"Action", 12:"Aventure", 16:"Animation", 35:"Comédie", 80:"Crime", 99:"Documentaire", 18:"Drame", 10751:"Familial", 14:"Fantastique", 36:"Histoire", 27:"Horreur", 10402:"Musique", 9648:"Mystère", 10749:"Romance", 878:"Science-Fiction", 10770:"Téléfilm", 53:"Thriller", 10752: "Guerre", 37:"Western"};

    const dispatch = useDispatch();
    const categories = useSelector(moviesByCategory);
    const currentDate = moment(new Date()).format("YYYY-MM-DD").toString();

    const [genres, setGenres] = useState([]);

    function getGenres() {
        axios.get(genres_url).then(({data}) => {
          console.log(data.genres);
            setGenres(data.genres)
        })
    }

    useEffect(() => {
        const payload = {
            id: id,
            currentDate: currentDate
        }
        dispatch(getAsyncMovieCategories(payload))
        getGenres();
    }, [id]);

    const navigate = useNavigate();

return (
    <>

        <div className="text-white md:invisible">
            <select id="genres" className='text-white bg-black mt-20 md:mt-0' title="Choisir un genre...">
                <option key={-1}>Choississez un genre</option>
                <option key={0} disabled>---------------------------</option> 
                {
                    genres?.length && genres.map(g => (
                    <>                
                        <option key={g.id} value={g.id} >{g.name} </option>                
                    </>))
                }
            </select>                   
        </div> 


        <div className=" relative flex py-5 items-center invisible md:visible">
            <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold text-center">{tab_genres[id]}</span>
            <div className="flex-grow border-t mr-20 border-amber-50"></div>
        </div>

        <center>
            <div className="grid 2xl:grid-cols-6 xl:lg:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-2 gap-10">
            {               
                categories?.length && categories.map(mv => {    
                    return(
                        <Card   key={mv.id} 
                                img={server+mv.poster_path} 
                                id={mv.id} 
                                // className="block h-full mx-auto object-cover object-center cursor-pointer"                        
                                title={mv.title} 
                                alt={mv.title}
                                cat={mv.genre_ids.map(name => { return tab_genres[name] + ' ' })}
                                year={mv.release_date}
                                resume={mv.overview}
                                click={() => navigate(`/page-film/${mv.id}`)}
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