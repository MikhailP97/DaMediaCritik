import React from 'react'
import Tendances from '../Components/Tendances.js'

function Home() {
  return (
    <div>
      <div id = "band" className="text-center text-5xl text-white py-20 font-bold bg-gradient-to-r from-stone-700 to-stone-900">
       <span className="opacity-90 text-amber-50">On vous donne le droit de <span className="text-amber-600"> Critik et de noter</span> !</span>
      </div>
    <Tendances/></div>
  )
}

export default Home
