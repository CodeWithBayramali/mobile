import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import Colors from '../constants/Colors'
import { useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign,Ionicons } from '@expo/vector-icons'; 
import {IconButton, View} from 'native-base'
import SellProductCategoryList from '../screens/SellProductCategoryList'
import SellProductDetailsScreen from '../screens/SellProductDetailsScreen'
import ChatScreen from '../screens/chat/ChatScreen'
import ChatList from '../screens/chat/ChatList'

const Stack = createStackNavigator()

export default function HomeNavigation() {
  
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  
  return (
    <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen navigationKey='1' name='Home' component={HomeScreen} options={{
          title:'',
            headerLeft: () => (
              <Text
                style={{
                  marginLeft:12,
                  color: Colors[colorScheme].mainColor,
                  fontWeight: '800',
                  fontSize: Platform.OS === 'ios' ? 32:32,
                }}
              >
                Naquet
              </Text>
            ),
            headerRight: () => (
              <View alignItems="center" justifyContent="center" flexDirection="row">

              <IconButton onPress={()=> navigation.navigate('ChatScreen')} 
              variant='unstyled' p='0' mr='4' _icon={{as:AntDesign,name:'message1',size:7,color:Colors[colorScheme].text}} />

              <IconButton onPress={()=> navigation.navigate('ChatList')} 
              variant='unstyled' p='0' mr='2' _icon={{as:Ionicons,name:'notifications-outline',size:8,color:Colors[colorScheme].text}} />

              </View>
              
            ),
        }} /> 


        <Stack.Screen navigationKey='2' name='SellProductCategoryList' component={SellProductCategoryList}
          options={({route})=> ({title:route.params.categoryN,headerTitleAlign:'center'})}
        />

        <Stack.Screen navigationKey='3' name='SellProductDetailsScreen'
         component={SellProductDetailsScreen} 
         options={{headerShown:false}}
         />

         <Stack.Screen navigationKey='4' name='ChatScreen' component={ChatScreen} />

         <Stack.Screen navigationKey='5' name='ChatList' component={ChatList} />


    </Stack.Navigator>
  )
}