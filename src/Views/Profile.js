import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-3 gap-y-10">
        <div id="pseudo" className="text-center col-span-3 text-4xl text-amber-500  py-20  border-amber-200  border-b">Bievenue "Pseudonyme récupéré dynamiquement" </div>
        {/* En attendant de faire la vraie fonction pour se déconnecter (factice) */}

        <div className="flex flex-col justify-center text-amber-100 py-10 ml-40 ">
          <p className=" text-2xl underline">Favoris</p>
          <br />
          <div className="grid grid-cols-3 gap-10">
           <div>
              <img id="favoris" src="Images/sheep-7624863_1920.jpg" alt="affiche de film" /><p className="text-lg">Favoris 1 </p>
            </div>
           
            <div>
              <img id="favoris" src="Images/sheep-7624863_1920.jpg" alt="affiche de film" /><p className="text-lg">Favoris 1 </p>
            </div>
          
            <div>
              <img id="favoris" src="Images/sheep-7624863_1920.jpg" alt="affiche de film" /><p className="text-lg">Favoris 3 </p>
            </div>

            <div>
              <img id="favoris" src="Images/sheep-7624863_1920.jpg" alt="affiche de film" /><p className="text-lg">Favoris 3 </p>
            </div>

            <div>
              <img id="favoris" src="Images/sheep-7624863_1920.jpg" alt="affiche de film" /><p className="text-lg">Favoris 3 </p>
            </div>

            <div>
              <img id="favoris" src="Images/sheep-7624863_1920.jpg" alt="affiche de film" /><p className="text-lg">Favoris 3 </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center content-center py-10 " ><img id="avatar" src="Images/sheep-7624863_1920.jpg" alt="mouton" /></div>

        <div className="flex flex-col justify-center text-amber-100 py-10 ml-40">
          <p className="text-2xl underline">Infos</p>
          <br />
          <div className="flex flex-col space-y-1">
            <p className="text-lg">Date de naissance : DATE</p>
            <p className="text-lg">Adresse mail : EMAIL</p>
            <p className="text-lg">Adresse mail : EMAIL</p>

          </div>

        </div>

        <div className="flex justify-center col-span-3 border-amber-200 border-t">
          <button onClick={() => navigate('/login')} className="mb-20 shadow-md shadow-stone-300/50 bg-stone-900 py-1 px-5 mt-20 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Se déconnecter</button>
        </div>
      </div>
    </>
  )
}
