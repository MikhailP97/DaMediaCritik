/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { 
  getAsyncMovieCredits, 
  getAsyncMovieDetails, 
  getAsyncMovieVideos,  
  getAsyncAllMovieVideos, 
  getAsyncAllMovieProviders,
  movieCredits, 
  moviePage, 
  moviesVideos, 
  movieAllProviders, 
  allMoviesVideos } from '../features/movies/movieSlice';
import YouTube from 'react-youtube';
import dateFormat from "dateformat"
import { useAuthValue } from "../authContext"
import { db } from '../firebase/index'
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"; 
import { X, Trash2, Edit } from 'react-feather';
import { MagnifyingGlass } from 'react-loader-spinner'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

function PageFilm() {

  //get url
  const { id } = useParams();

  const {currentUser} = useAuthValue();

  const date = new Date();

  const movieData = useSelector(moviePage);
  const movieCreditsData = useSelector(movieCredits);
  const movieVideosData = useSelector(moviesVideos);
  const allMovieVideosData = useSelector(allMoviesVideos);
  const movieProviders = useSelector(movieAllProviders);
  const dispatch = useDispatch();
  const bgImgMovie = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
  const casting = movieCreditsData.cast
  const crew = movieCreditsData.crew;
  const genres = movieData.genres
  
  const [critiks, setCritiks] = useState([]);
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0); 
  const [ratingError, setRatingError] = useState('');
  const [favorites, setFavorites] = useState([])
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [favorite, setFavorite] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [modalSuppressionCritik, setModalSuppressionCritik] = useState(false);
  const [modalUpdateCritik, setModalUpdateCritik] = useState(false);
  const [userCritiks, setUserCritiks] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})
  const [updateCritik, setUpdateCritik] = useState('')

  useEffect(() => {
    dispatch(getAsyncMovieDetails(id))
    dispatch(getAsyncMovieCredits(id))
    dispatch(getAsyncMovieVideos(id))
    dispatch(getAsyncAllMovieVideos(id))
    dispatch(getAsyncAllMovieProviders(id))
    getAllCritiks(id)
    getAllFav(currentUser?.uid)
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [currentUser?.uid, favorite, refresh, id])

  //Youtube player style
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
  
  // filtre pour afficher le trailer du film en focntion des differents noms donnés dans l'objet
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
                                                                                      || v.name.includes('Trailer')
                                                                                    })


  const director = crew?.find((a) => a.job === 'Director'  )
  const writers = crew?.filter((a) => a.department === 'Writing'  )
  const exactFavorite = favorites?.filter((a) => a.movieId === movieData?.id)

  //fonction pour le composant Rating
  const handleRating = (rate) => {
    setRating(rate);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const critik = {comment, rating};
    if(comment === '' && rating === 0){
      setRatingError('Pour émettre une critik, il nous faut un avis et une note')
    } else if(rating === 0){
      setRatingError('Pour émettre une critik, veuillez noter le film')
    } else if(comment === '') {
      setRatingError('Pour émettre une critik, veuillez écrire un avis')
    } else {
      writeMovieCritik(critik)
      toggleModalConfirmationCritik(); //Affiche la confiramtion d'ajout de Critik
      setRatingError('')
    }
  }

  //Modale de confirmation d'ajout de critik
  let [modalFavoris, setModalFavoris] = useState(false);
  const toggleModalFavoris = () => { 
    setModalFavoris(!modalFavoris);
  }

  //Modale de confirmation d'ajout de critik
  let [modalConfirmationCritik, setModalConfirmationCritik] = useState(false);
  const toggleModalConfirmationCritik = () => { 
      setModalConfirmationCritik(!modalConfirmationCritik);
      setComment('')
      setRating(0)
  }

  //Afficher/Masquer mes critiks
  let [listCritiks, setListCritiks] = useState(false);
  const toggleListCritiks = () => { 
      setListCritiks(!listCritiks);
  }
  //Afficher/Masquer les videos
  const [moreVideos, setMoreVideos] = useState(false)
  const toggleMoreVideos = () => { 
    setMoreVideos(!moreVideos);
  }
  //Afficher/Masquer le casting
  const [moreCast, setMoreCast] = useState(false)
  const [moreCastButton, setMoreCastButton] = useState(true)
  const toggleMoreCast = () => { 
    setMoreCast(!moreCast);
    setMoreCastButton(!moreCastButton)
  }
  const [moreCast2, setMoreCast2] = useState(false)
  const toggleMoreCast2 = () => { 
    setMoreCast2(!moreCast2);
    setMoreCastButton(!moreCastButton)
  }
  //Afficher/Masquer les scénaristes
  const [moreWriters, setMoreWriters] = useState(false)
  const [moreWritersButton, setMoreWritersButton] = useState(true)
  const toggleMoreWriters = () => { 
    setMoreWriters(!moreWriters);
    setMoreWritersButton(!moreWritersButton)
  }
  const [moreWriters2, setMoreWriters2] = useState(false)
  const toggleMoreWriters2 = () => { 
    setMoreWriters2(!moreWriters2);
    setMoreWritersButton(!moreWritersButton)
  }

  const navigate = useNavigate();

  const toggleListeCritik = (e) => {
    listCritiks = !listCritiks;
}

