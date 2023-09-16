import { View, Text, FlatList, useColorScheme,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from 'native-base'
import Colors from '../constants/Colors'
import ProgressiveImage from '../components/common/ProgressiveImage'
import { useNavigation } from '@react-navigation/native'

const {width,height} = Dimensions.get('window')

export default function SellProductCategoryList() {
  const {sellProductsCategory} = useSelector(state=> state.sellProduct)
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  return (
    <FlatList 
      style={{backgroundColor:Colors[colorScheme].background}}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle= {{
        flexDirection:'column',
        padding: width * 0.02,
        justifyContent:'space-between'
      }}
      keyExtractor={(item,index)=> index.toString()}
      numColumns={2}
      data={sellProductsCategory}
      renderItem={({item,index})=> (
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('SellProductDetailsScreen',{productDetailItem:item})}>
                <Box
                  shadow={3}
                  ml={'2'}
                  style={{ width: width * 0.45, marginVertical: 10, height: width * 0.5, borderRadius: 10 }}
                >
                  <ProgressiveImage
                    borderRadius={10}
                    source={{ uri:`${process.env.BUCKET_PRODUCT_URI}${item.images[0]}`}}
                    alt="image"
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      backgroundColor: '#171717',
                      opacity: 0.8,
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      height: width * 0.14,
                      borderBottomEndRadius: 10,
                      borderBottomStartRadius: 10,
                    }}
                  ></View>
                  <View style={{ zIndex: 12, bottom: Platform.OS == 'android' ? width * 0.111 : width * 0.1, left: 7 }}>
                    <Text fontSize={Platform.OS === 'ios'?'sm':'xs'} style={{color:Colors[colorScheme].badgeText}} mt={-2}>
                      {item.title.substring(0, 23) ? item.title.substring(0, 20) + '...' : item.title}
                    </Text>
      
                    <View style={{ bottom: 1, flexDirection: 'row', marginTop: width * 0.01, justifyContent: 'space-between',width:'90%' }}>
                      <Text style={{ color: Colors[colorScheme].mainColor }}>{item.kg} kg</Text>
                      <View
                        style={{
                          backgroundColor: Colors[colorScheme].mainColor,
                          paddingHorizontal:5,
                          flexDirection:'row',
                          alignItems:'center',
                          borderRadius: width * 0.5,
                          marginLeft: width * 0.03,
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: Platform.OS == 'android' ? 8 : 11 }}>
                          {item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                        </Text>
                        <Text style={{color:'#fff',marginLeft:2,fontSize: Platform.OS == 'android' ? 10.5: 11}}>₺</Text>
                      </View>
                    </View>
                  </View>
                </Box>
              </TouchableOpacity>
      )}
    />
  )
}