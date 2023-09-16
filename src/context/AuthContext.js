import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { createContext } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";
import axios from "axios";
import Toast from 'react-native-toast-message'
import {API_AUTH_URI} from '@env'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading,setIsLoading] =useState(false)
    const [userToken,setUserToken] = useState(null)

    const logOut = async () => {
        await AsyncStorage.removeItem('@accessToken')
        await AsyncStorage.removeItem('@userId')
        setUserToken(null)
    }

    const login = (userData) => {
        axios.post(`${API_AUTH_URI}/login`,userData).then(async res=> {
            if(res.data.success){
                await AsyncStorage.setItem('@accessToken',res.data.loginResponse.token)
                await AsyncStorage.setItem('@userId',res.data.loginResponse.user.id)
                setUserToken(res.data.loginResponse.token)
            }else {
                Toast.show({type:'error',text1:res.data.message})
            }
        })
    }

    const isLoggedIn = async() => {
        try{
            const token = await AsyncStorage.getItem('@accessToken')
            setIsLoading(true)
            if(token !== null) {
                setUserToken(token)
                var decode = jwt_decode(token)
                if(decode.exp < moment().unix()){
                    setUserToken(null)
                    console.log('Log out running')
                }
                    
            }
            
            setTimeout(() => {
               setIsLoading(false)
            }, 1000);
            
        }catch(err)
        {
            console.log(`Login error: ${err}`)
        }
    }


    useEffect(()=> {
            isLoggedIn()
    },[userToken])
    return(
        <AuthContext.Provider value={{isLoading,userToken,login,logOut}}>
            {children}
        </AuthContext.Provider>
    )
    
}