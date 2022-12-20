import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Stars from './Stars';
import { getAsyncMovieCredits, getAsyncMovieDetails, getAsyncMovieVideos, movieCredits, moviePage, moviesVideos } from '../features/movies/movieSlice';
import YouTube from 'react-youtube';

function PageFilm({rate}) {

  //get url
  const { id } = useParams();
  console.log(id);

  const movieData = useSelector(moviePage);
  const movieCreditsData = useSelector(movieCredits);
  const movieVideosData = useSelector(moviesVideos);
  const dispatch = useDispatch();
  const bgImgMovie = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
  const casting = movieCreditsData.cast
  const crew = movieCreditsData.crew;
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target; //tableau inputs
    const comment = form[0].value;
    console.log(comment);
  }

  const navigate = useNavigate();

  return (
    <div>


      <img className="fixed h-full w-full sm:w-auto sm:h-auto md:hidden  " src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />

      <div
        className="md:py-10 bg-cover"
        style={{ backgroundImage: `url(${bgImgMovie})` }}>



        <div className=" mt-20 md:mt-0 md:flex md:flex-col relative bg-black bg-opacity-80 md:bg-opacity-90 md:mx-20 lg:mx-40 px-3  sm:px-16 lg:px-20  md:rounded-xl  text-white">
          <div className="  mb-14  border-b-2 border-amber-200 my-5 md:border-none  relative flex items-center">
            <div className="flex-grow border-t ml-20 border-amber-200"></div>
            <span className="flex-shrink my-10 mx-4 text-amber-500 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{movieData.title}</span>
            <div className="flex-grow border-t mr-20 border-amber-200"></div>
          </div>

 
            <div className="  sm:flex justify-between">
              <div className="flex flex-col justify-between sm:w-1/2 bg-black bg-opacity-70 rounded-xl p-5 md:bg-inherit  ">
              <p className="  text-center  sm:text-start md:m-0 sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl ">Date de sortie : <br/><span className=' text-amber-500'>{movieData.release_date}</span></p>
              <ul className=" text-center sm:text-start md:m-0 sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl ">Casting :<br/>{casting?.length && casting.slice(0, 5).map((cast) => <li className=' text-amber-500' key={cast.id}>{cast.name}</li> )}</ul>
              {/* <p className=" text-center sm:text-start md:m-0 sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl ">Date de sortie : <br/><span className=' text-amber-500'>{crew?.length && crew.filter((dir)=> dir.known_for_department == 'Directing')}</span></p> */}
              <p className=" text-center sm:text-start md:m-0 sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl ">Date de sortie : <br/><span className=' text-amber-500'>{movieData.release_date}</span></p>
              </div>
           
              <img className="  border-amber-100 border-2 hidden sm:flex sm:w-2/6 md:w-2/6 lg:w-2/6 xl:w-5/12" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />
             
        </div>
            
          <div className=" sm:text-xl md:text-2xl 2xl:text-3xl text-center pt-10 bg-black bg-opacity-70 rounded-xl p-5 my-10 md:bg-transparent font-bold">Description :
            <p className="text-md sm:text-lg md:text-xl 2xl:text-2xl  py-10">
              "{movieData.overview}
            </p>
          </div>

          <div className="w-full mx-0 md:grid md:grid-cols-2   gap-10 bg-black md:bg-opacity-60 bg-opacity-60 rounded-xl py-5 px-5 lg:px-10 ">
            <p className=" col-span-2 sm:text-xl md:text-2xl text-center 2xl:text-3xl my-5 font-bold">Commentaires :</p>
            <div className=""> 
              <p className="text-amber-500 font-extrabold">John Doe</p>
              <p className="text-amber-300 font-semibold py-2">Note : (récup dynamique)</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia at neque id elementum. Nullam pretium scelerisque turpis, eu congue tellus facilisis eu. Proin et ante commodo velit ultricies hendrerit nec ut nisl. Sed efficitur lacinia mauris, sit amet vulputate lorem ornare ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id mauris egestas, elementum nisl non, elementum ipsum. Aliquam consectetur rhoncus nunc, a volutpat sem ultrices ac. Quisque porta porta metus ac scelerisque. Sed nisi mi, cursus a rutrum nec, luctus sed ligula. Etiam porta imperdiet libero a dapibus. In hac habitasse platea dictumst. Nulla dapibus semper molestie. Suspendisse in tortor blandit, molestie nisl sed, convallis felis. Pellentesque a sem vehicula, congue dui a, tempor orci.
            </div>

            <div className="">
              <p className="text-amber-500 font-extrabold">John Doe</p>
              <p className="text-amber-300 font-semibold py-2">Note : (récup dynamique)</p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia at neque id elementum. Nullam pretium scelerisque turpis, eu congue tellus facilisis eu. Proin et ante commodo velit ultricies hendrerit nec ut nisl. Sed efficitur lacinia mauris, sit amet vulputate lorem ornare ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id mauris egestas, elementum nisl non, elementum ipsum. Aliquam consectetur rhoncus nunc, a volutpat sem ultrices ac. Quisque porta porta metus ac scelerisque. Sed nisi mi, cursus a rutrum nec, luctus sed ligula. Etiam porta imperdiet libero a dapibus. In hac habitasse platea dictumst. Nulla dapibus semper molestie. Suspendisse in tortor blandit, molestie nisl sed, convallis felis. Pellentesque a sem vehicula, congue dui a, tempor orci.
            </div>

            <div className=""> 
              <p className="text-amber-500 font-extrabold">John Doe</p>
              <p className="text-amber-300 font-semibold py-2">Note : (récup dynamique)</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia at neque id elementum. Nullam pretium scelerisque turpis, eu congue tellus facilisis eu. Proin et ante commodo velit ultricies hendrerit nec ut nisl. Sed efficitur lacinia mauris, sit amet vulputate lorem ornare ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id mauris egestas, elementum nisl non, elementum ipsum. Aliquam consectetur rhoncus nunc, a volutpat sem ultrices ac. Quisque porta porta metus ac scelerisque. Sed nisi mi, cursus a rutrum nec, luctus sed ligula. Etiam porta imperdiet libero a dapibus. In hac habitasse platea dictumst. Nulla dapibus semper molestie. Suspendisse in tortor blandit, molestie nisl sed, convallis felis. Pellentesque a sem vehicula, congue dui a, tempor orci.
            </div>

            <div className=""> 
              <p className="text-amber-500 font-extrabold">John Doe</p>
              <p className="text-amber-300 font-semibold py-2">Note : (récup dynamique)</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia at neque id elementum. Nullam pretium scelerisque turpis, eu congue tellus facilisis eu. Proin et ante commodo velit ultricies hendrerit nec ut nisl. Sed efficitur lacinia mauris, sit amet vulputate lorem ornare ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id mauris egestas, elementum nisl non, elementum ipsum. Aliquam consectetur rhoncus nunc, a volutpat sem ultrices ac. Quisque porta porta metus ac scelerisque. Sed nisi mi, cursus a rutrum nec, luctus sed ligula. Etiam porta imperdiet libero a dapibus. In hac habitasse platea dictumst. Nulla dapibus semper molestie. Suspendisse in tortor blandit, molestie nisl sed, convallis felis. Pellentesque a sem vehicula, congue dui a, tempor orci.
            </div>

          </div>
          
          {movieTrailers?.length ? 
            
            <YouTube 
              videoId={movieTrailers[0].key} 
              opts={opts} onReady={onPlayerReady} />
            
            :

            <></>
           }
            
          <form className="my-10 md:my-20 h-72 text-black " onSubmit={handleSubmit}>
          
              <label htmlFor="comment" className='text-3xl text-amber-500 font-extrabold'>Critik <span className='text-white'>:</span> </label>
              <textarea className="text-lg w-full h-2/3 mt-10 p-7 rounded-xl " type="text" size="5" />

             <p className="text-white text-lg"><Stars/> {rate}</p>

             <button type="submit" className="py-4 mb-5 px-12 sm:py-1 sm:px-5  shadow-md shadow-stone-300/50 bg-stone-900 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Critik !</button>
            
          </form>
<div className='bg-black bg-opacity-70 text-center md:flex md:justify-center pt-3 mt-40 md:py-10  md:pb-0'>
<p onClick={() => navigate("/inscription")} className="mb-3 md:mr-10 cursor-pointer text-amber-50 hover:underline text-sm" >Vous n'êtes pas encore inscrit ?</p>
          <p onClick={() => navigate("/login")} className=" md:ml-10 text-base sm:text-sm text-center cursor-pointer  text-amber-50 hover:underline" >Vous n'êtes pas connecté ?</p>
          </div>
        </div>
      </div>



    </div>
  )
}

export default PageFilm