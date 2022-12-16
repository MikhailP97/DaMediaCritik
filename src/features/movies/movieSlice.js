import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiKey } from '../../apiKey';
import { apiMovieDatabase } from '../../apiMovieDatabase';

// const initialState = {
//   trendingMovies: [],
// }

export const getAsyncMovies = createAsyncThunk(
  'movies/getAsyncMovies',
      async () => {
          // const movieText = 'batman';
          const response = await axios.get(
            `${apiMovieDatabase}trending/movie/week?${apiKey}`
              );
      return response.data.results ;
  
});

export const getAsyncMoviesRelease = createAsyncThunk(
  'movies/getAsyncMoviesRelease',
      async () => {
          // const movieText = 'batman';
          const response = await axios.get(
            `${apiMovieDatabase}discover/movie?primary_release_date.gte=2022-12-09&primary_release_date.lte=2022-12-31&${apiKey}`
              );
      return response.data.results ;
  
});

export const getAsyncMoviePage = createAsyncThunk(
    'movies/getAsyncMoviePage',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}/movie/${id}?${apiKey}&language=en-US`
                );
        return response.data;
})

export const searchMovie = createAsyncThunk(
    'movies/searchMovie',
        async (name) => {
            const response = await axios.get(
                `${apiMovieDatabase}search/movie?${apiKey}&language=en-US&query=${name}`
                );
        return response.data.results;
})

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    trendingMovies: {},
    moviePage: {},
    releaseMovies: {},
    searchResults: {},
  },
  extraReducers: {
    [getAsyncMovies.pending]: () => {
        console.log("pending");
    },
    [getAsyncMovies.fulfilled]: (state, {payload}) => {
        console.log("fullfilled");
        return {...state, trendingMovies: payload};
    },
    [getAsyncMovies.rejected]: () => {
        console.log("rejected");
    },
    [getAsyncMoviePage.fulfilled]: (state, {payload}) => {
        console.log("fullfilled");
        return {...state, moviePage: payload};
    },
    [getAsyncMoviesRelease.fulfilled]: (state, {payload}) => {
        console.log("fullfilled release");
        return {...state, releaseMovies: payload};
    },
    [searchMovie.fulfilled]: (state, {payload}) => {
        console.log("fullfilled release");
        return {...state, searchResults: payload};
    },
  }
})

// export const { getTrendingMovies, getTodo, incrementByAmount } = movieSlice.actions

export const trendings = (state) => state.movies.trendingMovies;
export const moviePage = (state) => state.movies.moviePage;
export const releaseMovies = (state) => state.movies.releaseMovies;
export const searchResults = (state) => state.movies.searchResults;

export default movieSlice.reducer