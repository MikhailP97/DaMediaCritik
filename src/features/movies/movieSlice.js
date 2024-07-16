import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiKey } from '../../apiKey';
import { apiMovieDatabase } from '../../apiMovieDatabase';

// TMDB API calls
export const getAsyncMovies = createAsyncThunk(
    'movies/getAsyncMovies',
    async () => {
        const response = await axios.get(
            `${apiMovieDatabase}trending/movie/week?language=fr&${apiKey}&page=1`
        );
        return response.data.results.slice(0,6);
    });

export const getAsyncUpcomingMovies = createAsyncThunk(
    'movies/getAsyncUpcomingMovies',
        async (name) => {
            const response = await axios.get(
                `${apiMovieDatabase}movie/upcoming?${apiKey}&language=fr-FR&page=1&region=FR`
                );
        return response.data.results.slice(0,6);
})

export const getAsyncMoviesRelease = createAsyncThunk(
    'movies/getAsyncMoviesRelease',
    async (date) => {
        const response = await axios.get(
            `${apiMovieDatabase}discover/movie?primary_release_date.gte=${date}&primary_release_date.lte=${date}&${apiKey}`
        );
        return response.data.results;
    });

export const getAsyncMovieCategories = createAsyncThunk(
    'movies/getAsyncMoviePage',
        async (payload) => {
            const response = await axios.get(
                    `${apiMovieDatabase}discover/movie?&language=fr&primary_release_date.lte=${payload.currentDate}&with_genres=${payload.id}&api_key=7b6c4ae4c36a426a868e59064d239972&page=${payload.page}`
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

export const getAsyncMovieDetails = createAsyncThunk(
    'movies/getAsyncMovieDetails',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}movie/${id}?${apiKey}&language=fr`
                );
        return response.data;
})

export const getAsyncMovieCredits = createAsyncThunk(
    'movies/getAsyncMovieCredits',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}movie/${id}/credits?${apiKey}&language=fr`
                );
        return response.data;
})

export const getAsyncMovieVideos = createAsyncThunk(
    'movies/getAsyncMovieVideos',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}movie/${id}/videos?${apiKey}&language=fr`
                );
        return response.data.results;
})

export const getAsyncAllMovieVideos = createAsyncThunk(
    'movies/getAsyncAllMovieVideos',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}movie/${id}/videos?${apiKey}&page=1`
                );
        return response.data.results;
})

export const getAsyncAllMovieProviders = createAsyncThunk(
    'movies/getAsyncAllMovieProviders',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}movie/${id}/watch/providers?${apiKey}&language=fr`
                );
        return response.data.results;
})

export const movieSlice = createSlice({
    name: 'movies',
    initialState
    : {
        //TMDB states
        trendingMovies: {},
        upcomingMovies: {},
        releaseMovies: {},
        moviesByCategory: {},
        searchResults: {},
        movieDetails: {},
        movieCredits: {},
        moviesVideos: {},
        allMoviesVideos: {},
        movieProviders: {},
        tab_genres: { 28: "Action", 12: "Aventure", 16: "Animation", 35: "Comédie", 80: "Crime", 99: "Documentaire", 18: "Drame", 10751: "Familial", 14: "Fantastique", 36: "Histoire", 27: "Horreur", 10402: "Musique", 9648: "Mystère", 10749: "Romance", 878: "Science-Fiction", 10770: "Téléfilm", 53: "Thriller", 10752: "Guerre", 37: "Western" },
    },
    extraReducers: builder => {

        builder

        //getAsyncMovies
        .addCase(getAsyncMovies.fulfilled, (state, action) => {
            state.trendingMovies = action.payload
        })
        .addCase(getAsyncMovies.rejected, () => {
            console.log("rejected getAsyncMovies")
        })
        //getAsyncUpcomingMovies
        .addCase(getAsyncUpcomingMovies.fulfilled, (state, action) => {
            state.upcomingMovies = action.payload
        })
        .addCase(getAsyncUpcomingMovies.rejected, () => {
            console.log("rejected getAsyncUpcomingMovies")
        })
        //getAsyncMoviesRelease
        .addCase(getAsyncMoviesRelease.fulfilled, (state, action) => {
            state.releaseMovies = action.payload
        })
        .addCase(getAsyncMoviesRelease.rejected, () => {
            console.log("rejected getAsyncMoviesRelease")
        })
        //getAsyncMovieCategories
        .addCase(getAsyncMovieCategories.fulfilled, (state, action) => {
            state.moviesByCategory = action.payload
        })
        .addCase(getAsyncMovieCategories.rejected, () => {
            console.log("rejected getAsyncMovieCategories")
        })
        //searchMovie
        .addCase(searchMovie.fulfilled, (state, action) => {
            state.searchResults = action.payload
        })
        .addCase(searchMovie.rejected, () => {
            console.log("rejected searchMovie")
        })
        //getAsyncMovieDetails
        .addCase(getAsyncMovieDetails.fulfilled, (state, action) => {
            state.movieDetails = action.payload
        })
        .addCase(getAsyncMovieDetails.rejected, () => {
            console.log("rejected getAsyncMovieDetails")
        })
        //getAsyncMovieCredits
        .addCase(getAsyncMovieCredits.fulfilled, (state, action) => {
            state.movieCredits = action.payload
        })
        .addCase(getAsyncMovieCredits.rejected, () => {
            console.log("rejected getAsyncMovieCredits")
        })
        //getAsyncMovieVideos
        .addCase(getAsyncMovieVideos.fulfilled, (state, action) => {
            state.moviesVideos = action.payload
        })
        .addCase(getAsyncMovieVideos.rejected, () => {
            console.log("rejected getAsyncMovieVideos")
        })
        //getAsyncAllMovieVideos
        .addCase(getAsyncAllMovieVideos.fulfilled, (state, action) => {
            state.allMoviesVideos = action.payload
        })
        .addCase(getAsyncAllMovieVideos.rejected, () => {
            console.log("rejected getAsyncAllMovieVideos")
        })
        //getAsyncAllMovieProviders
        .addCase(getAsyncAllMovieProviders.fulfilled, (state, action) => {
            state.movieProviders = action.payload
        })
        .addCase(getAsyncAllMovieProviders.rejected, () => {
            console.log("rejected getAsyncAllMovieProviders")
        })
    }
})

export const trendings = state => state.movies.trendingMovies;
export const moviePage = (state) => state.movies.movieDetails;
export const movieCredits = (state) => state.movies.movieCredits;
export const releaseMovies = (state) => state.movies.releaseMovies;
export const searchResults = (state) => state.movies.searchResults;
export const tabGenres = (state) => state.movies.tab_genres;
export const moviesByCategory = (state) => state.movies.moviesByCategory;
export const moviesVideos = (state) => state.movies.moviesVideos;
export const allMoviesVideos = (state) => state.movies.allMoviesVideos;
export const movieAllProviders = (state) => state.movies.movieProviders;
export const upcomingMovies = (state) => state.movies.upcomingMovies;


export default movieSlice.reducer