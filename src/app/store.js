import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../features/movies/movieSlice';
import currentUser from '../features/users/userSlice'

export default configureStore({
  reducer: {
    movies: movieSlice,
    users: currentUser,
  },
});