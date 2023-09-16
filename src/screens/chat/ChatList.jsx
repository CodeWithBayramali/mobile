import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
// import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useChatSocket } from '../../hooks/useChatSocket'

export default function ChatList() {
    const [chatList,setChatList] = useState([])
    const [isConnected,setIsConnected] = useState(false)
    const {user} = useSelector(state=> state.user)
    const {chatListResponse,onConnectedChatList,connectChatList,} = useChatSocket()
    
    useEffect(()=> {
      connectChatList()
    },[])
    console.log(chatListResponse)
  return (
    <View>
      <Text></Text>
    </View>
  )
}