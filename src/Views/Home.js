import React from 'react'
import Tendances from '../Components/Tendances.js'

function Home() {
  return (
    <div>
      <div id = "band" className="text-center z-0 text-5xl text-white py-20 font-bold bg-gradient-to-r from-stone-700 to-stone-900">
       <span className="opacity-90 text-amber-50">Slogan et texte de bienvenue<span className="text-amber-600"> Critik</span> !</span>
      </div>
    <Tendances/></div>
  )
}

export default Home
