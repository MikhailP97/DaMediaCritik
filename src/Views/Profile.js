import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
const navigate = useNavigate();

  return (
    <>
    <div className="text-4xl text-amber-300">Bievenue </div>
    {/* En attendant de faire la vraie fonction pour se déconnecter (factice) */}
    <button onClick={()=> navigate('/login')} className="shadow-md shadow-stone-300/50 bg-stone-900 py-1 px-5 mt-10 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Se déconnecter</button>
    </>
  )
}
