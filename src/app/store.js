import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../features/movies/movieSlice';

export default configureStore({
  reducer: {
    movies: movieSlice,
  },
});