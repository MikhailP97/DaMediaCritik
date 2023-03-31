import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ConnexionForm() {

    const navigate = useNavigate();

    const [passVisibility, setPassVisibility] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState('');

    const showHidePass = () => {
        setPassVisibility(!passVisibility)
    }

    //Verification des erreurs
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Ce champ est obligatoire")
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "L'adresse mail n'est pas valide"),
        password: Yup.string()
            .required("Ce champ est obligatoire")
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .max(20, "Le mot de passe doit contenir au maximum 20 caractères")
    });

    //useForm call
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    //connexion
    const auth = getAuth();

    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
                        setConfirmation(true)
                        setError(false)
                        setTimeout(() => {
                            navigate('/')
                        }, 2000);
                    })
                    .catch((error) => {
                        console.log(`error: ${error.code}, ${error.message}`)
                        setError(true)
                        setErrorCode(error.code)
                    });
            
    }

    const provider = new GoogleAuthProvider();

    const googleSignIn = async () => {
        await signInWithPopup(auth, provider)
        .then(() => {
            setTimeout(() => {
                navigate('/')
            }, 2000);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });
    }

    let msg;
    if (errorCode === "auth/wrong-password") {
        msg = "Le mot de passe est incorect :("
    } else if(errorCode === "auth/user-not-found") {
        msg = "Utilisateur introuvable :("
    }

    return (
        <>
            <div className=" mt-20 md:mt-0 relative flex pt-5 pb-2 sm:py-5 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                    <span className="flex-shrink my-10 mx-4 text-amber-50 text-xl sm:text-2xl font-bold">Connexion</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>
            <div className="flex justify-center">
                <button type='button' className='flex w-48 sm:w-96 mx-1 break-inside bg-white hover:bg-stone-400 text-black border-2 border-black rounded-3xl px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white' onClick={googleSignIn}>
                    <div className='m-auto'>
                        <div className='flex items-center justify-start flex-1 space-x-4'>
                            <svg width='25' height='25' viewBox='0 0 24 24'>
                                <path fill='currentColor'
                                    d='M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z' />
                            </svg>
                            <span className='font-medium mb-[-2px] text-xs sm:text-lg'>Avec votre compte Google</span>
                        </div>
                    </div>
                </button>
            </div>
            <p className="flex justify-center py-2 sm:py-5 text-lg sm:text-xl text-amber-50">Ou</p>
            <form className="bg-stone-800 shadow-md w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col sm:py-16 py-8 m-auto rounded-xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col m-auto">
                    <label className="mb-3 text-white text-base sm:text-lg opacity-98">Identifiant (email) : </label>
                    <input className="py-2 px-2 w-auto sm:w-80 rounded-md bg-stone-100" placeholder='Votre adresse mail...' {...register("email")} />
                </div>
                {errors.email ? (<> <p className='fade-in mt-2 text-center text-red-800'>{errors.email?.message}</p> </>) : null}
                <div className="flex flex-col m-auto">
                    <label htmlFor="password" className="sm:ml-10 mt-8 sm:mt-10 mb-3 text-white text-base sm:text-lg opacity-98">Mot de passe : </label>
                    <div className="flex flex-row items-center">
                        <input className="w-auto py-2 px-2 sm:w-80 sm:ml-10 rounded-md bg-stone-100" type={passVisibility ? "text" : "password"} placeholder="Votre mot de passe..." {...register("password")} />
                        {!passVisibility
                            ?
                            <svg onClick={showHidePass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer hidden sm:block invert mt-2 w-9 h-9 sm:mt-0 w-6 sm:w-7 h-6 sm:h-7 ml-1 sm:ml-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>
                            :
                            <svg onClick={showHidePass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer hidden sm:block invert mt-2 w-9 h-9 sm:mt-0 sm:w-7 sm:h-7 ml-1 sm:ml-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        }
                    </div>
                </div>
                    {errors.password ? (<> <p className='fade-in mt-2 text-center text-red-800'>{errors.password?.message}</p> </>) : null}
                    {error ? <p className="fade-in text-red-800 text-center mt-5">{msg}</p> : <></>}
                <div className="flex justify-center">
                    {/* En attendant le submit du formulaire */}
                    <button type="submit" className="py-2 px-8 sm:px-8 shadow-md shadow-stone-300/50 bg-stone-900 mt-10 sm:mt-20 rounded-md text-base sm:text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50">Se connecter</button>
                </div>
                {confirmation ? <p className="fade-in text-lime-700 text-center mt-5">Connexion réussie !</p> : <></>}
            </form>
        </>
    )
}