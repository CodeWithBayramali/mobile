import {
  View,
  Text,
  useColorScheme,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Platform
} from "react-native";
import { Formik } from "formik";
import { Input, FlatList, Box, IconButton } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const { width, height } = Dimensions.get("screen");
var stompClient = null;

export default function ChatScreen({ navigation, route }) {
  const colorScheme = useColorScheme();
  const { user } = useSelector((state) => state.user);
  const [privateChats, setPrivateChats] = useState([]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    const sock = new SockJS(process.env.SOCKET_BASE_URL);
    stompClient = over(sock);
    stompClient.debug = null;
    stompClient?.connect({}, onConnected, (err) => console.log(err));
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
      stompClient.disconnect();
    };
  }, []);

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + "64fc2c366b56e2278a30d4b3" + "/private",
      onPrivateMessage
    );
  };

  const onPrivateMessage = (payload) => {
    var data = JSON.parse(payload.body);
    data.map((item) => {
      setPrivateChats((previous) => [previous, item]);
    });
  };

  const onSendPrivate = (value) => {
    stompClient.send(
      "/app/private-message",
      {},
      JSON.stringify({
        id: "64fc2c366b56e2278a30d4b3",
        senderId: user?.id,
        receiverId: "64e336e93c9c57069bd74f35",
        productId: "64e9cd7e18bba24edbe48e5b",
        messages: [
          {
            _id: uuidv4(),
            createdAt: new Date(),
            text: value.message,
            user: {
              _id: user.id,
              avatar: user.profilePhoto,
              name: `${user.firstName} ${user.middleName} ${user.lastName}`,
            },
          },
        ],
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: Colors[colorScheme].darkModeBackground,
          height: "100%",
        }}
      >
        <StatusBar style="light" translucent />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 80}
          style={{ height: "100%" }}
        >
          <FlatList flex={1} data={privateChats} />
          <Formik initialValues={{ message: "" }} onSubmit={onSendPrivate}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={{ bottom: 24, paddingHorizontal: 12 }}>
                <Box justifyContent={"center"} alignItems={"center"}>
                  <Input
                  color={Colors[colorScheme].text}
                    rounded={"full"}
                    size={"2xl"}
                    onChangeText={handleChange("message")}
                    onBlur={handleBlur("message")}
                    value={values.message}
                  />
                  <IconButton
                    backgroundColor={Colors[colorScheme].successTextColor}
                    position={"absolute"}
                    right={2}
                    onPress={handleSubmit}
                    icon={<FontAwesome name="send" size={16} color="black" />}
                    rounded={"full"}
                  />
                </Box>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );

  {
    /* <GiftedChat
        messages={privateChats}
        onSend={(messages) => onSendPrivate(messages[0])}
        user={{
          _id: uuidv4(),
          avatar: `${process.env.BUCKET_PROFILE_URI}${user.profilePhoto}`,
          name: `${user.firstName} ${user?.middleName} ${user.lastName}`,
        }}
        messagesContainerStyle={{
          paddingBottom: height * 0.01,
        }}
        placeholder="Mesaj yaz..."
        textInputStyle={{
          backgroundColor: Colors[colorScheme].tabIconDefault,
          paddingHorizontal: height * 0.02,
          borderColor: Colors[colorScheme].borderColor,
          borderWidth: 0.5,
          borderRadius: 6,
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            containerStyle={
              {
                // backgroundColor:'red',
              }
            }
            {...props}
          />
        )}
      />
    </View>  */
  }
}
