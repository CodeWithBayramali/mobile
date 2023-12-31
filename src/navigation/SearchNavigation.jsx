import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'

const Stack = createStackNavigator()

export default function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
    </Stack.Navigator>
  )
}