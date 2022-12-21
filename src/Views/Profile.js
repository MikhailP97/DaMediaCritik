import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { currentUser } from '../features/users/userSlice';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function Profile() {

  const navigate = useNavigate();

  // const [user, setContext] = useContext(UserContext);

  // const userData = user !== null && user.user;
  // console.log(userData)

  const userInfosSelector = useSelector(currentUser);
  const userInfos = userInfosSelector.user
  // console.log(userInfos)
  
  
  const [favoris, setFavs] = useState([]);
    const [critiks, setCritiks] = useState([]);
    
    const getFavoris = async (favori) => {
      let userId = 1;
      const api_url = "http://localhost:3001/users/"+userId+"/favoris";
      await axios.get(api_url)
      .then(({data}) => {
          setFavs(data)    
      })
      .catch(err=>{
          console.error(err);
      });
  }

  const getCritiks = async (critik) => {
    let userId = 1;
    const api_url = "http://localhost:3001/users/"+userId+"/comments";
    await axios.get(api_url)
    .then(({data}) => {
        setCritiks(data)
    })
    .catch(err=>{
        console.error(err);
    });
  }

  useEffect(() => {
    getFavoris();
    getCritiks();
  }, []);


  return (
    <>
      <div>
        <div className=" flex flex-col lg:flex lg:flex-row lg:justify-center py-20 " >
          <img className="mt-10 m-auto lg:m-0" id="avatar" src="Images/sheep-7624863_1920.jpg" alt="mouton" />
          <div id="pseudo" className="text-center lg:ml-40 lg:pb-0 text-4xl text-amber-100  pt-24 pb-10  border-amber-200  border-b-8">Bievenue <span className="text-amber-500 font-bold">{userInfos !== undefined ? userInfos.pseudo : null}</span> </div>
        </div>
        {/* En attendant de faire la vraie fonction pour se déconnecter (factice) */}

        <div className="flex flex-col text-center lg:text-left text-amber-100 py-5 lg:ml-40">
          <p className="text-3xl underline">Infos</p>
          <br />
          <div className="flex flex-col space-y-1">
          <p className="text-lg">Pseudo :  <span className="text-amber-500">{userInfos !== undefined ? userInfos.pseudo : null}</span></p>
            <p className="text-lg">Date de naissance : <span className="text-amber-500">{userInfos !== undefined ? userInfos.birthdate : null}</span> </p>
            <p className="text-lg">Adresse mail : <span className="text-amber-500">{userInfos !== undefined ? userInfos.email : null}</span></p>
  
        </div>

        </div>
          <div className="m-auto w-1/4 mt-10 mb-10 border-b-4 border-amber-200"></div>


        <div className="flex flex-col text-amber-100 py-10 ">

          <p className=" text-3xl underline m-auto lg:ml-40 pb-5">Mes favoris</p>
          <br />
          <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 lg:mx-40 xl:grid-cols-4 mx-20 gap-20 ">

                {/* Début de traitement liste de favoris d'1 user */}
                {   
                    favoris?.length && favoris.map(fav => {   
                            console.log('Liste de favoris'+fav.img); 
                            return(                                                            
                                  <>        
                                    <div className="text-center">  
                                    <img className="rounded-md" id="favoris" src={fav.img} alt="affiche de film" />                                                      
                                      <p className="text-lg">{fav.title}</p>
                                    </div>
                                  </>
                            )
                    })                 
                }   
                {/* Fin de traitement liste de favoris d'1 user */}     

          </div>
        </div>

        <div className="m-auto w-1/4 mt-20 mb-10 border-b-4 border-amber-200"></div>


<div className="flex flex-col text-amber-100 py-10 ">

  <p className=" text-3xl underline m-auto lg:ml-40 pb-5">{/*<span className=" text-amber-500">*/}<span className="flex flex-col space-y">Mes critiks</span></p>
  <br />
  <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 lg:mx-40 xl:grid-cols-2 mx-20 gap-20 ">
                {/* Début de traitement liste de commentaires d'1 user */}
                {   
                    critiks?.length && critiks.map(crt => {   
                            return(                                                            
                                  <>        
                                    <div className="text-left">   
                                    <p className="text-lg text-orange">Ma note : {crt.note} / 5</p>                                                    
                                      <p className="text-lg text-white">{crt.comment}</p>
                                    </div>
                                  </>
                            )
                    })                 
                }   
                {/* Fin de traitement liste de commentaires d'1 user */}     
  </div>
</div>

<div className="m-auto w-1/4 mt-20 border-b-4 border-amber-200"></div>

        <div className="flex justify-center col-span-3 ">
          <button onClick={() => navigate('/login')} className="mb-20 shadow-md shadow-stone-300/50 bg-stone-900 py-3 lg:py-1 px-5 lg:px-5 mt-20 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Se déconnecter</button>
        </div>
      </div>
    </>
  )
}
