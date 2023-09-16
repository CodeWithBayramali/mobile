import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, FlipType, SaveFormat,ActionRotate } from 'expo-image-manipulator'
import { selectPhoto } from '../../redux/sellProductSlice'
import { useDispatch } from 'react-redux'


export default function SellCameraScreen(props) {
  
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cameraRef = useRef()
  const [hasPermission,setHasPermission] = useState(null)
  const [type,setType] = useState(Camera.Constants.Type.back)
  

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

  const snap = async () => {
    const options = {skipProcessing:false};
    const photo = await cameraRef.current.takePictureAsync(options)

    const manuplate= await manipulateAsync(
      photo.uri,[{rotate:-180},{resize:{width:640,height:980}},{flip:FlipType.Vertical}],{compress:0.3,format:SaveFormat.PNG}
    )

    switch (props.route.params?.imgNumber) {
      case 'img2':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img2'}))
          navigation.navigate("SellFinalScreen")
        break;
      case 'img3':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img3'}))
          navigation.navigate("SellFinalScreen")
        break;
      case 'img4':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img4'}))
          navigation.navigate("SellFinalScreen")
        break;
      case 'img5':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img5'}))
          navigation.navigate("SellFinalScreen")
        break

        default:
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img1'}))
          navigation.navigate("SellFinalScreen")

      
    }
    navigation.navigate('SellFinalScreen')
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,3],
      quality:0.4
    })
    if(result.canceled) {
      return navigation.navigate('SellFinalScreen')
    }

    const manuplate= await manipulateAsync(
      result.assets[0].uri,[{rotate:-180},{resize:{width:940}},{flip:FlipType.Vertical}],{compress:0.5,format:SaveFormat.PNG}
    )
    switch (props.route.params?.imgNumber) {
      case 'img2':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img2'}))
        break;
      case 'img3':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img3'}))
        break;
      case 'img4':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img4'}))
        break;
      case 'img5':
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img5'}))
        break;
    
      default:
          dispatch(selectPhoto({uri:manuplate.uri,selected:'img1'}));
    }
    navigation.navigate('SellFinalScreen')

  }
  
  return (
    <View style={{flex:1}}>
      <Camera style={{flex:1}} type={type} ref={cameraRef}>
        <View style={{flex:1,justifyContent:'space-around',backgroundColor:'transparent',flexDirection:'row',marginBottom:60}}>

          <TouchableOpacity style={styles.button}
            onPress={()=> {
              setType(
                type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
              )
            }}
          >
            <FontAwesome onPress={pickImage} name='photo' size={38} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={snap}>
              <FontAwesome name='camera' size={52} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name='camera-reverse-outline' size={52} color={'#fff'} />
          </TouchableOpacity>

        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf:'flex-end',
    alignItems:'center'
  }
})