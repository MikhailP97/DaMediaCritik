/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    if(modal) { document.body.classList.add('active-modal')    }
    else {      document.body.classList.remove('active-modal') }

    const [modalCritik, setModalCritik] = useState(false);
    const toggleModalCritik = () => { setModalCritik(!modalCritik) }


    return (
        <>
        <a href='#' onClick={toggleModal} className="btn-modal text-white">
        Détails
        </a>
            {modal && (
                <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                    <h2>Hello Modal</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis exercitationem iure possimus quaerat hic nemo nihil modi architecto sed officia? Perspiciatis delectus ad architecto consequatur mollitia impedit quasi rem unde.</p>
                <button 
                onClick={toggleModal}
                className="btn-modal">
                FERMER
                </button>
                </div>
                </div>
            )}
        </>
    );
}