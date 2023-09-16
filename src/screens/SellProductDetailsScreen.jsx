import { Dimensions, Platform, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import ProgressiveImage from '../components/common/ProgressiveImage';
import { Box, Heading, ScrollView,Text,IconButton, Divider } from 'native-base'
import Colors from '../constants/Colors';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5,MaterialIcons  } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const {width,height} = Dimensions.get('window')

export default function SellProductDetailsScreen({route}) {
    const {productDetailItem} = route.params
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [isOpen,setIsOpen] = useState(false)



    return (
      <>
      <Ionicons onPress={()=> navigation.goBack()} name="arrow-back" 
          style={{position:'absolute',zIndex:12,marginLeft:width *0.07,marginTop:width * 0.14}}
          size={32} color="white" 
      />
        <ProgressiveImage 
          source={{uri:`${process.env.BUCKET_PRODUCT_URI}${productDetailItem.images[0]}`}} 
          style={{height:Platform.OS==='ios'? 350:300}}
        />
      <ScrollView p='3' horizontal={false} showsVerticalScrollIndicator={false} 
      style={{backgroundColor:Colors[colorScheme].background}}>
        <Box w='full' flexDirection='row' justifyContent='space-between' alignItems='center'>
            <Box flexDirection='row' alignItems='center' bg={Colors[colorScheme].mainColor} px='1.5' rounded='full'>
              <Heading color={Colors[colorScheme].buttonText}>{productDetailItem.kg}</Heading>
              <MaterialCommunityIcons name="weight-kilogram" size={24} style={{marginLeft:7}} color={Colors[colorScheme].buttonText} />
            </Box>
  
            <Box flexDirection='row' alignItems='center' bg={Colors[colorScheme].mainColor} px='1.5' rounded='full'>
              <Text fontSize='xl' color={Colors[colorScheme].buttonText}>{productDetailItem.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ₺</Text>
            </Box>
            
        </Box>
        <Box w='full' mt='3'>
            {/* <Heading size={Platform.OS === 'ios'?'xl':'md'} color={Colors[colorScheme].mainColor}>{productDetailItem.title}</Heading> */}
            <Text mt='3' fontSize={Platform.OS==='ios'?'xl':'md'} color={Colors[colorScheme].text}>{productDetailItem.title}</Text>
        </Box>
        <Divider mt='10' />
        <Box flexDirection='row' alignItems='center' mt={Platform.OS === 'ios'? '10':'5'} w='72' mb={Platform.OS==='android' && '16'}>
         {
          productDetailItem?.user?.profilePhoto ? (
            <ProgressiveImage source={{uri:`${process.env.BUCKET_PROFILE_URI}${productDetailItem?.user?.profilePhoto}`}} style={{borderRadius:50,width:95,height:95}} />
          ):(
            <Box bg={Colors[colorScheme].mainColor} w='20' h='20' justifyContent='center' alignItems='center' rounded='full' flexDirection='row'>
              <Heading color={Colors[colorScheme].buttonText}>{productDetailItem.user?.userName?.slice(0,1)}</Heading>
            </Box>
          )
         }
          
          <Box ml='3' w='72'>
            <Heading color={Colors[colorScheme].text}>{productDetailItem.user.userName}</Heading>
            <Box flexDirection='row' mr='4' mt='3'>
              <IconButton variant='solid' bg={Colors[colorScheme].mainColor} _icon={{as:FontAwesome5,name:'user-edit'}} />
  
              <IconButton ml='6' onPress={()=> setIsOpen(true) } 
              variant='solid' 
              bg={Colors[colorScheme].successTextColor}
               _icon={{as:MaterialIcons,name:'message'}} />
  
  
            </Box>
          </Box>
        </Box>
      </ScrollView>
      </>
  )
}