import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/index';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const Inscription = () => {

    const navigate = useNavigate();

    const [passVisibility, setPassVisibility] = useState(false);

    const [confirmation, setConfirmation] = useState(false);
    const [avatarList, setAvatarList] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState('Images/avatar_vide.jpg')

    const showHidePass = () => {
        setPassVisibility(!passVisibility)
    }

    const toggleAvatar = () => {
        setAvatarList(!avatarList)
    }

    const imgTab = [
        {
            img: 'Images/yoda2.jpg',
            id:1
        },
        {
            img: 'Images/darth-vader.jpg',
            id:2
        },
        {
            img: 'Images/terminator2.jpg',
            id:3
        },
        {
            img: 'Images/batman.jpg',
            id:4
        },
        {
            img: 'Images/chigurh.jpg',
            id:5
        },
        {
            img: 'Images/corleone.jpg',
            id:6
        },
        {
            img: 'Images/doc.jpg',
            id:7
        },
        {
            img: 'Images/eastwood.jpg',
            id:8
        },
        {
            img: 'Images/gizmo.jpg',
            id:9
        },
        {
            img: 'Images/mask.jpg',
            id:10
        },
        {
            img: 'Images/mclane.jpg',
            id:11
        },
        {
            img: 'Images/morpheus.jpg',
            id:12
        },
        {
            img: 'Images/Nicholson.jpg',
            id:13
        },
        {
            img: 'Images/voldemort.jpg',
            id:14
        },
        {
            img: 'Images/neo.jpg',
            id:15
        }
    ]

    //Verification des erreurs
    const formSchema = Yup.object().shape({
        pseudo: Yup.string()
            .required("Ce champ est obligatoire")
            .min(2, "Le pseudo doit contenir au moins 2 caractères")
            .max(20, "Le pseudo doit contenir au maximum 20 caractères"),
        email: Yup.string()
            .required("Ce champ est obligatoire")
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "L'adresse mail n'est pas valide"),
        password: Yup.string()
            .required("Ce champ est obligatoire")
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .max(20, "Le mot de passe doit contenir au maximum 20 caractères"),
        cpassword: Yup.string()
            .required("Ce champ est obligatoire")
            .oneOf([Yup.ref("password")], "Les mots de passe ne sont pas identiques"),
        avatarPreview: Yup.string(),
        // radio: Yup.string().required(),
    });

    //useForm call
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    //inscription mail
    const onSubmit = async (data) => {
        const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
        await updateProfile(user, {
            displayName: data.pseudo,
            photoURL: data.avatarPreview
        })
            .then(() => {
                setConfirmation(true)
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            })
            .catch(() => console.log("signup not work"))
    }

    //connexion google
    const provider = new GoogleAuthProvider();

    const googleSignIn = async () => {
        await signInWithPopup(auth, provider)
            .then(() => {
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }).catch((error) => {

            });
    }

    return (
        <>
            <div className=" mt-20 md:mt-0 relative flex py-5 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-xl sm:text-2xl font-bold">Inscription</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>
            <div className="flex justify-center">
                <button type='button' class='flex w-48 sm:w-96 mx-1 break-inside bg-white hover:bg-stone-400 text-black border-2 border-black rounded-3xl px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white' onClick={googleSignIn}>
                    <div class='m-auto'>
                        <div class='flex items-center justify-start flex-1 space-x-4'>
                            <svg width='25' height='25' viewBox='0 0 24 24'>
                                <path fill='currentColor'
                                    d='M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z' />
                            </svg>
                            <span class='font-medium mb-[-2px] text-xs sm:text-lg'>Avec votre compte Google</span>
                        </div>
                    </div>
                </button>
            </div>
            <p className="flex justify-center py-5 text-lg sm:text-xl text-amber-50">Ou</p>
            <form encType="multipart/form-data" className="bg-stone-800 shadow-md w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col sm:py-16 py-8 m-auto rounded-xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col m-auto">
                    <label className="mb-5 text-white text-base sm:text-lg opacity-98">Pseudonyme <span className="text-amber-300">*</span> : </label>
                    <input className="py-2 px-2 w-auto sm:w-80 rounded-md bg-stone-100" type="text" placeholder='Votre pseudo...' {...register("pseudo")} />
                </div>
                {errors.pseudo ? (<> <p className='mt-2 text-center text-red-800'>{errors.pseudo?.message}</p> </>) : null}
                <div className=" flex flex-col m-auto ">
                    <label className=" mt-10 mb-5 text-white text-base sm:text-lg opacity-98">E-mail <span className="text-amber-300">*</span> :</label>
                    <input className="py-2 px-2 w-auto sm:w-80 rounded-md bg-stone-100" placeholder='xyz@mail.com' {...register("email")} />
                </div>
                {errors.email ? (<> <p className='mt-2 text-center text-red-800'>{errors.email?.message}</p> </>) : null}
                <div className=" flex flex-col m-auto">
                    <div className=" m-auto mt-12  text-white text-base sm:text-lg opacity-98">Choisissez votre avatar :
                        <img onClick={toggleAvatar} className="drop-shadow-lg ml-6 cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 " id="avatarPreview" src={avatarPreview} alt="avatar" />
                    </div>
                    {avatarList ?
                        <div className="mt-2 grid grid-cols-3 grid-row-2 m-auto gap-y-2 gap-x-4">
                            {imgTab.map((i) =>
                                <div key={i.id}>
                                    <label htmlFor={i.img}>
                                        <img className="mt-2 drop-shadow-lg cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110" onClick={() => setAvatarPreview(i.img)} id="avatarPreview" src={i.img} alt="avatar" />
                                    </label>
                                    <input className="peer hidden" name="someName" key={i.id} id={i.img} type="radio" {...register("avatarPreview")} value={i.img} />
                                </div>
                            )}
                        </div>
                        : <></>
                    }
                </div>
                <div className="flex flex-col m-auto">
                    <label htmlFor="password" className=" sm:ml-10 mt-10 mb-5 text-white text-base sm:text-lg opacity-98">Mot de passe <span className="text-amber-300">*</span> :</label>
                    <div className="flex flex-col sm:flex-row items-center">
                        <input className="py-2 px-2 w-auto sm:w-80 sm:ml-10  rounded-md bg-stone-100" type={passVisibility ? "text" : "password"} placeholder="Votre mot de passe..." {...register("password")} />
                        {!passVisibility
                            ?
                            <svg onClick={showHidePass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer hidden sm:block hover:text-blue-600 invert mt-2 w-9 h-9 sm:w-7 sm:h-7 sm:mt-0  sm:ml-3 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>
                            :
                            <svg onClick={showHidePass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer hidden sm:block hover:text-blue-600 invert mt-2 w-9 h-9 sm:w-7 sm:h-7 sm:mt-0  sm:ml-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        }
                    </div>
                </div>
                {errors.password ? (<> <p className='mt-2 text-center text-red-800'>{errors.password?.message}</p> </>) : null}
                <div className=" flex flex-col m-auto ">
                    <label htmlFor="password" className="  mt-10 mb-5 text-white text-base sm:text-lg opacity-98">Confirmez votre mot de passe <span className="text-amber-300">*</span> :</label>
                    <div className="flex flex-col sm:flex-row items-center">
                        <input className="py-2 px-2 w-auto sm:w-80  rounded-md bg-stone-100" type={passVisibility ? "text" : "password"} placeholder="Votre mot de passe..." {...register("cpassword")} />
                    </div>
                </div>
                {errors.cpassword ? (<> <p className='mt-2 text-center text-red-800'>{errors.cpassword?.message}</p> </>) : null}
                <p className="text-sm sm:text-xs text-center text-amber-300 pt-5">(*) champs obligatoires</p>
                <div className="flex justify-center">
                    {/* En attendant le submit du formulaire */}
                    <button type="submit" className="py-2 px-8 sm:px-8 shadow-md shadow-stone-300/50 bg-stone-900  mt-10 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">S'inscrire</button>
                </div>
                {confirmation ? <p className="fade-in text-green-600 text-center mt-5">Inscription réussie !</p> : <></>}
            </form>
            <p onClick={() => navigate("/login")} className="text-base sm:text-sm text-center cursor-pointer my-10 text-amber-50 hover:underline" >Vous êtes déjà inscrit ?</p>
        </>
    )
}

export default Inscription