import React, { useContext, useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthNavigation from "./AuthNavigation";
import { AuthContext } from "../../context/AuthContext";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import RootNavigation  from '../root/RootNavigation'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDispatch } from "../../redux/userSlice";

export default function AppNavigation({ colorScheme }) {
  const {isLoading,userToken} = useContext(AuthContext)
  const dispatch = useDispatch()

  const getUser = async()=> {
    const userId = await AsyncStorage.getItem('@userId')
    if(userId !== null || undefined){
      dispatch(getUserDispatch(userId))
    }
  }

  useEffect(()=> {
    getUser()
  },[isLoading])

  if(isLoading) {
    return(
      <View style={{flex:1,backgroundColor:Colors[colorScheme].mainColor,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color="white" size='large' />
      </View>
    )
  }

  return (
        <NativeBaseProvider>
          <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                {userToken !== null ? <RootNavigation /> : <AuthNavigation/>}
            </SafeAreaProvider>
          </NavigationContainer>
        </NativeBaseProvider>
  );
}
