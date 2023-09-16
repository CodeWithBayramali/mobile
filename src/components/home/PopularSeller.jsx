import { View, Text, ScrollView,Dimensions,Image,Platform, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Button,Box} from 'native-base'
import ProgressiveImage from '../common/ProgressiveImage'
import Colors from '../../constants/Colors'
import { useColorScheme } from 'react-native'
import { getPopularSellersDispatch } from '../../redux/popularSellerSlice'

const {width,height} = Dimensions.get('window')

const PopularSeller = ({sellers}) => {
    const colorScheme = useColorScheme();

  return (
    <View>

        <Text style={{color:Colors[colorScheme].text, fontSize:Platform.OS === 'ios' ? 32:28,  marginLeft:12,  fontWeight:'bold',
        marginBottom:Platform.OS === 'ios' ? 25:15}}>Popüler Satıcılar</Text>
        
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
            sellers.map((item,index)=> (
                <Box key={index} shadow='1' rounded='xl' style={{ padding:5,marginLeft:12, marginBottom:12,width:Platform.OS === 'ios' ? width*0.45 : width*0.43,
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:Colors[colorScheme].darkModeBackground
                }}>
                <ProgressiveImage source={{uri:`${process.env.BUCKET_PROFILE_URI}${item.profilePhoto}`}} 
                 style={{
                  width:Platform.OS === 'ios'?120:100,
                  height:Platform.OS === 'ios'?120:100,
                  borderRadius:100,
                  marginTop:12
                  }} />
                <Text style={{marginTop:3,
                  color:Colors[colorScheme].text,
                  fontSize:16,
                  fontWeight:'bold',
                  marginTop:7
                  }}>{item.firstName} {item?.middleName} {item.lastName.length > 8 ? item.lastName.substring(0,1):item.lastName} </Text>
                    {/* {item} {`${item.slice(0,1)}.`} */}
              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginVertical:12}}>
              <MaterialCommunityIcons name="flower-tulip-outline" size={18} color={Colors[colorScheme].successTextColor} />
              <Text style={{color:Colors[colorScheme].successTextColor}}>{item.popularPoint}</Text>
              </View>

              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginVertical:12}}>
                  <Button size='sm' bg='success.500' rounded='full'>PROFİLİ GÖR</Button>
              </View>

            </Box>
            ))
        }
          
            
    </ScrollView>
    </View>
  )
}

export default PopularSeller