import { View, Text,Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";

export default function EnteranceScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: Colors[colorScheme].mainColor,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:16
    }}
    >

        <Image source={require('../../assets/icon.png')} style={{width:350,height:350}} />
        <Button onPress={()=> navigation.navigate('LoginScreen')} size='lg' w={'full'} colorScheme='success' mb='4'>Giriş Yap</Button>
        <Button onPress={()=> navigation.navigate('RegisterScreen')} size='lg' w={'full'} colorScheme='cyan'>Kayıt Ol</Button>
    </View>
  );
}
