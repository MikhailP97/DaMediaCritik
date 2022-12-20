import React from 'react'
import { useNavigate } from 'react-router-dom';
import image from '../Images/Logo_footer.png';

export default function NewFooter() {

    const navigate = useNavigate();

    return (
        <>
            <div className="mt-10 bg-black text-amber-100 relative bottom-0 w-full md:grid md:grid-cols-3">

                <div className='md:ml-5 py-8 text-center md:text-left '>
                    <img className="rounded-2xl " src={image} alt='Logo' />
                    <p className='mt-5'>© Copyright DaMovieCritik 2022-2023</p>

                </div>

                <div className="text-center py-8">
                    <p onClick={() => navigate("/conditions")}><span className="hover:text-amber-500 cursor-pointer">Conditions générales d'utilisation</span></p>
                    <p className="py-2" onClick={() => navigate("/mentions")}><span className="hover:text-amber-500 cursor-pointer">Mentions légales</span></p>
                    <p onClick={() => navigate("/politiques")} className="hover:text-amber-500 cursor-pointer">Politique de confidentialité</p>
                </div>

                <div className="text-center md:text-right py-8 md:pr-8">
                    <p><span className="font-semibold">Liens utiles :</span></p>
                    <p className="pt-2"><a href="https://www.themoviedb.org/?language=fr" target="_blank" className="hover:text-amber-500">The Movie Database (TMDB)</a></p>
                    <p className="pt-1"><a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank" rel="noreferrer"><span className="hover:text-amber-500">Api de TMDB</span></a></p>
                </div>

            </div>
        </>
    )
}
