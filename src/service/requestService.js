import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URI = process.env.API_URI
let token = ""


export const getGuardRequest = async (requestParameter=RequestParameter,id) => {
    token = await AsyncStorage.getItem('@accessToken')
    let url = `${API_URI}/${requestParameter.controller}/${requestParameter.action ?`${requestParameter.action}`: ""}${id ? `/${id}`:""}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`;
    return await axios.get(url,{headers:{'Authorization': `Bearer ${token}`}})
    
}

export const postGuardRequest = async (requestParameter=RequestParameter,body,id) => {
  token = await AsyncStorage.getItem('@accessToken')
  let url = `${API_URI}/${requestParameter.controller}/${requestParameter.action ?`${requestParameter.action}`: ""}${id?`/${id}`:""}/${requestParameter.queryString ? `${requestParameter.queryString}`:""}`
  return await axios.post(url,body,{headers:{'Authorization': `Bearer ${token}`}})
}

export const putGuardRequest = async (requestParameter=RequestParameter,id,body)=> {
  token =await AsyncStorage.getItem('@accessToken')
  let url = `${API_URI}/${requestParameter.controller}${requestParameter.action? `/${requestParameter.action}`:""}${id ? `/${id}`:""}`
  return await axios.put(url,body,{headers:{'Authorization': `Bearer ${token}`}})
}


const RequestParameter = {
  controller: "",
  action: "",
  queryString: ""
}