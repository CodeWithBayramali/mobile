import { View, Image, TouchableOpacity, useColorScheme,Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera'
import { useNavigation } from "@react-navigation/native";
import React, {useEffect,useRef,useState} from "react";
import { useDispatch } from "react-redux";
import { changeProfilePhotoDispatch } from "../../redux/userSlice";
import ProgressiveImage from "../common/ProgressiveImage";

export default function ProfileImage({userId,profilePhoto}) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const cameraRef = useRef()
  const [hasPermission,setHasPermission] = useState(null)
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:0.5
    })
    if(pickImage.canceled) {
      throw Error("Camera was cancelled");
    }
    const imageData = new FormData()
    imageData.append("file",{
      uri: result.assets[0].uri,
      name:'ppimage.png',
      fileName:Platform.OS === 'ios' ? result.assets[0].fileName:'PP.JPG',
      type: 'image/jpg'
    })
    dispatch(changeProfilePhotoDispatch(imageData))
  }

  useEffect(()=> {
    
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      if(status === 'granted')
        setHasPermission(status==='granted')
      else
        setHasPermission(null)
    })();

    (async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted')
        alert('İzin verilmedi')
    })()
  })

  return (
    <View>
      <ProgressiveImage
        style={{ borderRadius: 100, width: 150, height: 150 }}
        source={{uri:`${process.env.BUCKET_PROFILE_URI}${profilePhoto}`}}
        alt="loading..."
      />
      <TouchableOpacity
        onPress={()=>pickImage()}
        style={{
          position: "absolute",
          right: 12,
          bottom: 0,
          backgroundColor: Colors[colorScheme].successTextColor,
          borderRadius: 50,
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo
          name="images"
          size={20}
          color={Colors[colorScheme].buttonText}
        />
      </TouchableOpacity>
    </View>
  );
}
