import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const api_url = "http://localhost:3001/";

// USERS calls

export const createNewUser = createAsyncThunk(
    'users/createUser',
        async (user) => {
            const response = await axios.post(
                    `${api_url}register}`, user
                )
                .then(console.log('Nouvel utilisateur créé'))
                .catch(err => {
                    console.error(err);
                });
        return response.data;
})

export const connectUser = createAsyncThunk(
    'users/connectUser',
        async (user) => {
            const response = await axios.post(
                    `${api_url}login}`, user
                )
                .then(console.log('Connexion réussie'))
                .catch(err => {
                    console.error(err);
                });
        return response.data;
})

export const getUser = createAsyncThunk(
    'users/getUser',
        async (id) => {
            const response = await axios.get(
                    `${api_url}users?id=${id}`
                );
        return response.data;
})

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        subscribedUser: {},
        connectedUser: {},
    },
    extraReducers: {
        // getUser
        [getUser.fulfilled]: (state, { payload }) => {
            console.log("fullfilled getUser");
            return { ...state, user: payload };
        },
        [getUser.rejected]: () => {
            console.log("rejected getUser");
        },
        // createNewUser
        [createNewUser.fulfilled]: (state, { payload }) => {
            console.log("fullfilled createNewUser");
            return { ...state, user: payload };
        },
        [createNewUser.rejected]: () => {
            console.log("rejected createNewUser");
        },
        // connectUser
        [connectUser.fulfilled]: (state, { payload }) => {
            console.log("fullfilled connectUser");
            return { ...state, user: payload };
        },
        [connectUser.rejected]: () => {
            console.log("rejected connectUser");
        },
    }
})

export const currentUser = (state) => state.users.user;
export const subscribedUser = (state) => state.users.subscribedUser;
export const connectedUser = (state) => state.users.connectedUser;

export default userSlice.reducer