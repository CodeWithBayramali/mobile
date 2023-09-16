import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import EnteranceScreen from "../../screens/EnteranceScreen";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";
import Address from "../../components/common/Address";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>

      <Stack.Screen
        key={"0"}
        name="EnteranceScreen"
        component={EnteranceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        key={"1"}
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
            borderWidth: 0,
            shadowOpacity: 0,
          },
          headerTitle:'',
          headerBackTitle:'Geri',
        }}
      />

      <Stack.Screen
        key={"2"}
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
            borderWidth: 0,
            shadowOpacity: 0,
          },
          headerTitle:'',
          headerBackTitle:'Geri',
        }}
      />


      <Stack.Screen
        key={"3"}
        name="AddressScreen"
        component={Address}
        options={{
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
            borderWidth: 0,
            shadowOpacity: 0,
          },
          headerTitle:'',
          headerBackTitle:'Geri',
        }}
      />

    </Stack.Navigator>
  );
}
