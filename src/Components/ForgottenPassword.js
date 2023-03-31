import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';

function ForgottenPassword() {

    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState('');
    const [confirmation, setConfirmation] = useState(false);

    const auth = getAuth();

    const navigate = useNavigate();

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Ce champ est obligatoire")
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "L'adresse mail n'est pas valide")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    const onSubmit = async (data) => {
        await sendPasswordResetEmail(auth, data.email)
        .then(() => {
                        setConfirmation(true)
                        setError(false)
                        setTimeout(() => {
                            navigate('/login')
                        }, 3000);
                    })
                    .catch((error) => {
                        console.log(`error: ${error.code}, ${error.message}`)
                        setError(true)
                        setErrorCode(error.code)
                        
                    });
            
    }

    let msg;
    if (errorCode === "auth/user-not-found") {
        msg = "Utilisateur introuvable :("
    }

    return (
        <>
            <div className=" mt-20 md:mt-0 relative flex py-5 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-xl sm:text-2xl font-bold">Connexion</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>

            <form className="bg-stone-800 shadow-md w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col pb-16 pt-16 m-auto rounded-xl" 
            onSubmit={handleSubmit(onSubmit)}
            >
                <div className=" flex flex-col m-auto ">
                    <label className="mb-3 text-white text-base sm:text-lg opacity-98">Identifiant (email) : </label>
                    <input className=" py-2 px-2 w-auto sm:w-80 rounded-md bg-stone-100" type="text" placeholder='Votre adresse mail...' 
                    {...register("email")} onChange={() => setError(false)}
                    />
                    {errors.email ? (<> <p className='mt-2 text-center text-red-800'>{errors.email?.message}</p> </>) : null}
                </div>
                {error ? <p className="fade-in text-red-800 text-center mt-5">{msg}</p> : <></>}
                <div className="flex justify-center">
                    <button type="submit" className="py-2 px-8 sm:px-8 shadow-md shadow-stone-300/50 bg-stone-900 mt-10 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50">Envoyer</button>
                </div>
                {confirmation ? <p className="fade-in text-lime-700 text-center mt-5">Le lien de réinitialisation a été envoyé à votre adresse mail</p> : <></>}
            </form>

            <div className="flex flex-row justify-center space-x-5 pb-60">
                <p onClick={() => navigate("/login")} className="cursor-pointer mt-10 text-amber-50 hover:underline text-sm">Retour page connexion</p>
            </div>
        </>
    )
}

export default ForgottenPassword