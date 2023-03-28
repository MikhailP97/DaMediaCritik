import React from 'react'
import {useNavigate } from 'react-router-dom';
import ConnexionForm from '../Components/ConnexionForm';


export default function Connexion() {

    const navigate = useNavigate(); 

    return (
        <>
            <ConnexionForm />
            <div className="flex flex-row justify-center space-x-5 pb-20 sm:pb-40">
                <p className="mt-10 text-amber-50 hover:underline text-sm cursor-pointer" onClick={() => navigate("/forgotten-pass")}>Mot de passe oublié ?</p>
                <p onClick={() => navigate("/inscription")} className="cursor-pointer mt-10 text-amber-50 hover:underline text-sm" >Vous n'êtes pas encore inscrit ?</p>
            </div>
        </>
    )
}