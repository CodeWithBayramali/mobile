import { View, Text, ScrollView,Dimensions,Image } from 'react-native'
import React from 'react'
import { useColorScheme } from 'react-native'
import Colors from '../../constants/Colors'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesDispatch } from '../../redux/categorySlice'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getSellProductsByCategoryNameDispatch } from '../../redux/sellProductSlice'
import { useNavigation } from '@react-navigation/native'

const {width} = Dimensions.get('window')

export default function CategoryList() {
    const colorScheme = useColorScheme()
    const dispatch = useDispatch()
    const {categories} = useSelector(state=> state.category)
    const navigation = useNavigation()

    useEffect(()=> {
        dispatch(getCategoriesDispatch())
    },[dispatch])

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={true} style={{paddingVertical:10}}>

            {
                categories?.map((item,index)=> (
            <TouchableOpacity onPress={()=> dispatch(getSellProductsByCategoryNameDispatch(item.name,navigation))} key={index} style={{
                padding:9,
                marginLeft:7,
                borderRadius:8,
                width:width*0.25,
                maxWidth:width*0.25,
                height:120,
                flexDirection:'column',
                justifyContent:'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                marginBottom:12,
                elevation: 1,
                alignItems:'center',
                backgroundColor:Colors[colorScheme].darkModeBackground
            }}>
                {
                    item.name === 'Meyveler' && <Image source={require(`../../../assets/images/categoryicon/fruits-icon.png`)} style={{width:64,height:64,borderRadius:50}} /> ||
                    item.name === 'Sebzeler' && <Image source={require(`../../../assets/images/categoryicon/vegetables-icon.png`)} style={{width:64,height:64,borderRadius:50}} /> ||
                    item.name === 'Baklagil' && <Image source={require(`../../../assets/images/categoryicon/beans-icon.png`)} style={{width:64,height:64,borderRadius:50}} /> ||
                    item.name === 'Kuru Yemiş' && <Image source={require(`../../../assets/images/categoryicon/nuts-icon.png`)} style={{width:64,height:64,borderRadius:50}} /> ||
                    item.name === 'Hayvansal Gıda' && <Image source={require(`../../../assets/images/categoryicon/cow-icon.png`)} style={{width:64,height:64,borderRadius:50}} /> ||
                    item.name === 'Deniz Ürünleri' && <Image source={require(`../../../assets/images/categoryicon/fish-icon.png`)} style={{width:64,height:64,borderRadius:50}} />
                }
                <Text style={{marginTop:3,color:Colors[colorScheme].text,fontSize:11,marginTop:7,fontWeight:'bold'}}>{item.name}</Text>
            </TouchableOpacity>
                ))
            }

    </ScrollView>
  )
}