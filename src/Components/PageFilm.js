/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Stars from './Stars';
import { getAsyncMovieCredits, getAsyncMovieDetails, getAsyncMovieVideos, movieCredits, moviePage, moviesVideos } from '../features/movies/movieSlice';
import YouTube from 'react-youtube';
import axios from 'axios';
import dateFormat from "dateformat"


function PageFilm({rate}) {

  //get url
  const { id } = useParams();
  //console.log(id);

  const movieData = useSelector(moviePage);
  const movieCreditsData = useSelector(movieCredits);
  const movieVideosData = useSelector(moviesVideos);
  const dispatch = useDispatch();
  const bgImgMovie = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
  const casting = movieCreditsData.cast
  const crew = movieCreditsData.crew;
  const genres = movieData.genres
  
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

  const [critiks, setCritiks] = useState([]);

  useEffect(() => {
    dispatch(getAsyncMovieDetails(id))
    dispatch(getAsyncMovieCredits(id))
    dispatch(getAsyncMovieVideos(id))
    getCritiks();
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target; //tableau inputs
    const filmId = form[0].value;
    const comment = form[1].value;
    const note = form[2].value;
    const critik = {filmId, comment, note, userId:1, pseudo:"todo"};

    //Requete HTTP en POST
    createCritik(critik); 
    toggleModalConfirmationCritik(); //Affiche le formulaire d'ajout de Critik
  }

  //Modale de confirmation d'ajout de critik
  let [modalConfirmationCritik, setModalConfirmationCritik] = useState(false);
  const toggleModalConfirmationCritik = () => { 
      setModalConfirmationCritik(!modalConfirmationCritik);
  }

  //Afficher/Masquer mes critiks
  let [listCritiks, setListCritiks] = useState(false);
  const toggleListCritiks = () => { 
      setListCritiks(!listCritiks);
  }

  const api_url = "http://localhost:3001/comments";
    const createCritik = async (critik) => {
        //await axios.post(api_url+'?filmId='+critik.filmId+'&commentaire='+critik.comment+'&note='+critik.note, critik)
        await axios.post(api_url, critik)
         .then(console.log('Nouvelle critique de l utilisateur n°... crée'))
         .catch(err=>{
            console.error(err);
        });
    }

  const navigate = useNavigate();

  //Récup des commentaires de tous les users pour un film
  const getCritiks = async (critik) => {
    //let filmId = 76600; //Todo: Récupéré le filId
    const api_url = `http://localhost:3001/comments?filmId=${id}`;
    await axios.get(api_url)
    .then(({data}) => {
        //console.log(data);
        setCritiks(data)})
    .catch(err=>{
        console.error(err);
    });
  }

  const toggleListeCritik = (e) => {
    listCritiks = !listCritiks;
}

  return (
    <div>


      <img className="fixed h-full w-full sm:w-auto sm:h-auto md:hidden  " src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />

      <div
        className="md:py-10 bg-cover"
        style={{ backgroundImage: `url(${bgImgMovie})` }}>



        <div className=" mt-20 md:mt-0 md:flex md:flex-col relative bg-black bg-opacity-80 md:bg-opacity-90 md:mx-10 lg:mx-10 xl:mx-36 2xl:mx-60 px-0  sm:px-5 md:px-10 lg:px-20  md:rounded-xl  text-white">
          <div className="  mb-14  border-b-2 border-amber-200 my-5 md:border-none  relative flex items-center">
            <div className="flex-grow border-t ml-20 border-amber-200"></div>
            <span className="flex-shrink my-10 mx-4 text-amber-500 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{movieData.title}</span>
            <div className="flex-grow border-t mr-20 border-amber-200"></div>
          </div>

 
            <div className="  sm:flex justify-between">
              <div className="flex flex-col justify-between sm:w-1/2 bg-black bg-opacity-70 sm:rounded-xl p-5 md:bg-inherit  ">
              <p className="  text-center  sm:text-start md:m-0 sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ">Date de sortie : <br/><span className=' text-amber-500'>{dateFormat(movieData.release_date, 'dd/mm/yyyy')}</span></p>
              <ul className=" text-center mt-5 xl:mt-0 sm:text-start sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ">Genres : <br/>{genres?.length && genres.map((g) => <li className=' text-amber-500' key={g.id}>{g.name}</li> )}</ul>
              <ul className=" text-center sm:text-start xl:mt-0 mt-5  sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ">Casting :<br/>{casting?.length && casting.slice(0, 5).map((cast) => <li className=' text-amber-500' key={cast.id}>{cast.name}</li> )}</ul>
              
              </div>
           
              <img className="  border-amber-100 border-2 hidden sm:flex sm:w-1/2 md:w-1/2 lg:w-2/6 xl:w-5/12 2xl:w-4/12" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />
             
        </div>
            
          <div className=" sm:text-xl md:text-2xl 2xl:text-3xl text-center pt-10 bg-black bg-opacity-70 sm:rounded-xl p-5 my-10 md:bg-transparent font-bold">Description :
            <p className="text-md sm:text-lg md:text-xl 2xl:text-2xl font-normal  py-10">
              "{movieData.overview}
            </p>
          </div>

          {movieTrailers?.length ? 
            
            <YouTube 
              videoId={movieTrailers[0].key} 
              opts={opts} onReady={onPlayerReady} />
            
            :

            <></>
           }

          <div className="w-full mx-0 md:grid md:grid-cols-2   gap-10 bg-black md:bg-opacity-60 bg-opacity-60 sm:rounded-xl py-5 px-5 lg:px-10 ">
            <p className=" col-span-2 sm:text-xl md:text-2xl text-center 2xl:text-3xl my-5 font-bold">Commentaires :</p>
{/* 
            <div className=""> 
              <p className="text-amber-500 font-extrabold">John Doe</p>
              <p className="text-amber-300 font-semibold py-2">Note : (récup dynamique)</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia at neque id elementum. Nullam pretium scelerisque turpis, eu congue tellus facilisis eu. Proin et ante commodo velit ultricies hendrerit nec ut nisl. Sed efficitur lacinia mauris, sit amet vulputate lorem ornare ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id mauris egestas, elementum nisl non, elementum ipsum. Aliquam consectetur rhoncus nunc, a volutpat sem ultrices ac. Quisque porta porta metus ac scelerisque. Sed nisi mi, cursus a rutrum nec, luctus sed ligula. Etiam porta imperdiet libero a dapibus. In hac habitasse platea dictumst. Nulla dapibus semper molestie. Suspendisse in tortor blandit, molestie nisl sed, convallis felis. Pellentesque a sem vehicula, congue dui a, tempor orci.
            </div> */}

            {/* Début de traitement liste de commentaires d'1 user */}
            {   
                    critiks?.length && critiks.map(crt => {   
                            return(                                                            
                                  <>        
                                    <div className="">   
                                    <p className="text-amber-500 font-extrabold">Pseudo : {crt.pseudo}</p>

                                    <p className="text-amber-300 font-semibold py-2">Note : {crt.note} / 5</p>
                                      <p className="text-lg text-white">{crt.comment}</p>
                                    </div>
                                  </>
                            )
                    })                 
            }   
            {/* Fin de traitement liste de commentaires d'1 user */}   

            {modalConfirmationCritik&& (
                        <div className="modal">
                            <div className="overlay"></div>
                                <div className="modal-content text-black">                        
                                <button 
                                    onClick={toggleModalConfirmationCritik}
                                    className="btn-modal text-black float-right">
                                    [X]
                                </button>
                                    <br/><br/>                              
                                    Vous&nbsp;avez&nbsp;bien&nbsp;ajouté&nbsp;une&nbsp;Critik&nbsp;et/ou&nbsp;note&nbsp;pour&nbsp;le&nbsp;film
                                    <br/><br/>
                                    <center><b>"{movieData.title}"</b></center> 
                                    <br/><br/>                                    
                                    {/* <a href="#" onClick={toggleListCritiks}>Afficher/masquer vos critiks</a>
                                    <br/><br/>
                                    {listCritiks ?                                        
                                            <div>
                                            Mes critiks :<br/>
                                            {/* Début de traitement liste de critiks d'1 user */}
                                            {/*                                             */}
                                            {/* Fin de traitement liste de critiks d'1 user */}
                                    {/*        
                                            </div>                                                   
                                        : {critiks?.length && critiks.map(crt => {   
                                                    return(                                                            
                                                        <>                                                                
                                                            - id: {crt.id} {crt.comment} 
                                                        <br/>
                                                        </>
                                                    )
                                                })                 
                                            }    
                                        <br/>
                                    } */}
                            </div>
                        </div>
                    )}    
          </div>
          
          
            
          <form className="my-10 md:my-20 h-72 text-black " onSubmit={handleSubmit}>
          {/* <br/> FilmId : {id} */}
          <input type='hidden' size='6' defaultValue={id} />
              <label htmlFor="comment" className='text-3xl text-amber-500 font-extrabold'>Critik <span className='text-white'>:</span> </label>
              <textarea className="text-lg w-full h-2/3 mt-10 p-7 rounded-xl " type="text" size="5" />

             <p className="text-white text-lg text-center sm:text-left my-4"><Stars/> {rate}</p>
<div>
             <button type="submit" className="flex sm:block m-auto sm:m-0 py-4 mb-5 px-12 sm:py-3 sm:px-10 md:py-4 md:px-12  shadow-md shadow-stone-300/50 bg-stone-900 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Critiker !</button>
             </div>       
          </form>
<div className='bg-black bg-opacity-60 text-center md:flex md:justify-center pt-3 mt-48 md:mt-32 md:py-10 md:pb-0 sm:rounded-t-lg'>
<p onClick={() => navigate("/inscription")} className="mb-3 md:mr-10 cursor-pointer text-amber-50 hover:underline text-sm" >Vous n'êtes pas encore inscrit ?</p>
          <p onClick={() => navigate("/login")} className="pb-3 md:ml-10 text-center cursor-pointer text-sm  text-amber-50 hover:underline" >Vous n'êtes pas connecté ?</p>
          </div>
        </div>
      </div>



    </div>
  )
}

export default PageFilm