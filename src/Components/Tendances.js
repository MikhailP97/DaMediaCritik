import React, { Component } from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Card from '../Components/Card';
import '../App.css';
const Tendances = () => {

      function sayHello() {
          alert('Helloo!');
      }


      const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
      const movies_url = "https://api.themoviedb.org/3/trending/movie/week?api_key=7b6c4ae4c36a426a868e59064d239972";
      //let tab_movies=[];
      // var affichage=0; //Pour correction bug : useEffect lancé 2 fois !!

      const [movies, setMovies] = useState([]);

      function getMovies() {
        axios.get(movies_url).then(({data}) => {
          console.log(data.results);
          setMovies(data.results.slice(0,6))
        })
      }

      // function getMoviesFetch() {
      //   //console.log('Dans le getMoviesFetch');
      //   if (affichage!==1)
      //   {
      //     fetch (movies_url).then((res) => res.json())
      //                       .then(res_movies => {
      //                         //console.log('Dans le Fetch');
      //                         tab_movies = res_movies['results'];
      //                         displayMovies();          
      //     })
      //     affichage++;
      //   }
      // }
      
      // function displayMovies() {
      //   let i=0;
      //   Object.entries(tab_movies).forEach(key => {
      //   //4 arrays : page, results, total_pages, total_results
      //       tab_movies.forEach(m => {
      //           i++;
      //           if (i<=6){
      //               //Espace entre les images
      //               const span =document.createElement("span");                   
      //               span.innerHTML = "&nbsp;&nbsp;";                
      //               document.querySelector('#tendances').appendChild(span);

      //               const img = document.createElement("img");
      //               const img_server = server + m.poster_path;
      //               img.src=img_server;
      //               img.style="width:250px";
      //               img.alt=m.title;
      //               img.title=m.title.toUpperCase();
      //               document.querySelector('#tendances').appendChild(img);
      //           }

      
      //       })
      //   })
      // }

      useEffect(() => {
        getMovies();
        //getMoviesFetch();
      }, []);

      return(
        <>
          <div align='left' style={{margin:+20}}><h1>Tendances</h1></div>
          <div className="card">
          {
              // movies?.length && movies.map(mv => <Card key={mv.id} title={mv.title} img={server+mv.poster_path} />) 
              movies?.length && movies.map(mv => <img src={server+mv.poster_path} id={mv.id} title={'Id : '+mv.id+'\n '+mv.title} alt={mv.title} style={{width: "250px", padding: "10px"}} onClick={sayHello} /> )
          }   
          </div>

          <br/>
          <br/>
        </>
      )
}
export default Tendances;