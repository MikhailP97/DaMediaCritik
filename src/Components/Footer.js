/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import image from '../Images/Logo_footer.png';

const Footer = () => {  

    return(
      <>
       <div className="App-footer"> 
          <div>  
            <table width="100%">
              <tbody>
                <tr>
                  <td rowSpan="3"><img src={image} alt='Logo'/></td> 
                  <td><a href="/Conditions"><span className="hover:text-orange-900">Conditions générales d'utilisation</span></a></td>
                  <td>Liens utiles :</td>
                </tr>
                <tr>
                  <td><a href="/mentions"><span className="hover:text-orange-900">Mentions légales</span></a></td>
                  <td><a href="https://www.themoviedb.org/?language=fr" target="_blank" className="hover:text-orange-900">The Movie Database (TMDB)</a></td>
                </tr>
                <tr>
                  <td><a href="/Politiques"><span className="hover:text-orange-900">Politique de confidentialité</span></a></td>
                  <td><a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank" rel="noreferrer" className="hover:text-orange-900">Documentation Api TMDB</a></td>
                </tr>
                <tr>
                  <td align="left" colSpan="3">&nbsp;&nbsp;© Copyright DaMovieCritik 2022-2023</td> 
                </tr>
              </tbody>
            </table>
              
          </div>
        </div>       
      </>
    )
  }
  export default Footer;