import React, { useEffect } from 'react'
import Card from '../Components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    releaseMovies,
    getAsyncMoviesRelease,
} from '../features/movies/movieSlice';
import { serverPosters } from '../apiMovieDatabase';

const FilmsListe = () => {

      const movies = useSelector(releaseMovies);
      const dispatch = useDispatch();
      const date = (new Date()).toISOString().split('T')[0];
      const navigate = useNavigate();

      useEffect(() => {
          dispatch(getAsyncMoviesRelease(date))
      }, [])

      return(
        <>
          <div className=" mt-20 md:mt-0 relative flex py-5 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">Films du jour</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>
          <center>
            <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-2 sm:gap-10 mx-5">
              {
                  movies?.length && movies.map(mv => <Card  key={mv.id} 
                                                            click={() => navigate(`/page-film/${mv.id}`)}
                                                            img={serverPosters+mv.poster_path} 
                                                            id={mv.id}  
                                                            alt={mv.title} 
                                                            title={mv.title}
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