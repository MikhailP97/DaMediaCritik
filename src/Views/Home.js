import React, { useContext, useState, useEffect } from 'react'
import Tendances from '../Components/Tendances.js'
import SliderComponent from '../Components/SliderComponent.js'
import Stars from '../Components/Stars.js'
import { UserContext } from '../UserContext.js'
import { useSelector, useDispatch } from 'react-redux'
import { getAsyncTrendingsMovies, getAsyncUpcomingMovies, trendingMovies, upcomingMovies } from '../features/movies/movieSlice.js'

function Home() {
  
  const dispatch = useDispatch();
  const trendingMovie = useSelector(trendingMovies)
  const upcomingMovie = useSelector(upcomingMovies)
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    dispatch(getAsyncTrendingsMovies())
    dispatch(getAsyncUpcomingMovies())
  
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])
  

  return (
    <div>
      <div id ="band" className="mt-20 md:mt-0 px-3 md:px-0 text-center text-4xl md:text-5xl text-white py-20 font-bold bg-gradient-to-r from-stone-700 to-stone-900 min-h-min">
        <span className="opacity-90 text-amber-50">Bienvenue sur <span className="text-amber-600"> DaMovieCritik</span> !</span>
        <div className=" text-center text-2xl md:text-3xl text-white pt-5">
          <span className="opacity-90 text-amber-50">Découvrez, trouvez ou<span className="text-amber-600"> Critik</span>ez un film !</span>
        </div>
      </div>
      
      {
        windowSize.innerWidth > 640 ? 
                          <>
                            <Tendances titleOfSection={'Tendances'} movies={trendingMovie?.length && trendingMovie}/>
                            <Tendances titleOfSection={'Bientôt en Salles'} movies={upcomingMovie?.length && upcomingMovie}/>
                          </>
                        : 
                          <>
                            <SliderComponent movies={trendingMovie?.length && trendingMovie} titleOfSection={'Tendances'} mb={'mb-0'}/>
                            <SliderComponent movies={upcomingMovie?.length && upcomingMovie} titleOfSection={'Bientôt en Salles'} mb={'mb-24'}/>
                          </>
      }
    </div>
  )
}

export default Home

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
