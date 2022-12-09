import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAsyncMoviePage, moviePage } from '../features/movies/movieSlice';

function PageFilm() {

    //get url
    const { id } = useParams();
    console.log(id);

    const movieData = useSelector(moviePage);
    const dispatch = useDispatch();

    console.log(movieData)

    useEffect(() => {
        dispatch(getAsyncMoviePage(id))
    }, [])

  return (
    <div style={{color: 'red', fontSize: 50}}>{movieData.title}
    
    <img src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title}/>

    </div>
  )
}

export default PageFilm