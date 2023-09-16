import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import Toast from 'react-native-toast-message'
import axios from "axios";
import {API_AUTH_URI} from '@env'

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token: null
    },
    reducers:{
        login:(state,action) => {
            state.token = action.payload.token
        },
        logOut:(state,action)=> {
            state.token = null
        }
    }
})


export const loginDispatch = (userData) => async(dispatch) => {
    axios.post(`${API_AUTH_URI}/login`,userData).then( async res=> {
        if(res.data.success) {
            dispatch(login(res.data.loginResponse))
            await AsyncStorage.setItem('@accessToken',res.data.loginResponse.token)
            await AsyncStorage.setItem('@userId',res.data.loginResponse.user.id)
        }else {
            Toast.show({type:'error',text1:res.data.message})
        }
    })
}

export const registerDispatch = (userData,navigationRef) => async(dispatch) => {
    axios.post(`${API_AUTH_URI}/register`,userData).then(res=> {
        if(res.data.success) {
            Toast.show({type:'success',text1:res.data.message})
            navigationRef.navigate('LoginScreen')
        }
        if(!res.data.success)
            return Toast.show({type:'error',text1:'Hata',text2:res.data.message})
    })
}


export const logOutDispatch = () => async(dispatch) => {
    await AsyncStorage.removeItem('@accessToken')
    await AsyncStorage.removeItem('@userId')
    return dispatch(logOut())
}


export const {login,logOut} = authSlice.actions;
export default authSlice.reducer;