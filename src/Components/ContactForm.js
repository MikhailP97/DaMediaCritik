import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from '@emailjs/browser';
import { useState } from 'react';

export default function ContactForm() {

    const [confirmation, setConfirmation] = useState(false);

    const formSchema = Yup.object().shape({
        pseudo: Yup.string()
            .required("Ce champ est obligatoire")
            .min(2, "Le pseudo doit contenir au moins 2 caractères")
            .max(20, "Le pseudo doit contenir au maximum 20 caractères"),
        email: Yup.string()
            .required("Ce champ est obligatoire")
            .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "L'adresse mail n'est pas valide"),
        message: Yup.string()
            .required("Ce champ est obligatoire")
            .min(6, "Le message doit contenir au moins 6 caractères")
            .max(20, "Le message doit contenir au maximum 20 caractères")
    });

    //useForm call
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        emailjs
            .send("service_sbnonxb", "template_8oqehth", data, "user_kkiVCtLUFgzs0KA68U62O")
            .then(
                (result) => {
                // console.log(result.text);
                },
                (error) => {
                // console.log(error.text);
                }
            );
        setConfirmation(true)
        setTimeout(() => {
            setConfirmation(false)
        }, 2000);
        e.target.reset();
    }

    return (
        <>
            <div className="mt-20 md:mt-0 relative flex py-5 items-center">
                <div className="flex-grow border-t ml-5 sm:ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-lg sm:text-2xl font-bold">Nous contacter</span>
                <div className="flex-grow border-t mr-5 sm:mr-20 border-amber-50"></div>
            </div>
            <form className="bg-stone-800 shadow-md w-full w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col pb-5 sm:pb-12 sm:pt-10 m-auto mb-10 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col m-auto">
                    <label htmlFor="email" className="mt-10 mb-5 text-white text-base sm:text-lg opacity-98">Pseudonyme <span className="text-amber-300">*</span> : </label>
                    <input className="w-11/12 sm:w-full py-2 px-2 w-80 rounded-md bg-stone-100" placeholder='Votre pseudo...' {...register("pseudo")} />
                </div>
                {errors.pseudo ? (<> <p className='fade-in mt-2 text-center text-red-800'>{errors.pseudo?.message}</p> </>) : null}
                <div className="flex flex-col m-auto ">
                    <label htmlFor="date" className="mt-5 sm:mt-10 mb-5 text-white text-base sm:text-lg opacity-98">E-mail <span className="text-amber-300">*</span> :</label>
                    <input className="w-11/12 sm:w-full py-2 px-2 w-80 rounded-md bg-stone-100" placeholder='Votre email...' {...register("email")} />
                </div>
                {errors.email ? (<> <p className='fade-in mt-2 text-center text-red-800'>{errors.email?.message}</p> </>) : null}
                <div className="flex flex-col m-auto w-5/6 ">
                    <label htmlFor="date" className="mt-5 sm:mt-10 mb-5 text-white text-base sm:text-lg opacity-98">Message <span className="text-amber-300">*</span> :</label>
                    <textarea className="py-2 px-2 w-full h-48 rounded-md bg-stone-100" placeholder='Votre message...' {...register("message")} />
                </div>
                {errors.message ? (<> <p className='fade-in mt-2 text-center text-red-800'>{errors.message?.message}</p> </>) : null}
                <p className="text-sm sm:text-xs text-center text-amber-300 pt-5">(*) champs obligatoires</p>
                <div className="flex justify-center">
                    <button type="submit" className="py-2 px-8 sm:px-8 shadow-md shadow-stone-300/50 bg-stone-900 mt-5 sm:mt-10 rounded-md text-base sm:text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50">Envoyer</button>
                </div>
                {confirmation ? <p className="fade-in text-lime-700 text-center mt-5">Le message a bien été envoyé !</p> : <></>}
            </form>
        </>
    )
}
