import { useEffect, useState,useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";


export const useChatSocket = (room) => {
  const [stompClient,setStompClient] = useState()
  const [privateChats,setPrivateChats] = useState([])
  const [isConnected,setIsConnected] = useState(false)

  const connect = () => {
    const sock = new SockJS(process.env.SOCKET_BASE_URL)
    const temp = over(sock)
    setStompClient(temp)
    stompClient?.connect({},onConnected,onError)
    setIsConnected(true)
  }

  const disconnect = () => {
    stompClient?.disconnect()
    setIsConnected(false)
  }

  const onConnected = async () => {
    await stompClient.subscribe('/user/'+room+'/private',onPrivateMessage)
  }

  const onError = (err) => {
    console.log(err)
  }

  const sendData = useCallback((payload) => {
    stompClient?.send("/app/chat.sendMessage",{},JSON.stringify(payload))
  });

  return { connect,disconnect,privateChats, sendData, isConnected };
};
