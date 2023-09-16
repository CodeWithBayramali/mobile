import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListScreen from '../screens/ListScreen'

const Stack = createStackNavigator()

export default function ListNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerTitle:'Ürün Listem',headerTitleAlign:'center',headerTitleStyle:{fontSize:24}}}>
      <Stack.Screen name='ListScreen' component={ListScreen} />
    </Stack.Navigator>
  )
}