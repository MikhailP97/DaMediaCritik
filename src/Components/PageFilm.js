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
    <div>
      <div className=" mt-5 relative flex py-2 items-center">
        <div className="flex-grow border-t ml-20 border-amber-200"></div>
        <span className="flex-shrink my-10 mx-4 text-amber-500 text-3xl font-bold">{movieData.title}</span>
        <div className="flex-grow border-t mr-20 border-amber-200"></div>
      </div>
 
        <img className="sm:absolute w-full " src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />

        <div>

        <div className=" sm:grid sm:grid-cols-2 relative bg-black bg-opacity-90   sm:my-10 md:my-24 lg:my-48  sm:mx-8 md:mx-10 lg:mx-20 px-20 py-5 sm:py-10 md:py-20 lg:py-40 rounded-xl  text-white">
          <div className="block">

            <p className="text-4xl ">Titre : </p>
            <p className="text-4xl pt-3 pb-10  text-amber-500  ">{movieData.title}</p>

            <p className="text-3xl ">Date de sortie : </p>
            <p className="text-3xl pt-3 pb-10 text-amber-500  ">{movieData.release_date}</p>
            </div>
            <div className="col-span-2 text-3xl ">Description : 
            <p className="text-xl pr-5">
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        </p>
        </div>
        

        <img className="hidden  sm:block" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title}/>
        </div>
        </div>



    </div>
  )
}

export default PageFilm