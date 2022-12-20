import React, { useContext } from 'react'
import Tendances from '../Components/Tendances.js'
import Stars from '../Components/Stars.js'
import { UserContext } from '../UserContext.js'

function Home() {

  const user = useContext(UserContext);

  return (
    <div>
      <div id = "band" className="mt-20 md:mt-0 text-center text-5xl text-white py-20 font-bold bg-gradient-to-r from-stone-700 to-stone-900">
        <span className="opacity-90 text-amber-50">Bienvenue sur <span className="text-amber-600"> DaMovieCritik</span> !</span>
        <div className=" text-center text-3xl text-white pt-5">
          <span className="opacity-90 text-amber-50">Découvrez, trouvez ou<span className="text-amber-600"> Critik</span>ez un film !</span>
        </div>
        <p className='text-amber-600'>{user.name}</p>
      </div>
      
      <Tendances/>
    </div>
  )
}

export default Home
