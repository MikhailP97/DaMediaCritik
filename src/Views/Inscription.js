import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Inscription = () => {
    const navigate = useNavigate();

    const [passVisibility, setPassVisibility] = useState(false);

    const showHidePass = () => {
        setPassVisibility(!passVisibility)
    }

    const api_url = "http://localhost:3000/users/";
    const createUser = (user) => {
        axios.post(api_url, user)
         .then(console.log('Nouvel utilisateur crée'))
        .catch(err=>{
            console.error(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target; //tableau inputs
        const pseudo = form[0].value;
        const birthdate = form[1].value;
        const email = form[2].value;
        const password = form[3].value;
        const user = {pseudo, birthdate, email, password};
        console.log(user);

        //Requete HTTP en POST
        createUser(user);   
    }
    console.log(passVisibility);

    return (
        <>
            <div className=" mt-5 relative flex py-5 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">Inscription</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>

            <form className=" bg-stone-800 shadow-md w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col pb-5 pt-10 m-auto sm:rounded-xl" onSubmit={handleSubmit}>

                <div className=" flex flex-col m-auto ">
                    <label htmlFor="email" className=" mt-10 mb-5 text-white text-lg opacity-98">Pseudonyme <span className="text-amber-300">*</span> : </label>
                    <input className="py-2 px-2 w-80 rounded-md bg-stone-100" type="text" placeholder='Votre pseudo...' />
                </div>
                <div className=" flex flex-col m-auto ">
                    <label htmlFor="date" className=" mt-10 mb-5 text-white text-lg opacity-98">Date de naissance <span className="text-amber-300">*</span> : </label>
                    <input className="py-2 px-2 w-80 rounded-md bg-stone-100" type="text" placeholder='jj/mm/aaaa' />
                </div>
                <div className=" flex flex-col m-auto ">
                    <label htmlFor="date" className=" mt-10 mb-5 text-white text-lg opacity-98">E-mail <span className="text-amber-300">*</span> :</label>
                
                
                    <input className="py-2 px-2 w-80 rounded-md bg-stone-100" type="email" placeholder='xyz@mail.com' />
                </div>

                <div className=" flex flex-col m-auto ">
                    <label htmlFor="password" className=" sm:ml-9 mt-10 mb-5 text-white text-lg opacity-98">Mot de passe <span className="text-amber-300">*</span> :</label>
                
                <div className="flex flex-col sm:flex-row items-center">
                    <input className="py-2 px-2 w-80 sm:ml-9  rounded-md bg-stone-100" type={passVisibility ? "text" : "password"} placeholder="Votre mot de passe..." />
                    {!passVisibility
                        ?
                        <svg onClick={showHidePass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer invert mt-2 w-9 h-9 sm:w-7 sm:h-7 sm:mt-0  sm:ml-3 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>
                        :
                        <svg onClick={showHidePass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer invert mt-2 w-9 h-9 sm:w-7 sm:h-7 sm:mt-0  sm:ml-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                    </div>
                </div>

                <p className="text-sm sm:text-xs text-center text-amber-300 pt-5">(*) champs obligatoires</p>

                <div className="flex justify-center">
                    {/* En attendant le submit du formulaire */}
                    <button type="submit" className=" py-4 px-12 sm:py-1 sm:px-5 mb-14 shadow-md shadow-stone-300/50 bg-stone-900  mt-10 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">S'inscrire</button>
                </div>
                
            </form>
            
            <p onClick={() => navigate("/login")} className="text-base sm:text-sm text-center cursor-pointer my-10 text-amber-50 hover:underline" >Vous êtes déjà inscrit ?</p>
        </>
    )
}

export default Inscription