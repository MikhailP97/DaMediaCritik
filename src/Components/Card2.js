/* eslint-disable jsx-a11y/anchor-is-valid */
import '../App.css';
import React, { useState, useEffect } from "react";
import "./Modal/Modal.css";
import "../index.css";
import axios from 'axios';
import Stars from './Stars';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'


const Card = ({id, img, alt, title, cat, resume, year, note, style, rate}) => {

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggleModal = () => { setModal(!modal) }

    const [modalCritik, setModalCritik] = useState(false);
    const toggleModalCritik = () => { setModalCritik(!modalCritik) }

    const [modalFavoris, setModalFavoris] = useState(false);
    const toggleModalFavoris = () => { 
        setModalFavoris(!modalFavoris);
    }

    const [favoris, setFavoris] = useState([]);
    const [critiks, setCritiks] = useState([]);
    
    //Modale de confirmation d'ajout de favoris
    let [listFavoris, setListFavoris] = useState(false);
    const toggleListFavoris = () => { 
        setListFavoris(!listFavoris);
    }

    //Modale de confirmation d'ajout de critiks
    let [listCritiks, setListCritiks] = useState(false);
    const toggleListCritiks = () => { 
        setListCritiks(!listCritiks);
    }

    //Modale de confirmation d'ajout de critik
    let [modalConfirmationCritik, setModalConfirmationCritik] = useState(false);
    const toggleModalConfirmationCritik = () => { 
        setModalConfirmationCritik(!modalConfirmationCritik);
    }

    if(modal) { document.body.classList.add('active-modal') }
    else {      document.body.classList.remove('active-modal') }

    const api_url = "http://localhost:3001/comments";
    const createCritik = async (critik) => {
        await axios.post(api_url+'?filmId='+critik.filmId+'&commentaire='+critik.comment+'&note='+critik.note, critik)
         .then(console.log('Nouvelle critique de l utilisateur n°... crée'))
         .catch(err=>{
            console.error(err);
        });
        console.log('Commentaire crée');
    }

     /*
    * Fonction handleSubmit
    * Ajoute 1 Critik de film 
    * params : id (id du film)
    */
    const handleSubmit = (e) => {
        console.log('Vous avez validé la modale modalCritik !');
        e.preventDefault(); //La page n'est pas chargée
        const form = e.target; //tableau inputs
        const filmId = form[0].value;
        const comment = form[1].value;
        const note = form[2].value;
        const critik = {filmId, comment, note, userId:1};
        //console.log(critik);

        //Requete HTTP en POST
        createCritik(critik);   
        toggleModalCritik(); //Ferme la modale Critik
        toggleModalConfirmationCritik(); //Affiche le formulaire d'ajout de Critik
    }    
    
    /*
    * Fonction handleClick 
    * Ajoute 1 film en favori
    * params : id (id du film)
    */
    const handleClick = (e) => {
        e.preventDefault();
        // const favori = {filmId: id, titre: title, img: img};
         const favori = {filmId: id, title: title, userId:1, img: img};
         console.log(favori);
        createFavoris(favori);
        toggleModalFavoris(); //Affiche la modale de confirmation de l'ajout des favoris
    }

    const createFavoris = async (favori) => {
        //console.log('favori='+favori.filmId);
        let userId = 1; //A récupérer en dynamique en fonction de l'ID de l'user connecté
        let filmId = id; //est récupéré dynamiquement en fonction du film mis en favori
        //let image = img;
        const api_url = "http://localhost:3001/favoris";
        //console.log('userID='+userId);
        //console.log('filmId='+id);
        //console.log('Titre='+title);
        //console.log('image'+image);

        //console.log(api_url);
        await axios.post(api_url, favori)
         .then(console.log('Nouveau favori enregistré pour le film '+filmId+' et l utilisateur n°'+userId))
         .catch(err=>{
            console.error(err);
        });
        console.log('Favoris crée');
    }

    const getFavoris = async (favori) => {
        let userId = 1;
         const api_url = "http://localhost:3001/users/"+userId+"/favoris";
        await axios.get(api_url)
         .then(({data}) => {
            console.log(data); //Favoris
            setFavoris(data)
         })
         .catch(err=>{
             console.error(err);
         });
     }

     const getCritiks = async (critik) => {
        let userId = 1;
         const api_url = "http://localhost:3001/users/"+userId+"/comments";
        await axios.get(api_url)
         .then(({data}) => {
            console.log(data); //Critiks
            setCritiks(data)
         })
         .catch(err=>{
             console.error(err);
         });
     }

    const toggleListeFavoris = (e) => {
        console.log('Vpus avez listé vos favoris !');        
        listFavoris = !listFavoris;
    }
//-----------------------------------------------------------
    const toggleListeCritik = (e) => {
        console.log('Vpus avez ajouté une critik !');        
        listCritiks = !listCritiks;
    }

    useEffect(() => {
        getFavoris();
        getCritiks();
    }, [id]);

    return (
        <>
            <div className="card text-white">
                <img className="opacity1" key={id} src={img} alt={alt} title={resume} cat={cat} note={note} style={style} />        
                <center>
                <div className="mt-4">
                    <h2 className="title-font text-lg font-medium text-white">{title}</h2>
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-300">{cat}</h3>
                    <p className="text-white mt-1">{year}</p>
                    {/* <a href="#" onClick={toggleModal}>Détails</a> | */}
                    <a href="#" onClick={toggleModalCritik} title="Critiker ce film !"> ⭐Critiker !
                    </a>&nbsp;<a href="#" onClick={handleClick} title="Mettre en favoris">🖤 ❤️Favoris</a><br/>
            
                    {modalCritik && (
                        <div className="modal">
                            <div className="overlay"></div>
                                <div className="modal-content text-black">
                                
                                    <button 
                                        onClick={toggleModalCritik}
                                        className="btn-modal text-black float-right">
                                        [X]
                                    </button>
                                    <br/>                            
                                    
                                    <form onSubmit={handleSubmit}>  
                                        <center>
                                            <h1 className='title-font text-lg'>{title}</h1>
                                            <br/>
                                            <img src={img} width="200" alt={alt}/>
                                        </center>
                                        {/* <br/>
                                        FilmId : {id} */}
                                        <input type='hidden' size='6' defaultValue={id} />
                                        <br/><br/>
                                        Votre commentaire : <br/>
                                        <textarea rows='4' cols='50'></textarea>
                                        <br/><br/>                                
                                        Votre note :<Stars/>&nbsp;{rate}
                                        <input type='hidden' defaultValue={rate}/>
                                        <br/>
                                        <center>
                                            <button className='btn-modal' type="submit">Critiker !</button>
                                        </center> 
                                        <br/> 
                                    </form>
                                </div>  
                        </div>
                    )}

                    {modalFavoris && (
                        <div className="modal">
                            <div className="overlay"></div>
                                <div className="modal-content text-black">                        
                                <button 
                                    onClick={toggleModalFavoris}
                                    className="btn-modal text-black float-right">
                                    [X]
                                </button>
                                    <br/>                            
                                    Vous avez bien ajouté <br/><b>"{title}"</b><br/> à vos favoris
                                    <br/><br/>                                    
                                    {/* <a href="#" onClick={() => navigate('/profile')}>Accéder à votre liste de favoris</a> */}
                                    {/* <br/>ou<br/> */}
                                    <a href="#" onClick={toggleListFavoris}>Afficher/masquer mes favoris</a>
                                    <br/>
                                    {listFavoris ?                                        
                                            <div>
                                            <br/>Mes favoris :<br/>
                                            {/* Début de traitement liste de favoris d'1 user */}
                                            {   
                                                favoris?.length && favoris.map(fav => {   
                                                        console.log('Liste de favoris'+fav.img); 
                                                        return(                                                            
                                                             <>                                                                
                                                                 - {fav.title} 
                                                                <br/>
                                                             </>
                                                        )
                                                    })                 
                                                }   
                                            {/* Fin de traitement liste de favoris d'1 user */}
                                            </div>                                                   
                                        : 
                                        <br/>
                                    }
                            </div>
                        </div>
                    )}

                    {modalConfirmationCritik&& (
                        <div className="modal">
                            <div className="overlay"></div>
                                <div className="modal-content text-black">                        
                                <button 
                                    onClick={toggleModalConfirmationCritik}
                                    className="btn-modal text-black float-right">
                                    [X]
                                </button>
                                    <br/>                            
                                    Vous&nbsp;avez&nbsp;bien&nbsp;ajouté&nbsp;une&nbsp;Critik/note&nbsp;pour&nbsp;le&nbsp;film<br/><b>"{title}"</b> 
                                    <br/><br/>                                    
                                    <a href="#" onClick={toggleListCritiks}>Afficher/masquer vos critiks</a>
                                    <br/><br/>
                                    {listCritiks ?                                        
                                            <div>
                                            Mes critiks :<br/>
                                            {/* Début de traitement liste de critiks d'1 user */}
                                            {critiks?.length && critiks.map(crt => {   
                                                    console.log('Liste de critiks'+crt.comment); 
                                                    return(                                                            
                                                        <>                                                                
                                                            - id: {crt.id} {crt.comment} 
                                                        <br/>
                                                        </>
                                                    )
                                                })                 
                                            }                                               {/* Fin de traitement liste de critiks d'1 user */}
                                            </div>                                                   
                                        : 
                                        <br/>
                                    }
                            </div>
                        </div>
                    )}

                </div>
                </center>
            </div>
        </>
    )
}
export default Card;