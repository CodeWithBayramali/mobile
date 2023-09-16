import { View, Text } from 'react-native'
import React from 'react'
import SearchBar from '../components/common/SearchBar';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Box } from 'native-base';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';


const SearchScreen = () => {
  const colorScheme = useColorScheme()
  return (
    <View>
      <SearchBar />
      <Box justifyContent='center' h='xl' alignItems='center'>
      <MaterialCommunityIcons style={{opacity:0.3}} name="search-web" size={300} color={Colors[colorScheme].text} />
      </Box>
    </View>
  )
}

export default SearchScreen