import React from 'react'
import { useEffect } from 'react';
import Card from './Card';
import '../App.css';
import '../Navbar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncMovieCategories, moviesByCategory } from '../features/movies/movieSlice';
import { serverPosters } from '../apiMovieDatabase';
import moment from 'moment';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

function Genres() {

    const { id } = useParams();
    const tab_genres = {28:"Action", 12:"Aventure", 16:"Animation", 35:"Comédie", 80:"Crime", 99:"Documentaire", 18:"Drame", 10751:"Familial", 14:"Fantastique", 36:"Histoire", 27:"Horreur", 10402:"Musique", 9648:"Mystère", 10749:"Romance", 878:"Science-Fiction", 10770:"Téléfilm", 53:"Thriller", 10752: "Guerre", 37:"Western"};
    const dispatch = useDispatch();
    const categories = useSelector(moviesByCategory);
    const currentDate = moment(new Date()).format("YYYY-MM-DD").toString();
    const [page, setPage] = useState(1)

    useEffect(() => {
        const payload = {
            id: id,
            currentDate: currentDate,
            page: page
        }
        dispatch(getAsyncMovieCategories(payload))
    }, [id, page]);

    const navigate = useNavigate();

    return (
        <>
            <div className=" relative flex py-5 items-center invisible md:visible">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                    <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold text-center">{tab_genres[id]}</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>
            <center>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-10">
                {               
                    categories?.length && categories.map(mv => {    
                        return(
                            <Card   key={mv.id} 
                                    img={serverPosters+mv.poster_path} 
                                    id={mv.id}                        
                                    title={mv.title} 
                                    alt={mv.title}
                                    click={() => navigate(`/page-film/${mv.id}`)}
                                    style={{width: "250px", padding: "10px"}} >                            
                            </Card>  
                        )
                    })                 
                }   
                </div>
                <div className='flex flex-grow justify-center mt-10'>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`${page === 1 ? "opacity-25" : null}`}><ArrowLeft color="#fef3c7" size={35}/></button>
                    <input value={page} onChange={(e) => setPage(e.target.value)} className='mx-5 w-12 text-center rounded bg-amber-100'/>
                    <button onClick={() => setPage(page + 1)} disabled={page === 500} className={`${page === 500 ? "opacity-25" : null}`}><ArrowRight color="#fef3c7" size={35}/></button>
                </div>
            </center>
            <br/><br/>
        </>                
    )
}
export default Genres