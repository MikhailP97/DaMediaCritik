import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    trendings,
    getAsyncMovies
  } from '../features/movies/movieSlice';

function Categories() {

    const movies = useSelector(trendings);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getAsyncMovies())

    }, [])

    console.log(movies)

    const navigate = useNavigate();

  return (
    <div className="bg-indigo-50">
        { movies.length ?
        <section className="min-h-screen body-font text-gray-600 ">
            <div className="container mx-auto px-5 py-10">
                <div className="-m-4 flex flex-wrap">
                
                    {movies.map((data, index) => (
                        <div className="w-full p-4 md:w-1/2 lg:w-1/4" data={data} key={index}>
                            <div className="relative block h-48 overflow-hidden rounded" onClick={() => navigate(`/page-film/${data.id}`)}>
                                <img alt="ecommerce" className="block h-full mx-auto object-cover object-center cursor-pointer" src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
                            </div>
                            <div className="mt-4">
                                <h2 className="title-font text-lg font-medium text-gray-900">{data.title}</h2>
                                <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">Catégorie</h3>
                                <p className="mt-1">2022</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>
        : <div class="flex justify-center items-center">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
}
    </div>
  )
}

export default Categories