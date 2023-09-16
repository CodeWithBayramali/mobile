import { TouchableOpacity, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { SimpleLineIcons,Ionicons,AntDesign } from '@expo/vector-icons'; 
import {Box} from 'native-base'
import { useNavigation,DrawerActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logOutDispatch } from '../redux/auth/authSlice';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator()

export default function ProfileNavigation() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()
  
  return (
    <Drawer.Navigator 
      drawerContent={(props)=> <CustomDrawerContent {...props} />}
      screenOptions={{headerStyle:{backgroundColor:Colors[colorScheme].mainColor}}}
    >
      <Drawer.Screen
          options={{
            title:'',
            drawerActiveBackgroundColor:'transparent',
            drawerLabel:'',
            headerShadowVisible:false,
            headerLeft:()=> (
              <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())}>
              <SimpleLineIcons name="menu" style={{marginLeft:20}} size={24} color={Colors[colorScheme].buttonText} />
               </TouchableOpacity>
            ),
            headerRight:()=> (
              <Box flexDirection='row' mr='3'>
                <AntDesign name="message1" size={28} color={Colors[colorScheme].buttonText} style={{marginRight:16}} />
                <Ionicons name="notifications-outline" size={32} color={Colors[colorScheme].buttonText} />
              </Box>
            )
          }}
          name='UserProfileScreen' component={ProfileScreen} />

        {/* <Drawer.Screen
          options={{
            headerTitleStyle:{color:Colors[colorScheme].buttonText},
            headerTitleAlign:'center',
            title:'',
              headerLeft: () => (
                <Box ml='3'>
                  <BackButton />
                </Box>
              ),
            headerBackVisible:false
          }}
          name='PrefferedSelectScreen' component={PrefferedSelectScreen} /> */}

    </Drawer.Navigator>
  )
}


const CustomDrawerContent = (props) => {
  const {logOut} = useContext(AuthContext)
  return(
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
      onPress={()=> logOut()}
        style={{position:'relative',marginTop:300}}
        label='Çıkış Yap'
        inactiveBackgroundColor='red'
        labelStyle={{fontSize:16,color:'white'}}
        icon={()=> (<Ionicons name="md-exit-outline" size={24} color="white" />)}
      />
    </DrawerContentScrollView>
  )
}