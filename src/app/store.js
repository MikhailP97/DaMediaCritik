import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/movies/movieSlice';

export default configureStore({
  reducer: {
    movies: counterReducer,
  },
});