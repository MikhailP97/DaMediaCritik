import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiKey } from '../../apiKey';
import { apiMovieDatabase } from '../../apiMovieDatabase';

// const initialState = {
//   trendingMovies: [],
// }

export const getAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
      async () => {
          // const movieText = 'batman';
          const response = await axios.get(
            `${apiMovieDatabase}trending/movie/week?${apiKey}`
              );
      return response.data.results ;
  
});

export const getAsyncMoviePage = createAsyncThunk(
    'movies/fetchAsyncMoviePage',
        async (id) => {
            const response = await axios.get(
                `${apiMovieDatabase}/movie/${id}?${apiKey}&language=en-US`
                );
        return response.data;
})

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    trendingMovies: {},
    moviePage: {},
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
  }
})

// export const { getTrendingMovies, getTodo, incrementByAmount } = movieSlice.actions

export const trendings = (state) => state.movies.trendingMovies;
export const moviePage = (state) => state.movies.moviePage;

export default movieSlice.reducer