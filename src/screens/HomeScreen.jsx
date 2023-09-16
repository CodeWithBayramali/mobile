import { ScrollView } from 'react-native'
import React from 'react'
import { useColorScheme } from 'react-native'
import Colors from '../constants/Colors'
import CategoryList from '../components/home/CategoryList'
import PopularSeller from '../components/home/PopularSeller'
import Statistics from '../components/home/Statistic'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPopularSellersDispatch } from '../redux/popularSellerSlice'

export default function HomeScreen() {
  
  const colorScheme = useColorScheme()

  const {sellers} = useSelector(state=> state.popularSeller)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getPopularSellersDispatch())
  },[dispatch])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:Colors[colorScheme].background}}>
        <CategoryList />
        <PopularSeller sellers={sellers} />
        <Statistics />
    </ScrollView>
  )
}