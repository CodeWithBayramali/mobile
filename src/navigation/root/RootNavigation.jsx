import React, { useState } from 'react'
import {View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigation from '../HomeNavigation'
import ProfileNavigation from '../ProfileNavigation'
import {AntDesign,MaterialCommunityIcons,Feather,Ionicons} from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import SellNavigation from '../SellNavigation'
import {Box} from 'native-base'
import ListNavigation from '../ListNavigation'
import SearchNavigation from '../SearchNavigation'
import { useColorScheme } from 'react-native'

const BottomTab = createBottomTabNavigator()

export const RouteNameContext = React.createContext(undefined);

export default function RootNavigation() {
    const colorScheme = useColorScheme()
    const [currentRouteName,setCurrentRouteName] = useState(undefined)
  return (
    <RouteNameContext.Provider value={{currentRouteName,setCurrentRouteName}}>
    <BottomTab.Navigator initialRouteName='Home' screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:Colors[colorScheme].mainColor,
        tabBarStyle:{
            display: currentRouteName === undefined ? 'flex':'none'
        }
    }}>

        {/** Home Navigator */}
        <BottomTab.Screen name='HomeNavigation' component={HomeNavigation} 
            options={()=> ({
                headerShown:false,
                tabBarIcon:({color}) => <AntDesign name='home' size={28} color={color} />
            })}
        />


        {/** Search Navigator */}
        <BottomTab.Screen name='SearchNavigation' component={SearchNavigation} 
            options={()=> ({
                headerShown:false,
                tabBarIcon:({color}) => <Feather name="search" size={28} color={color} />
            })}
        />


        <BottomTab.Screen
                name="Sell"
                component={SellNavigation}
                options={() => ({
                tabBarIcon: ({ color }) => (
                    <Box
                    shadow='5'
                    style={{
                        marginTop: Platform.OS ==='ios' ? -12 :-30,
                        borderRadius: 50,
                        width: Platform.OS ==='ios' ? 58 :48 ,
                        height: Platform.OS ==='ios' ? 58 :48,
                        backgroundColor: Colors[colorScheme].mainColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="flower-tulip-outline" size={32} color={Colors[colorScheme].background} />
                    </View>
                    </Box>
                )
                })}
            />

        <BottomTab.Screen name='ListNavigation' component={ListNavigation}
            options={()=> ({
                headerShown:false,
                tabBarIcon:({color}) => <Ionicons name="list-outline" size={28} color={color} />
            })}
        />

        
        <BottomTab.Screen name='ProfileNavigation' component={ProfileNavigation}
            options={()=> ({
                headerShown:false,
                tabBarIcon:({color}) => <Feather name="user" size={28} color={color} />
            })}
        />


    </BottomTab.Navigator>
    </RouteNameContext.Provider>
  )
}