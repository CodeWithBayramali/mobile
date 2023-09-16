import { Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useColorScheme } from 'react-native'

export default function TextItem({title="",size=14,fontW="500",textColor="text"}) {
    const colorScheme = useColorScheme()

  return (
    <>
      <Text style={[{color:Colors[colorScheme].text,fontSize:size,fontWeight:fontW}]}>{title}</Text>
      </>
  )
}