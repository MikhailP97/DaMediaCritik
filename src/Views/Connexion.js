import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import ConnexionForm from '../Components/ConnexionForm';
import ForgottenPassword from '../Components/ForgottenPassword';

export default function Connexion() {
   
    const navigate = useNavigate();
    const [forgottenPage, setForgottenPage] = useState (false)
    const changePage= () => {
        setForgottenPage(!forgottenPage)
    }

    return (

        <>
{!forgottenPage ? <ConnexionForm /> : <ForgottenPassword /> 
}
 
 <div className="flex flex-row justify-center space-x-5 pb-20">

                {!forgottenPage 
                ?<p className="mt-10 text-amber-50 hover:underline text-sm cursor-pointer" onClick={changePage}>Mot de passe oublié ?</p> 
                :<p className="mt-10 text-amber-50 hover:underline text-sm cursor-pointer" onClick={changePage}>Retour page connexion</p>}
                <p onClick={() => navigate("/inscription")} className="cursor-pointer mt-10 text-amber-50 hover:underline text-sm" >Vous n'êtes pas encore inscrit ?</p>
            </div>

        </>
    )
}