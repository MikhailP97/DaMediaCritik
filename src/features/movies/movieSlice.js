import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiKey } from '../../apiKey';
import { apiMovieDatabase } from '../../apiMovieDatabase';


// TMDB API calls
export const getAsyncMovies = createAsyncThunk(
    'movies/getAsyncMovies',
    async () => {
        const response = await axios.get(
            `${apiMovieDatabase}trending/movie/week?${apiKey}`
        );
        return response.data.results;

    });

export const getAsyncMoviesRelease = createAsyncThunk(
    'movies/getAsyncMoviesRelease',
    async (date) => {
        // const movieText = 'batman';
        const response = await axios.get(
            `${apiMovieDatabase}discover/movie?primary_release_date.gte=${date}&primary_release_date.lte=2022-12-31&${apiKey}`
        );
        return response.data.results;

    });

export const getAsyncMovieDetails = createAsyncThunk(
    'movies/getAsyncMovieDetails',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}/movie/${id}?${apiKey}&language=fr`
                );
        return response.data;
})

export const getAsyncMovieCredits = createAsyncThunk(
    'movies/getAsyncMovieCredits',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}/movie/${id}/credits?${apiKey}&language=fr`
                );
        return response.data;
})

export const getAsyncMovieVideos = createAsyncThunk(
    'movies/getAsyncMovieVideos',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}/movie/${id}/videos?${apiKey}&language=fr`
                );
        return response.data.results;
})

export const searchMovie = createAsyncThunk(
    'movies/searchMovie',
        async (name) => {
            const response = await axios.get(
                `${apiMovieDatabase}search/movie?${apiKey}&language=fr&query=${name}`
                );
        return response.data.results;
})

export const getAsyncMovieCategories = createAsyncThunk(
    'movies/getAsyncMoviePage',
        async (payload) => {
            const response = await axios.get(
                    `${apiMovieDatabase}discover/movie?&language=fr&primary_release_date.lte=${payload.currentDate}&with_genres=${payload.id}&api_key=7b6c4ae4c36a426a868e59064d239972`
                );
        return response.data.results.slice(0,10);
})

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        //TMDB states
        trendingMovies: {},
        movieDetails: {},
        releaseMovies: {},
        searchResults: {},
        movieCredits: {},
        moviesByCategory: {},
        moviesVideos: {},
        tab_genres: { 28: "Action", 12: "Aventure", 16: "Animation", 35: "Comédie", 80: "Crime", 99: "Documentaire", 18: "Drame", 10751: "Familial", 14: "Fantastique", 36: "Histoire", 27: "Horreur", 10402: "Musique", 9648: "Mystère", 10749: "Romance", 878: "Science-Fiction", 10770: "Téléfilm", 53: "Thriller", 10752: "Guerre", 37: "Western" },
    },
    extraReducers: {
        // [getAsyncMovies.pending]: () => {
        //     console.log("pending");
        // },
        //getAsyncMovies
        [getAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getAsyncMovies");
            return { ...state, trendingMovies: payload };
        },
        [getAsyncMovies.rejected]: () => {
            console.log("rejected getAsyncMovies");
        },
        // getAsyncMovieDetails
        [getAsyncMovieDetails.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getAsyncMovieDetails");
            return { ...state, movieDetails: payload };
        },
        [getAsyncMovieDetails.rejected]: () => {
            console.log("rejected getAsyncMovieDetails");
        },
        // getAsyncMovieCredits
        [getAsyncMovieCredits.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getAsyncMovieCredits");
            return { ...state, movieCredits: payload };
        },
        [getAsyncMovieCredits.rejected]: () => {
            console.log("rejected getAsyncMovieCredits");
        },
        // getAsyncMoviesRelease
        [getAsyncMoviesRelease.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getAsyncMoviesRelease");
            return { ...state, releaseMovies: payload };
        },
        [getAsyncMoviesRelease.rejected]: () => {
            console.log("rejected getAsyncMoviesRelease");
        },
        // searchMovie
        [searchMovie.fulfilled]: (state, { payload }) => {
            console.log("fullfilled searchMovie");
            return { ...state, searchResults: payload };
        },
        [searchMovie.rejected]: () => {
            console.log("rejected searchMovie");
        },
        // getAsyncMovieCategories
        [getAsyncMovieCategories.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getAsyncMovieCategoriesrelease");
            return { ...state, moviesByCategory: payload };
        },
        [getAsyncMovieCategories.rejected]: () => {
            console.log("rejected getAsyncMovieCategories");
        },
        // getAsyncMovieVideos
        [getAsyncMovieVideos.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getAsyncMovieVideos");
            return { ...state, moviesVideos: payload };
        },
        [getAsyncMovieVideos.rejected]: () => {
            console.log("rejected getAsyncMovieVideos");
        },
    }
})
export const trendings = (state) => state.movies.trendingMovies;
export const moviePage = (state) => state.movies.movieDetails;
export const movieCredits = (state) => state.movies.movieCredits;
export const releaseMovies = (state) => state.movies.releaseMovies;
export const searchResults = (state) => state.movies.searchResults;
export const tabGenres = (state) => state.movies.tab_genres;
export const moviesByCategory = (state) => state.movies.moviesByCategory;
export const moviesVideos = (state) => state.movies.moviesVideos;


export default movieSlice.reducer