import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAsyncMovieCredits, getAsyncMovieDetails, movieCredits, moviePage } from '../features/movies/movieSlice';

function PageFilm() {

    //get url
    const { id } = useParams();
    console.log(id);

    const movieData = useSelector(moviePage);
    const movieCreditsData = useSelector(movieCredits);
    const dispatch = useDispatch();

    console.log(movieData)
    console.log(movieCreditsData)

    useEffect(() => {
        dispatch(getAsyncMovieDetails(id))
        dispatch(getAsyncMovieCredits(id))
    }, [id])

  return (
    <div style={{color: 'red', fontSize: 50}}>{movieData.title}
    
    <img src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title}/>

    </div>
  )
}

export default PageFilm