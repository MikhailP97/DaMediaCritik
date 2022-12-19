import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAsyncMovieCredits, getAsyncMovieDetails, getAsyncMovieVideos, movieCredits, moviePage, moviesVideos } from '../features/movies/movieSlice';
import YouTube from 'react-youtube';

function PageFilm() {

  //get url
  const { id } = useParams();
  console.log(id);

    const movieData = useSelector(moviePage);
    const movieCreditsData = useSelector(movieCredits);
    const movieVideosData = useSelector(moviesVideos);
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    const onPlayerReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }
    const dispatch = useDispatch();
    const bgImgMovie = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`

    console.log(movieData)
    console.log(movieCreditsData)
    console.log(movieVideosData)
    console.log(movieVideosData?.length && movieVideosData.filter((v) => {return v.name.includes('Bande-annonce') 
                                                                              || v.name.includes('Bande annonce') 
                                                                              || v.name.includes('Bande Annonce') 
                                                                              || v.name.includes('bande-annonce') 
                                                                              || v.name.includes('bande-annonce') 
                                                                              || v.name.includes('Official Trailer')
                                                                              || v.name.includes('Official-Trailer')
                                                                              || v.name.includes('official-trailer')
                                                                              || v.name.includes('official trailer')
                                                                              || v.name.includes('Official-trailer')
                                                                              || v.name.includes('Official trailer')
                                                                          }))
    const movieTrailers = movieVideosData?.length && movieVideosData.filter((v) => {return v.name.includes('Bande-annonce') 
                                                                                        || v.name.includes('Bande annonce')
                                                                                        || v.name.includes('Bande Annonce') 
                                                                                        || v.name.includes('bande-annonce') 
                                                                                        || v.name.includes('bande-annonce') 
                                                                                        || v.name.includes('Official Trailer')
                                                                                        || v.name.includes('Official-Trailer')
                                                                                        || v.name.includes('official-trailer')
                                                                                        || v.name.includes('official trailer')
                                                                                        || v.name.includes('Official-trailer')
                                                                                        || v.name.includes('Official trailer')
                                                                                    })

    useEffect(() => {
        dispatch(getAsyncMovieDetails(id))
        dispatch(getAsyncMovieCredits(id))
        dispatch(getAsyncMovieVideos(id))
    }, [id])

  return (
    <div>


      <img className="fixed h-full w-full sm:w-auto sm:h-auto md:hidden  " src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />

      <div 
    className = "md:py-10 bg-cover"
    style={{backgroundImage: `url(${bgImgMovie})`}}>



        <div className=" mt-20 md:mt-0 md:grid md:grid-rows-2 relative bg-black bg-opacity-80 md:bg-opacity-90 md:mx-20 lg:mx-40 px-3 sm:px-10 md:px-16 lg:px-20  md:rounded-xl  text-white">
          <div className="  col-span-2 border-b-2 border-amber-200 my-5 md:border-none  relative flex items-center">
            <div className="flex-grow border-t ml-20 border-amber-200"></div>
            <span className="flex-shrink my-10 mx-4 text-amber-500 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{movieData.title}</span>
            <div className="flex-grow border-t mr-20 border-amber-200"></div>
          </div>
          <div className="block">



            <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ">Date de sortie : </p>
            <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-3 pb-10 text-amber-500  ">{movieData.release_date}</p>
          </div>


          <div className="row-span-2 hidden md:block  md:justify-self-end  xl:mr-20">
            <img className="border-amber-100 border-2" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />
          </div>
          <div className=" sm:text-xl md:text-2xl lg:text-3xl text-center pt-20 ">Description :
            <p className="text-xl pr-5 py-10">
              "{movieData.overview}
            </p>
          </div>
          <form className="py-10">
            <div>
              <label htmlFor="comment" className="mb-3 text-white text-lg opacity-98 ">dsqdsq</label>
              <input type="text"/>
            </div>
            
            {movieTrailers?.length ? 
            
            <YouTube 
              videoId={movieTrailers[0].key} 
              opts={opts} onReady={onPlayerReady} />
            
            :

            <></>
            }
          </form>
        </div>
      </div>



    </div>
  )
}

export default PageFilm