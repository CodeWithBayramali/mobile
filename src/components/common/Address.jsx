import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import addressJson from '../../../assets/tr.json'

export default function Address() {

    const [city,setCity] = useState([])
    const [district,setDistrict] = useState()

  return (
    <View>
      <Text>Address</Text>
    </View>
  )
}