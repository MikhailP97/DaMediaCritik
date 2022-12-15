/* eslint-disable jsx-a11y/anchor-is-valid */
import '../App.css';
import React, { useState } from "react";
import "./Modal/Modal.css";

const Card = ({id, img, alt, title, cat, resume, year, note, style}) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => { setModal(!modal) }

    const [modalCritik, setModalCritik] = useState(false);
    const toggleModalCritik = () => { setModalCritik(!modalCritik) }

    if(modal) { document.body.classList.add('active-modal') }
    else {      document.body.classList.remove('active-modal') }

    return (
        <>
            <div className="card text-white">
                <img className="opacity1" key={id} src={img} alt={alt} title={resume} cat={cat} note={note} style={style} />        
          
                <div className="mt-4">
                    <h2 className="title-font text-lg font-medium text-white">{title}</h2>
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-300">{cat}</h3>
                    <p className="text-white mt-1">{year}</p>
                    <a href="#" onClick={toggleModal}>Détails</a> | <a href="#" onClick={toggleModalCritik}> ⭐ Critiker !</a><br/>
            
            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                        <div className="modal-content text-black">
                        <button 
                            onClick={toggleModal}
                            className="btn-modal text-black float-right">
                            [X]
                        </button>
                            <br/>                            
                            <h1 className='title-font text-lg'>{title}</h1>
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
                            className="btn-modal text-black float-right">
                            [X]
                        </button>
                            <br/>                            
                            <center>
                            <h1 className='title-font text-lg'>{title}</h1>
                            <img src={img} width="200" alt={alt}/>
                            </center>
                            <br/>
                            Votre commentaire : <br/>
                            <textarea rows='4' cols='50'></textarea>
                            <br/><br/>
                            Votre note : <input type='text' size='1'/> /5
                            <br/><br/>
                            <center>
                            <button className='btn-modal'>Valider</button>
                            <br/> 
                            </center>                            
                    </div>
                </div>
            )}
                </div>
            </div>
        </>
    )
}
export default Card;