//Fonction qui écrit une critique pour le film
const writeMovieCritik = async (critik) => {
  try {
    await addDoc(collection(db, `${id}`), {
      movieTtile: movieData.title,
      movieId: id,
      date: date.toLocaleDateString("fr", {day:'numeric', month:'short', year:'numeric'}),
      username: currentUser.displayName,
      critik: critik.comment,
      note: critik.rating,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  try {
    await addDoc(collection(db, `${currentUser?.uid}`), {
      movieTtile: movieData.title,
      movieId: id,
      date: date.toLocaleDateString("fr", {day:'numeric', month:'short', year:'numeric'}),
      username: currentUser.displayName,
      critik: critik.comment,
      note: critik.rating,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  setRefresh(!refresh)
}

//recupere tous les avis laissés pour le film
const getAllCritiks = async (id) => {
    await getDocs(collection(db, `${id}`))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            setCritiks(newData);
      })
}

const toggleModalSuppressionCritik = () => { 
  setModalSuppressionCritik(!modalSuppressionCritik);
}

const toggleModalUpdateCritik = () => { 
  setModalUpdateCritik(!modalUpdateCritik);
}

//fonction qui permet d'ouvrir la modal de suppression de la critik
const openModalDeleteCritik = async (movieId) => {
  toggleModalSuppressionCritik(); //Affiche la modal de confirmation de suppression du commentaire
  //pour pouvoir supprimer la critik dans le dossier de l'user, il faut que je recupère ce dossier au moment ou je clique sur supprimer
  //car le dossier du user peut contenir d'autres critiks
  //et pour recuperer ce dossier, il me faut l'id du user que je recupère dans cette fonction
  //ici on recupère donc les critiks du film par rapport à l'id de l'user
  await getDocs(collection(db, `${currentUser?.uid}`))
  .then((querySnapshot)=>{               
    const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setUserCritiks(newData);
  })
}

//on filtre le tableau userCritiks pour n'avoir que la critik de l'utilisateur connecté
const filteredMovieCritiks = (userCritiks?.filter((a) => a.movieId === `${id}`))

//supprime la critik
const deleteCritik = async (commentId, movieId) => {
  //supprime la critik du dossier de l'utilisateur
  await deleteDoc(doc(db, `${currentUser.uid}`, `${filteredMovieCritiks[0].id}`));
  //supprime la critik du dossier du film en question
  await deleteDoc(doc(db, `${movieId}`, `${commentId}`))
  toggleModalSuppressionCritik(); //Cache la modal de confirmation de suppression du commentaire
  setRefresh(!refresh) //raffraichi la page
}

//fonction qui permet d'ouvrir la modal de modification de la critik
const openModalUpdateCritik = async (movieId) => {
  toggleModalUpdateCritik(); //Affiche la modal de modification du commentaire
  //meme logique que dans la fonction openModalDeleteCritik()
  await getDocs(collection(db, `${currentUser?.uid}`))
  .then((querySnapshot)=>{               
    const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setUserCritiks(newData);
  })
}

//fonction qui modifie la critik pour le film choisi
const updateMovieCritik = async (e, commentId, movieId) => {
  e.preventDefault()
  //modifie le document de l'utilisateur
  await updateDoc(doc(db, `${currentUser.uid}`, `${filteredMovieCritiks[0].id}`), {
    movieTtile: selectedItem.movieTtile,
    movieId: movieId,
    date: date.toLocaleDateString("fr", {day:'numeric', month:'short', year:'numeric'}),
    username: selectedItem.username,
    critik: updateCritik,
    note: rating,
  });
  //modifie le document du dossier film
  await updateDoc(doc(db, `${movieId}`, `${commentId}`), {
    movieTtile: selectedItem.movieTtile,
    movieId: movieId,
    date: date.toLocaleDateString("fr", {day:'numeric', month:'short', year:'numeric'}),
    username: selectedItem.username,
    critik: updateCritik,
    note: rating,
  });
  setUpdateCritik('')
  setRating(0)
  openModalUpdateCritik()
  setRefresh(!refresh) //raffraichi la page
}

// chemin vers les favoris de l'utilisateur
const docRef = doc(db, `${currentUser?.uid}`, 'favorites');
const colRef = collection(docRef, "movies")

//récuperer tous les favoris de l'utilisateur pour la condition de l'icone des favoris
const getAllFav = async (userId) => {
    await getDocs(collection(db, `${userId}`, 'favorites', 'movies'))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            setFavorites(newData);
      })
}

//ajouter le film dans les favoris
const addToFavorite = async () => {
  await addDoc(colRef, {
    movieTtile: movieData.title,
    movieImg: movieData.poster_path,
    movieId: movieData.id,
  });
  setFavorite(true)
}

//supprimer des favoris
const deleteFavorite = () => {
  deleteDoc(doc(colRef, `${exactFavorite[0].id}`))
  .then(() => {
    getAllFav(currentUser?.uid)
  })
}

console.log(writers.length)

const favoritesButton = () => {
  if (exactFavorite.length === 0) {
    return <HeartOutlined style={{ fontSize: '250%' }} onClick={currentUser === null ? toggleModalFavoris : addToFavorite } />
  } else {
    return <HeartFilled style={{ fontSize: '250%', color: 'red' }} onClick={deleteFavorite} />
  }
}

//formater les chiffres type budget et box office au format 1M ou 1K
let formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <div>
      <img className="fixed object-cover h-full w-full sm:w-auto sm:h-auto md:hidden backdrop-blur-sm" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />
      <div
        className="bg-cover bg-top"
        style={{ backgroundImage: `url(${bgImgMovie})`,}}>
        <div className='backdrop-blur-xs md:py-10'>
        <div className="mt-20 md:mt-0 md:flex md:flex-col relative bg-black bg-opacity-80 md:bg-opacity-90 md:mx-10 lg:mx-10 xl:mx-36 2xl:mx-60 px-0  sm:px-5 md:px-10 lg:px-20  md:rounded-xl  text-white">
          <div className="mb-4 underline underline-offset-4 sm:no-underline decoration-amber-200 relative flex items-center">
            <div className="flex-grow border-t ml-20 border-amber-200"></div>
            <span className="flex-shrink my-10 mx-4 text-amber-500 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{movieData.title}</span>
            <div className="flex-grow border-t mr-20 border-amber-200"></div>
          </div>
          {movieData.tagline?.length ?
          <div className="my-6 md:border-none flex flex-col items-center">
            <span className="flex-shrink text-amber-100 text-center text-sm sm:text-lg md:text-lg lg:text-xl xl:text-xl italic">"{movieData.tagline}"</span>
          </div>
          : <></>}
          <div className="flex flex-col items-center pb-8">
          {/* Bouton Favoris */}
          <div className='flex flex-row justify-between'>
            <div>
              {favoritesButton()}
            </div>
            {/* Note du film */}
            <div className="flex flex-col items-center ml-12">
              <p className={`text-xl font-bold 
                              ${movieData?.vote_average?.toFixed(1) <= 0 && 'text-white'} 
                              ${movieData?.vote_average?.toFixed(1) > 0 && 'text-red-600'} 
                              ${movieData?.vote_average?.toFixed(1) >= 3 && 'text-amber-600'} 
                              ${movieData?.vote_average?.toFixed(1) >= 5 && 'text-yellow-900'} 
                              ${movieData?.vote_average?.toFixed(1) >= 6 && 'text-lime-600'} 
                              ${movieData?.vote_average?.toFixed(1) >= 8 && 'text-green-600'}`}>
                                {movieData?.vote_average > 0 ? movieData?.vote_average?.toFixed(1) : "~"} 
                                <span className='text-xl text-white'> / 10</span>
                                <span className='text-xs text-white cursor-pointer' onClick={() => window.open( `https://www.themoviedb.org//movie/${id}?language=fr`)}> (TMDB)</span>
              </p>
              <p className='text-xs'>{movieData?.vote_count} votes</p>
            </div>
          </div>
          </div>
            <div className="  sm:flex justify-between">
              <div className="flex flex-col justify-between sm:w-1/2 bg-black bg-opacity-70 sm:rounded-xl p-5 md:bg-inherit">
                <div className='flex flex-row justify-evenly sm:justify-start'>
                  <p className="text-center sm:text-start sm:text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-amber-500"><span>&nbsp;{dateFormat(movieData.release_date, 'yyyy')}</span></p>
                  <p className="text-center sm:text-start sm:text-base sm:ml-4 md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-amber-500">{movieData.runtime} min</p>
                </div>
                <ul className="text-center mt-5 sm:text-start sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">Genres : <br/>{genres?.length && genres.map((g) => <li className='text-amber-500 md:text-base' key={g.id}>{g.name}</li> )}</ul>
                <p className="text-center mt-5 sm:text-start sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">Réalisateur : <br/><span className='text-amber-500 md:text-base'>{director?.name}</span></p>
                <div className="text-center mt-5 sm:text-start sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                  Scénario : <br/>
                  <div className='sm:flex sm:flex-row sm:flex-wrap sm:justify-start sm:items-center'>
                    {writers?.length && writers.slice(0, 3).map((g) => 
                      <p className='text-amber-500 md:text-base' key={g.id}>{g.name}(<span className='text-amber-100'>{g.job}</span>)</p>)
                                                          .reduce((prev, curr) => [prev, (<span className='mb-1 hidden sm:block'>&nbsp;-&nbsp;</span>), curr])}
                  </div>
                    {moreWritersButton && writers?.length > 3 ? <button className='underline text-xs xl:text-base' onClick={windowSize.innerWidth < 640 ? toggleMoreWriters : toggleMoreWriters2}>Plus</button> : <></>}
                    {moreWriters && (
                      <ul>
                        {
                          writers?.length && writers.slice(3, 20).map((g) =>
                            <p className='text-amber-500 md:text-base' key={g.id}>{g.name}(<span className='text-amber-100'>{g.job}</span>)</p>)
                        }
                        <button className='underline text-xs' onClick={toggleMoreWriters}>Moins</button>
                      </ul>
                    )}
                </div>
                <ul className="text-center sm:text-start mt-5 sm:text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl">
                  Casting :<br />{casting?.length && casting.slice(0, 3).map((cast) =>
                    <li className='text-amber-500 sm:text-xs lg:text-base' key={cast.id}><span className='text-amber-100'>{cast.character}:</span> {cast.name}</li>)}
                    {moreCastButton ? <button className='underline text-xs xl:text-base' onClick={windowSize.innerWidth < 640 ? toggleMoreCast : toggleMoreCast2}>Plus</button> : <></>}
                    {moreCast && (
                      <ul>
                        {
                          casting?.length && casting.slice(3, 20).map((cast) =>
                            <li className='text-amber-500' key={cast.id}><span className='text-amber-100'>{cast.character}:</span> {cast.name}</li>
                          )
                        }
                        <button className='underline text-xs' onClick={toggleMoreCast}>Moins</button>
                      </ul>
                    )}
                </ul>
                {/* Budget ecran mobile */}
                <p className="text-center sm:text-start md:m-0 mt-5 sm:hidden">Budget : <br/>{movieData?.budget > 0 ? <span className='text-amber-500'>{formatter.format(movieData.budget)} $</span> : <span className='text-amber-500'>Inconnu</span>}</p>
                {movieData.revenue > 0 ?
                  <>
                    <p className="text-center sm:text-start md:m-0 mt-5 sm:hidden">Box-Office : <br/><span className='text-amber-500'>{formatter.format(movieData.revenue)} $</span></p>
                    <p className={`text-center sm:text-start md:m-0 mt-5 sm:hidden ${movieData.revenue - movieData.budget > 0 ? 'text-green-800' : 'text-red-800'}`}>{formatter.format(movieData.revenue - movieData.budget)} $</p>
                    </>
                : <></>
                }
              </div>
              <img className="border-amber-100 border-2 hidden sm:flex sm:w-1/2 md:w-1/2 lg:w-3/6 xl:w-5/12 2xl:w-4/12 object-cover" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />
        </div>
        {/*Budget Ecran > sm */}
        <div className='hidden sm:flex justify-around mt-12 bg-black bg-opacity-70 sm:rounded-xl p-5 md:bg-opacity-50 sm:mt-6'>
          <p className="text-center sm:text-start md:m-0 my-4 sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">Budget : {movieData?.budget > 0 ? <span className='text-amber-500'>{formatter.format(movieData.budget)} $</span> : <span className='text-amber-500'>Inconnu</span>}</p>
          {movieData.revenue > 0 ?
            <>
              <p className="text-center sm:text-start md:m-0 my-4 sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">Box-Office : <span className='text-amber-500'>{formatter.format(movieData.revenue)} $</span></p>
              <p className={`text-center sm:text-start md:m-0 my-4 sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ${movieData.revenue - movieData.budget > 0 ? 'text-green-800' : 'text-red-800'}`}>{formatter.format(movieData.revenue - movieData.budget)} $</p>
            </>
          : <></>
          }
        </div>
        {/* Synopsis */}
          <div className=" sm:text-xl md:text-2xl 2xl:text-3xl text-center pt-10 bg-black bg-opacity-70 sm:rounded-xl p-5 my-10 md:bg-transparent font-bold">Description :
            <p className="text-md sm:text-lg md:text-xl 2xl:text-2xl font-normal  py-10">
              {movieData?.overview ? movieData.overview : <span className="text-md">Aucune Information</span>}
            </p>
          </div>
        {/* Trailer */}
        {movieTrailers?.length ? 
          <YouTube 
            videoId={movieTrailers[0].key} 
            opts={opts} onReady={onPlayerReady} />
          :
          <></>
        }
        {/* Plus de videos */}
        {movieTrailers?.length ?
          (
            allMovieVideosData?.length > 1 && moreVideos === false
              ?
              <div className='flex flex-col items-center'>
                <button className='w-36 bg-transparent hover:bg-amber-100 text-amber-100 font-normal text-sm hover:text-amber-500 py-2 border border-amber-100 hover:border-transparent rounded' onClick={toggleMoreVideos}>Plus de videos</button>
              </div>
              :
              <div className='flex flex-col items-center mb-4'>
                <button className='w-36 bg-transparent hover:bg-amber-100 text-amber-100 font-normal text-sm hover:text-amber-500 py-2 border border-amber-100 hover:border-transparent rounded' onClick={toggleMoreVideos}>Moins de videos</button>
              </div>
          ) : <></>
        }
          {
            moreVideos && allMovieVideosData?.length
              ?
              <div>
                {allMovieVideosData.slice(0, 5).map((i) => {
                  return (
                    <div key={i.id}>
                      <YouTube
                        videoId={i.key}
                        opts={opts} onReady={onPlayerReady} />
                    </div>
                  )
                })}
                <div className='flex flex-col items-center mb-4'>
                  <button className='w-36 bg-transparent hover:bg-amber-100 text-amber-100 font-normal text-sm hover:text-amber-500 py-2 border border-amber-100 hover:border-transparent rounded' onClick={toggleMoreVideos}>Moins de videos</button>
                </div>
              </div>
              :
              <></>
          }
        {/* Production */}
        <div className="bg-black bg-opacity-70 sm:rounded-xl p-5 md:bg-opacity-50 mt-6">
          <p className='flex flex-col items-center text-center text-base pb-4 md:text-xl'>Production: </p>
          <div className="flex justify-around">
            <div className='flex flex-col items-center text-center'>
              <p className='underline text-sm md:text-lg'>Compagnies: </p>
              {
                movieData.production_companies?.length > 0 ? 
                ( <div className='flex flex-col items-center'>
                  {movieData.production_companies.map((mv) => {
                    return (
                      <p className='my-2 mx-2 text-amber-100' key={mv.id}>{mv.name}</p>
                    )
                  })}
                  </div>
                ) : ( <p className='mt-4'>Pas d'information</p> )
              }
            </div>
            <div className='flex flex-col items-center text-center'>
              <p className='underline text-sm md:text-lg'>Pays: </p>
              {
                movieData.production_countries?.length > 0 ? 
                ( <div className='flex flex-col items-center'>
                  {movieData.production_countries.map((mv) => {
                    return (
                      <p className='my-2 mx-2 text-amber-100' key={mv.name}>{mv.name}</p>
                    )
                  })}
                  </div>
                ) : ( <p className='mt-4'>Pas d'information</p> )
              }
            </div>
          </div>
        </div>
        {/* Disponibiltés de visionnage */}
        <div className="bg-black bg-opacity-70 sm:rounded-xl p-5 md:bg-opacity-50 mt-6">
          <p className='flex flex-col items-center text-center text-base pb-4 md:text-xl'>Disponible sur: </p>
          <div className="flex justify-around">
            <div className='flex flex-col items-center text-center'>
              <p className='underline text-sm md:text-lg'>Abonnement: </p>
              {
                movieProviders === null ? 
                (
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#0891b2'
                    color = '#f59e0b'
                  /> 
                ) : movieProviders.FR?.flatrate?.length > 0 ? 
                ( <div className='flex flex-col items-center md:flex-row flex-wrap justify-center md:mr-2'>
                  {movieProviders.FR.flatrate.map((pr) => {
                    return (
                      <img src={`https://image.tmdb.org/t/p/original/${pr.logo_path}`} alt={pr.provider_name} className='w-12 rounded-xl my-2 mx-2' key={pr.provider_id}/>
                    )
                  })}
                  </div>
                ) : ( <p className='mt-4'>Aucune disponibilité</p> )
              }
            </div>
            <div className='flex flex-col items-center text-center'>
              <p className='underline text-sm md:text-lg'>Achat: </p>
              {
                movieProviders === null ? 
                (
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#0891b2'
                    color = '#f59e0b'
                  /> 
                ) : movieProviders.FR?.buy?.length > 0 ? 
                ( <div className='flex flex-col items-center md:flex-row flex-wrap justify-center'>
                  {movieProviders.FR.buy.map((pr) => {
                    return (
                      <img src={`https://image.tmdb.org/t/p/original/${pr.logo_path}`} alt={pr.provider_name} className='w-12 rounded-xl my-2 mx-2' key={pr.provider_id}/>
                    )
                  })}
                  </div>
                ) : ( <p className='mt-4'>Aucune disponibilité</p> )
              }
            </div>
          </div>
        </div>
          {/* Commentaires */}
          <div className="w-full mx-0 mt-6 md:grid md:grid-cols-2 gap-10 bg-black md:bg-opacity-60 bg-opacity-60 sm:rounded-xl py-5 px-5 lg:px-10 ">
            <p className="col-span-2 sm:text-xl md:text-2xl text-center 2xl:text-3xl my-5 font-bold">Commentaires :</p>  
            {   
                    critiks?.length ? critiks.map((crt) => {   
                            return(          
                                    <div key={crt.id}>   
                                      <p className="text-amber-500 font-extrabold">{crt.username}</p>
                                      <p className="text-amber-300 font-semibold py-2">{crt.note} / 5</p>
                                      <p className="text-lg text-white">{crt.critik}</p>
                                      {crt.username === currentUser?.displayName 
                                        ? <div className='flex justify-start mt-4'>
                                            <button className="text-lg text-white" 
                                            onClick={() => { openModalDeleteCritik(crt.movieId); setSelectedItem(crt) }}
                                            >
                                              <Trash2 color="#FF1E1E" size={24} />
                                            </button>
                                            <button className="text-lg text-white ml-4" 
                                            onClick={() => { openModalUpdateCritik(crt.movieId); setSelectedItem(crt) }}
                                            >
                                              <Edit color="#F8CB2E" size={24} />
                                            </button>
                                          </div>
                                        : <></>
                                      }
                                    </div>
                            )
                    }) : <></>               
            } 
          </div>
          <form className="my-10 md:my-20 h-72 text-black pb-12" onSubmit={handleSubmit}>
              <label htmlFor="comment" className='text-3xl text-amber-500 font-extrabold'>Votre Critik <span className='text-white'>:</span> </label>
              <textarea className="text-lg w-full h-2/3 mt-10 p-7 rounded-xl" type="text" size="5" value={comment}
              onChange={(e) => setComment(e.target.value)} 
              />
              <div className="text-white flex flex-col items-center text-center sm:text-left mt-2">
                <ReactStars
                  count={5}
                  onChange={handleRating}
                  size={70}
                />
              </div>
                <div className="flex flex-col items-center">
                {ratingError === '' ? <></> : <p className="fade-in text-red-800 font-bold text-center mb-4">{ratingError}</p>}
                  <button type="submit" className="flex sm:block m-auto sm:m-0 py-4 mb-5 px-12 sm:py-3 sm:px-10 md:py-4 md:px-12  shadow-md shadow-stone-300/50 bg-stone-900 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50">Critiker !</button>
                </div>       
          </form>
          <div className='bg-black bg-opacity-60 text-center md:flex md:justify-center pt-3 mt-48 md:mt-32 md:py-2 md:pb-0 sm:rounded-t-lg'>
            <p onClick={() => navigate("/inscription")} className="mb-3 md:mr-10 cursor-pointer text-amber-50 hover:underline text-sm" >Vous n'êtes pas encore inscrit ?</p>
            <p onClick={() => navigate("/login")} className="pb-3 md:ml-10 text-center cursor-pointer text-sm  text-amber-50 hover:underline">Vous n'êtes pas connecté ?</p>
          </div>
        </div>
        </div>
      </div>
      {modalFavoris&& (
                        <div className="modal overlay flex flex-col items-center">
                        <div className="modal-content flex flex-col text-black xl:w-2/3">
                          <button
                            onClick={toggleModalFavoris}
                            className="btn-modal text-black flex justify-end">
                            <X color="white" size={32} />
                          </button>
                            <div className="flex flex-col text-center mt-5 text-amber-100 pb-10">
                              <p>Vous devez être inscrit pour ajouter des favoris !</p>
                            </div>
                        </div>
                      </div>)
      }
      {/* Modal + Casting => screen > 640*/}
      {moreWriters2 && (
                  <div className="modal overlay flex flex-col items-center">
                    <div className="modal-content text-black h-auto">
                      <button
                        onClick={toggleMoreWriters2}
                        className="btn-modal text-black float-right">
                        <X color="white" size={32} />
                      </button>
                      <div className="flex flex-col items-center mt-12 h-5/6 overflow-auto pb-12">
                      <ul className="text-center sm:text-start xl:mt-0 mt-5 sm:text-lg md:text-xl lg:text-xl">{writers?.length && writers.slice(0, 20).map((g) => <li className='text-amber-100' key={g.id}><span className='text-amber-500'>{g.name}:</span> {g.job}</li> )}</ul>
                      </div>
                    </div>
                  </div>)
      }
      {moreCast2 && (
                  <div className="modal overlay flex flex-col items-center">
                    <div className="modal-content text-black h-3/4">
                      <button
                        onClick={toggleMoreCast2}
                        className="btn-modal text-black float-right">
                        <X color="white" size={32} />
                      </button>
                      <div className="flex flex-col items-center mt-12 h-5/6 overflow-auto">
                      <ul className="text-center sm:text-start xl:mt-0 mt-5 sm:text-lg md:text-xl lg:text-xl">{casting?.length && casting.slice(0, 20).map((cast) => <li className='text-amber-500' key={cast.id}><span className='text-amber-100'>{cast.character}:</span> {cast.name}</li> )}</ul>
                      </div>
                    </div>
                  </div>)
      }
      {modalConfirmationCritik&& (
                        <div className="modal overlay flex flex-col items-center">
                        <div className="modal-content text-black">
                          <button
                            onClick={toggleModalConfirmationCritik}
                            className="btn-modal text-black float-right">
                            <X color="white" size={32} />
                          </button>
                          {currentUser === null ?
                            <div className="flex flex-col text-center mt-10 text-amber-100 pb-10">
                              <p>Vous devez être inscrit pour ajouter des favoris !</p>
                            </div>
                          : 
                            <div className="flex flex-col items-center mt-6 text-amber-100 ml-8 pb-10">
                              <p className="flex items-center justify-center mt-8">Critik bien ajouté pour</p>
                              <p className="flex items-center justify-center text-amber-300">{movieData.title}</p>
                            </div>
                          }
                        </div>
                      </div>)
      }
      {modalSuppressionCritik && (
              <div className="modal overlay flex flex-col items-center">
                <div className="modal-content flex flex-col text-black xl:w-2/3">
                  <button
                    onClick={toggleModalSuppressionCritik}
                    className="btn-modal text-black flex justify-end">
                    <X color="white" size={32} />
                  </button>
                  <div className="flex flex-col items-center mt-6 text-amber-100">
                    <p className="flex text-center mt-8">Supprimer votre commentaire pour</p>
                    <p className="flex text-center text-amber-300">{selectedItem.movieTtile}&nbsp;?</p>
                    <button className='my-8 shadow-md shadow-orange-800/50 lg:py-1 px-5 rounded-md text-lg text-red-700 font-semibold border-2 border-red-800 hover:text-red-500 hover:border-red-500 hover:shadow-red-500/50' onClick={() => deleteCritik(selectedItem.id, selectedItem.movieId)}>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
      )}
      {modalUpdateCritik && (
              <div className="modal overlay flex flex-col items-center">
                <div className="modal-content text-black xl:w-2/3">
                  <button
                    onClick={toggleModalUpdateCritik}
                    className="btn-modal text-black float-right">
                    <X color="white" size={32} />
                  </button>
                  <div className="flex flex-col items-center mt-12">
                    <p className="text-lg text-amber-300">{selectedItem.movieTtile}</p>
                    <form className='my-4 flex flex-col items-center w-full' onSubmit={(e) => updateMovieCritik(e, selectedItem.id, selectedItem.movieId)}>
                      <textarea class="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline h-36 mb-4" type="text" placeholder="Modifiez votre critik" value={updateCritik} onChange={(e) => setUpdateCritik(e.target.value)}/>
                        <ReactStars
                          count={5}
                          onChange={handleRating}
                          size={24}
                        />
                      <button type='submit' className='mt-4 shadow-md shadow-amber-500/50 lg:py-1 px-5 lg:px-5 rounded-md text-lg text-amber-500 font-semibold border-2 border-amber-500 hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50'>
                        Modifier
                      </button>
                    </form>
                  </div>
                </div>
                
              </div>
      )} 
    </div>
  )
}

export default PageFilm

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}