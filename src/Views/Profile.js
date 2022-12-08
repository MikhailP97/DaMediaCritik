import React, { useState } from 'react'
import ProfileConnected from '../Components/ProfileConnected'
import ConnexionForm from '../Components/ConnexionForm'

function Profile() {

  // En attendant d'avoir un token d'authentification pour switcher entre les composants (Profil, Connexion, Inscription, Mot-de-passe oublié)

  const [connected, setConnectedState] = useState (false)
  

const connexion = () => {
setConnectedState(!connected)
}

  return (
    <>
    <button className="bg-white text-xl my-10 p-10 rounded-xl" onClick={connexion}>BOUTON DE CONNEXION FACTICE</button>


     { connected ? <ProfileConnected /> : <ConnexionForm />
  }

  

    

    </>

  )

}
export default Profile