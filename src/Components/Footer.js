import React, { Component } from 'react'
import image from '../Images/Logo_footer.png';

export default class Footer extends Component {
    render() {
      return(
        <div class="App-footer"> 
          <div>  
            <table width="100%">
              <tbody>
                <tr>
                  <td><img src={image} alt='Logo' style={{ marginTop:"20px" }}/></td> 
                  <td><a href="http://google.fr">Conditions générales d'utilisation</a>  </td>
                  <td><a href="http://google.fr">Politique de confidentialité</a></td>
                </tr>
              </tbody>
            </table>
              <span>© Copyright DaMovieFilm 2022</span>
          </div>
        </div>        
      )
    }
  }