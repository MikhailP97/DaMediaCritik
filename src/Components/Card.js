import '../App.css';
import React, { useState } from "react";
import "./Modal/Modal.css";
import "../index.css";
import axios from 'axios';
import Stars from './Stars';

const Card = ({id, img, alt, title, cat, resume, year, note, style, rate}) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => { setModal(!modal) }

    const [modalCritik, setModalCritik] = useState(false);
    const toggleModalCritik = () => { setModalCritik(!modalCritik) }

    const [modalFavoris, setModalFavoris] = useState(false);
    const toggleModalFavoris = () => { setModalFavoris(!modalFavoris) }

    // //const [favoris, setFavoris] = useState(false);
    // function mettreEnFavoris(e) {
    //     e.preventDefault(); //La page n'est pas chargée
    //     console.log('Vous avez mis en favoris !'+id);
    //     //Récupérer l'id de l'user
        
    //     //Récupérer l'id du film

    //     //Requete http POST
    //     console.log(id);
    // }

    if(modal) { document.body.classList.add('active-modal') }
    else {      document.body.classList.remove('active-modal') }

    const api_url = "http://localhost:3000/users/1/comments";
    const createCritik = async (critik) => {
        await axios.post(api_url+'?filmId='+critik.film+'&commentaire='+critik.comment+'&note='+critik.note, critik)
         .then(console.log('Nouvelle critique de l utilisateur n°... crée'))
        .catch(err=>{
            console.error(err);
        });
        console.log('Commentaire crée');
    }

    const handleSubmit = (e) => {
        console.log('Vous avez validé la modale !');
        e.preventDefault(); //La page n'est pas chargée
        const form = e.target; //tableau inputs
        const filmId = form[0].value;
        const comment = form[1].value;
        const note = form[2].value;
        const critik = {filmId, comment, note};
        console.log(critik);

        //Requete HTTP en POST
        createCritik(critik);   
    }

    

    return (
        <>
            <div className="card text-white text-center">
                <img className="opacity1" key={id} src={img} alt={alt} title={resume} cat={cat} note={note} style={style} />        
          
                <div className="mt-4">
                    <h2 className="title-font text-lg font-medium text-white">{title}</h2>
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-300">{cat}</h3>
                    <p className="text-white mt-1">{year}</p>
                    <a href="#" onClick={toggleModal}>Détails</a> | <a href="#" onClick={toggleModalCritik}> ⭐Critiker !</a>&nbsp;<a href="#" onClick={toggleModalFavoris}>❤️Favoris</a><br/>
            
            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                        <div className="modal-content">                        
                        <button 
                            onClick={toggleModal}
                            className="btn-modal text-black float-right">
                            [X]
                        </button>
                            <br/>                            
                            <h1 className=' title-font text-lg'>{title}</h1>
                            Sortie : {year}
                            <br/>
                            Genre : {cat} 
                            <br/>
                            Note : {note}
                            <br/>
                            <br/>
                            <center>
                            <img src={img} width="200" alt={alt}/>
                            </center>
                            <br/>
                            <p>{resume}</p>
                            <br/>
                    </div>
                </div>
            )}

            
            {modalCritik && (
                <div className="modal">
                    <div className="overlay"></div>
                        <div className="modal-content text-black">
                        
                            <button 
                                onClick={toggleModalCritik}
                                className="btn-modal  float-right">
                                [X]
                            </button>
                            <br/>                            
                            
                            <form onSubmit={handleSubmit}>  
                                <center>
                                    <h1 className='title bg-amber-500 py-5 px-5 title-font text-xl font-bold rounded-xl mt-5'>{title}</h1>
                                    <br/>
                                    <img src={img} width="200" alt={alt}/>
                                </center>
                                <br/>
                                FilmId : {id}<input type='hidden' size='6' defaultValue={id} />
                                <br/><br/>
                                Votre commentaire : <br/>
                                <textarea className="modalForm rounded-xl mt-2 p-3"rows='4' cols='50'></textarea>
                                <br/><br/>                                
                                Votre note :<Stars/> {rate}
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

            {/* {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                        <div className="modal-content text-black">                        
                        <button 
                            onClick={toggleModalFavoris}
                            className="btn-modal text-black float-right">
                            [X]
                        </button>
                            <br/>                            
                            Vous avez bien ajouté le film n° ... à votre liste de favoris
                            <br/>
                    </div>
                </div>
            )} */}

                </div>
            </div>
        </>
    )
}
export default Card;