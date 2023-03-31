import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from "../authContext"
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { db } from '../firebase/index'
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

import { X, Trash2, Edit } from 'react-feather';
import ReactStars from 'react-stars'

export default function Profile() {

    const navigate = useNavigate();

    const date = new Date();

    //currentUser infos
    const { currentUser } = useAuthValue()

    //Déconnexion
    const auth = getAuth();

    const SignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            });
    }

    //Désinscription du compte
    const DeleteUser = () => {
        deleteUser(currentUser)
            .then(() => {
                navigate('/')
            }).catch((error) => {
                console.log(error)
            });
    }

    const [favorites, setFavorites] = useState([])
    const [userCritiks, setUserCritiks] = useState([]);
    const [movieCritiks, setMovieCritiks] = useState([])
    const [modalSuppressionCritik, setModalSuppressionCritik] = useState(false);
    const [modalUpdateCritik, setModalUpdateCritik] = useState(false);
    const [modalSuppressionFavori, setModalSuppressionFavori] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [rating, setRating] = useState(0)
    const [updateCritik, setUpdateCritik] = useState('')
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function getData() {
            await getAllCritiks(currentUser?.uid)
            await getAllFav(currentUser?.uid)
        }
        getData()
        // a(505642)
    }, [currentUser?.uid, refresh]);

    const docRef = doc(db, `${currentUser?.uid}`, 'favorites');
    const colRef = collection(docRef, "movies")

    const getAllFav = async (userId) => {
        await getDocs(collection(db, `${userId}`, 'favorites', 'movies'))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFavorites(newData);
            })
    }

    //supprimer des favoris
    const toggleModalSuppressionFavori = () => {
        setModalSuppressionFavori(!modalSuppressionFavori);
    }

    const deleteFavorite = async (favoriteId) => {
        await deleteDoc(doc(colRef, `${favoriteId}`)).then(() => setRefresh(!refresh))
    }

    //supprimer des critiks
    const toggleModalSuppressionCritik = () => {
        setModalSuppressionCritik(!modalSuppressionCritik);
    }

    const toggleModalUpdateCritik = () => {
        setModalUpdateCritik(!modalUpdateCritik);
    }

    //recupère les critiks de l'utilisateur
    const getAllCritiks = async (userId) => {
        await getDocs(collection(db, `${userId}`))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUserCritiks(newData);
            })
    }

    //fonction qui permet d'ouvrir la modal de suppression de la critik
    const openModalDeleteCritik = async (movieId) => {
        toggleModalSuppressionCritik(); //Affiche la modal de confirmation de suppression du commentaire
        //pour pouvoir supprimer la critik dans le dossier du film, il faut que je recupère ce dossier au moment ou je clique sur supprimer
        //car le dossier du film peut contenir des critiks d'autres utilisateurs
        //et pour recuperer ce dossier, il me faut l'id du film que je recupère dans cette fonction
        //ici on recupère donc les critiks du film par rapport à l'id
        await getDocs(collection(db, `${movieId}`))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMovieCritiks(newData);
            })
    }
    //on filtre le tableau movieCritiks pour n'avoir que la critik de l'utilisateur connecté
    const filteredMovieCritiks = (movieCritiks.filter((a) => a.username === `${currentUser?.displayName}`))

    //supprime les critiks
    const deleteCritik = async (commentId, movieId) => {
        //supprime la critik du dossier de l'utilisateur
        await deleteDoc(doc(db, `${currentUser.uid}`, `${commentId}`));
        //supprime la critik du dossier du film en question
        await deleteDoc(doc(db, `${movieId}`, `${filteredMovieCritiks[0].id}`))
        toggleModalSuppressionCritik(); //Cache la modal de confirmation de suppression du commentaire
        setRefresh(!refresh) //raffraichi la page
    }

    //fonction qui permet d'ouvrir la modal de modification de la critik
    const openModalUpdateCritik = async (movieId) => {
        toggleModalUpdateCritik(); //Affiche la modal de modification du commentaire
        //meme logique que dans la fonction openModalDeleteCritik()
        await getDocs(collection(db, `${movieId}`))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMovieCritiks(newData);
            })
    }

    const handleRating = (rate) => {
        setRating(rate);
        // other logic
    }

    //fonction qui modifie la critik pour le film choisi
    const updateMovieCritik = async (e, commentId, movieId) => {
        e.preventDefault()
        //modifie le document de l'utilisateur
        await updateDoc(doc(db, `${currentUser.uid}`, `${commentId}`), {
            movieTtile: selectedItem.movieTtile,
            movieId: movieId,
            date: date.toLocaleDateString("fr", { day: 'numeric', month: 'short', year: 'numeric' }),
            username: selectedItem.username,
            critik: updateCritik,
            note: rating,
        });
        //modifie le document du dossier film
        await updateDoc(doc(db, `${movieId}`, `${filteredMovieCritiks[0].id}`), {
            movieTtile: selectedItem.movieTtile,
            movieId: movieId,
            date: date.toLocaleDateString("fr", { day: 'numeric', month: 'short', year: 'numeric' }),
            username: selectedItem.username,
            critik: updateCritik,
            note: rating,
        });
        setUpdateCritik('')
        setRating(0)
        openModalUpdateCritik()
        setRefresh(!refresh) //raffraichi la page
    }

    return (
        <>
            <div>
                <div className="flex flex-col mt-10 lg:flex lg:flex-row lg:justify-center py-10 sm:py-20" >
                    <img className="mt-10 m-auto lg:m-0" id="avatar" src={currentUser !== null ? currentUser?.photoURL : null} alt="mouton" />
                    <div id="pseudo" className="text-center text-xl lg:ml-40 lg:pb-0 sm:text-4xl text-amber-100 pt-8 sm:pt-24 pb-10 border-amber-200 border-b-8">Bienvenue <span className="text-amber-500 font-bold">{currentUser?.displayName?.length ? currentUser?.displayName : null}</span> </div>
                </div>
                <div className="flex flex-col text-center lg:text-left text-amber-100 py-2 sm:py-5 lg:ml-40">
                    <p className="text-xl sm:text-3xl underline">Infos</p>
                    <br />
                    <div className="flex flex-col space-y-1">
                        <p className="text-lg">Pseudo :  <span className="text-amber-500">{currentUser?.displayName?.length ? currentUser?.displayName : null}</span></p>
                        <p className="text-lg">Adresse mail : <span className="text-amber-500">{currentUser?.email?.length ? currentUser?.email : null}</span></p>
                    </div>
                </div>
                <div className="m-auto w-2/4 sm:w-1/4 mt-10 sm:mt-20 mb-10 border-b-4 border-amber-200"></div>
                <div className="flex flex-col text-amber-100 py-10 ">
                    <p className="text-xl sm:text-3xl underline m-auto lg:ml-40 pb-5">Mes favoris</p>
                    <br />
                    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 lg:mx-40 xl:grid-cols-4 mx-20 gap-20 ">
                        {/* Début de traitement liste de favoris d'1 user */}
                        {
                            favorites?.length ? favorites.map(fav => {
                                return (
                                    <div className="flex flex-col items-center" key={fav.id}>
                                        <div className="text-center cursor-pointer" onClick={() => navigate(`/page-film/${fav.movieId}`)}>
                                            <img className="rounded-md w-48 transition duration-300 hover:scale-105" id="favoris" src={`https://image.tmdb.org/t/p/original/${fav.movieImg}`} alt="affiche de film" />
                                            <p className="text-lg mt-2">{fav.movieTtile}</p>
                                        </div>
                                        <div className="text-center">
                                            <button className="text-base text-red-700 mt-1" onClick={() => { toggleModalSuppressionFavori(); setSelectedItem(fav) }}>Supprimer</button>
                                        </div>
                                    </div>
                                )
                            }) : <p className="text-base text-white">Aucun favoris</p>
                        }
                        {/* Fin de traitement liste de favoris d'1 user */}
                    </div>
                </div>
                <div className="m-auto w-2/4 sm:w-1/4 sm:mt-20 mb-10 border-b-4 border-amber-200"></div>
                <div className="flex flex-col text-amber-100 py-10 ">
                    <p className="text-xl sm:text-3xl underline m-auto lg:ml-40 pb-5">{/*<span className=" text-amber-500">*/}<span className="flex flex-col space-y">Mes critiks</span></p>
                    <br />
                    <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 lg:mx-40 xl:grid-cols-2 mx-20 gap-20 ">
                        {
                            userCritiks?.length ? userCritiks.map((crt) => {
                                return (
                                    <>
                                        <div className="text-left" key={crt.id}>
                                            <p className="text-lg text-amber-500 underline cursor-pointer hover:text-amber-600" onClick={() => navigate(`/page-film/${crt.movieId}`)}>{crt.movieTtile}</p>
                                            <p className="text-lg text-orange">{crt.note} / 5</p>
                                            <p className="text-base text-white my-2">{crt.critik}</p>
                                            <div className='flex justify-start mt-4'>
                                                <button className="text-lg text-white" onClick={() => { openModalDeleteCritik(crt.movieId); setSelectedItem(crt) }}>
                                                    <Trash2 color="#FF1E1E" size={24} />
                                                </button>
                                                <button className="text-lg text-white ml-4" onClick={() => { openModalUpdateCritik(crt.movieId); setSelectedItem(crt) }}>
                                                    <Edit color="#F8CB2E" size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }) : <p className="text-base text-white">Aucune critik laissée</p>
                        }
                        {modalSuppressionFavori && (
                            <div className="modal overlay flex flex-col items-center">
                                <div className="modal-content flex flex-col text-black xl:w-2/3">
                                    <button
                                        onClick={toggleModalSuppressionFavori}
                                        className="btn-modal text-black float-right flex justify-end">
                                        <X color="white" size={32} />
                                    </button>
                                    <div className="flex flex-col items-center mt-2 text-amber-100">
                                        <p className="flex items-center justify-center mt-8">Supprimer ce favori :</p>
                                        <p className="flex items-center justify-center text-amber-300">{selectedItem.movieTtile}&nbsp;?</p>
                                        <button className='my-8 shadow-md shadow-orange-800/50 lg:py-1 px-5 rounded-md text-lg text-red-700 font-semibold border-2 border-red-800 hover:text-red-500 hover:border-red-500 hover:shadow-red-500/50' onClick={() => deleteFavorite(selectedItem.id)}>
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {modalSuppressionCritik && (
                            <div className="modal overlay flex flex-col items-center">
                                <div className="modal-content flex flex-col text-black xl:w-2/3">
                                    <button
                                        onClick={toggleModalSuppressionCritik}
                                        className="btn-modal text-black float-right flex justify-end">
                                        <X color="white" size={32} />
                                    </button>
                                    <div className="flex flex-col items-center mt-2 text-amber-100">
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
                                <div className="modal-content flex flex-col text-black xl:w-2/3">
                                    <button
                                        onClick={toggleModalUpdateCritik}
                                        className="btn-modal text-black float-right flex justify-end">
                                        <X color="white" size={32} />
                                    </button>
                                    <div className="flex flex-col items-center mt-5">
                                        <p className="text-lg text-center text-amber-300">{selectedItem.movieTtile}</p>
                                        <form className='my-4 flex flex-col items-center w-full' onSubmit={(e) => updateMovieCritik(e, selectedItem.id, selectedItem.movieId)}>
                                            <textarea class="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline h-36 mb-4" type="text" placeholder="Modifiez votre critik" value={updateCritik} onChange={(e) => setUpdateCritik(e.target.value)} />
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
                </div>
                <div className="m-auto w-2/4 sm:w-1/4 sm:mt-20 mb-10 border-b-4 border-amber-200"></div>
                <div className="flex justify-center items-center flex-row space-x-4 mb-20">
                    <div className="flex justify-center col-span-3">
                        <button onClick={SignOut} className="shadow-md shadow-amber-700/50 bg-stone-900 py-1 px-5 mt-10 rounded-md text-xs sm:text-lg text-amber-700 font-semibold border-2 border-amber-700 hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50">Se déconnecter</button>
                    </div>
                    <div className="flex justify-center col-span-3">
                        <button onClick={DeleteUser} className="shadow-md shadow-orange-800/50 bg-stone-900 py-1 px-5 mt-10 rounded-md text-xs sm:text-lg text-red-800 font-semibold border-2 border-red-800 hover:text-red-500 hover:border-red-500 hover:shadow-red-500/50">Se désinscrire</button>
                    </div>
                </div>
            </div>
        </>
    )
}