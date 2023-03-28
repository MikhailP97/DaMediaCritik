import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { genres_url } from '../apiMovieDatabase';
import { getAsyncMovieCategories, moviesByCategory } from '../features/movies/movieSlice';
import Card from './Card';

function GenresMobile() {

    const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
    const tab_genres = {28:"Action", 12:"Aventure", 16:"Animation", 35:"Comédie", 80:"Crime", 99:"Documentaire", 18:"Drame", 10751:"Familial", 14:"Fantastique", 36:"Histoire", 27:"Horreur", 10402:"Musique", 9648:"Mystère", 10749:"Romance", 878:"Science-Fiction", 10770:"Téléfilm", 53:"Thriller", 10752: "Guerre", 37:"Western"};

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const moviesByGenres = useSelector(moviesByCategory)

    const currentDate = moment(new Date()).format("YYYY-MM-DD").toString();

    const [id, setId] = useState(28); 

    const [genres, setGenres] = useState([]);

    function getGenres() {
        axios.get(genres_url).then(({data}) => {
            console.log(data.genres);
            setGenres(data.genres)
        })
    }

    const onChange =(e) => {
        setId(e.target.value)
        
    }
    useEffect(() => {
        const payload = {
            id: id,
            currentDate: currentDate
        }
        dispatch(getAsyncMovieCategories(payload))
        getGenres();
    }, [id]);

    return (
        <>

            <div className="flex flex-col items-center text-white w-1/3 pt-10 m-auto text-center">
                <select id="genres" className='text-white bg-zinc-900/50 mt-20 rounded py-2 px-2 border-amber-50' title="Choisir un genre..." onChange={onChange}>
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
                    <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold text-center">{tab_genres[id]}</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>

            <center>
                <div className="grid 2xl:grid-cols-6 xl:lg:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-2 gap-10">
                {               
                    moviesByGenres?.length && moviesByGenres.map(mv => {    
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

export default GenresMobile