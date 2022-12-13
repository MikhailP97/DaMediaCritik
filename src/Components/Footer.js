/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import image from '../Images/Logo_footer.png';

const Footer = () => {  

    return(
      <>
       <div className="App-footer"> 
          <div>  
            <table width="100%" className="">
              <tbody>
                <tr>
                  <td rowspan="3"><img src={image} alt='Logo'/></td> 
                  <td><a href="/Conditions"><span className="">Conditions générales d'utilisation</span></a></td>
                  <td><a href="/Politiques"><span className="">Liens utiles :</span></a></td>
                </tr>
                <tr>
                  <td><a href="/mentions"><span className="">Mentions légales</span></a></td>
                  <td><a href="https://www.themoviedb.org/?language=fr" target="_blank" className="hover:text-orange-100">The Movie Database (TMDB)</a></td>
                </tr>
                <tr>
                  <td><a href="/Politiques"><span className={{}}>Politique de confidentialité</span></a></td>
                  <td><a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank" rel="noreferrer"><span className=""></span>Api de TMDB</a></td>
                </tr>
                <tr>
                  <td><span>&nbsp;&nbsp;© Copyright DaMovieCritik 2022-2023</span></td> 
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
              
          </div>
        </div>       
      </>
    )
  }
  export default Footer;