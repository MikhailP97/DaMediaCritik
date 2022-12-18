
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Components/Card';
import '../App.css';

function Categories() {

    const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
    const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=7b6c4ae4c36a426a868e59064d239972";
    const movies_categories = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-09&primary_release_date.lte=2022-12-31&api_key=7b6c4ae4c36a426a868e59064d239972";

    const [moviesCategories, setmoviesCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    function getmoviesCategories() {
        axios.get(movies_categories).then(({data}) => {
          //console.log(data.results);
          setmoviesCategories(data.results.slice(0,10)) 
        })
    } 

      function getGenres() {
        axios.get(genres_url).then(({data}) => {
          //console.log(data.genres);
          setGenres(data.genres)
        })
    }

    useEffect(() => {
        getmoviesCategories();
        getGenres();
    }, []);

  return (
    <>
    <div className="text-white">
    <select id="genres" className='text-white bg-black' title="Choisir un genre...">
        <option key={-1}>Choississez un genre</option>
        <option key={0} disabled>---------------------------</option> 
        {
            genres?.length && genres.map(g => (
            <>                
                <option key={g.id} value={g.id}>{g.name} </option>                
            </>
            )
            )
        }
    </select>                   
    </div> 

    <div align='left' style={{margin:+20}}><h1 className='text-4xl text-white py-0 font-bold'>Films par catégories</h1></div>
    {/* <div className="bg-indigo-50">
        <section className="min-h-screen body-font text-gray-600 ">
            <div className="container mx-auto px-5 py-10">
                <div className="-m-4 flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                    <a href="#" className="relative block h-48 overflow-hidden rounded"/>
    */}
    <center>
    <div className="grid 2xl:grid-cols-8 xl:lg:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:lg:grid-cols-2 xm:lg_grid-cols-1 gap-10">
                    {
                        moviesCategories?.length && moviesCategories.map(mv => { return(
                        <>
                            <Card key={mv.id} 
                                  img={server+mv.poster_path} 
                                  id={mv.id} 
                                  // className="block h-full mx-auto object-cover object-center cursor-pointer"
                                  
                                  title={mv.title} 
                                  alt={mv.title}
                                  cat={mv.genre_ids}
                                  year={mv.release_date}
                                  style={{width: "250px", padding: "10px"}} 
                            />                            
                        </>
                        )
                        }) 
                    }   
                    </div>
                    </center>
                    {/* </div>
                </div>
            </div>
        </section>
    </div> */}

    <div className="bg-indigo-50">
        <section className="min-h-screen body-font text-gray-600 ">
            <div className="container mx-auto px-5 py-10">

                <div className="-m-4 flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a href="#" className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a href="#" className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <a className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src="https://cdn.pixabay.com/photo/2017/08/27/23/59/marvel-2688068_960_720.jpg" />
                        </a>
                        <div className="mt-4">
                            <h2 className="title-font text-lg font-medium text-gray-900">Titre film</h2>
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                            <p className="mt-1">2022</p>
                        </div>
                    </div>