import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SellCameraScreen from "../screens/sell/SellCameraScreen";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SellFinalScreen from "../screens/sell/SellFinalScreen";
import HomeNavigation from "./HomeNavigation";

const Stack = createStackNavigator();

export default function SellNavigation() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SellFinalScreen"
        component={SellFinalScreen}
        options={{
          title: "Ürün Yayınla",
          headerLeft: () => (
            <MaterialIcons
              name="cancel"
              size={28}
              color={Colors[colorScheme].iconColor}
              style={{ marginLeft: 24 }}
              onPress={navigation.goBack}
            />
          ),
        }}
      />

      <Stack.Screen
        name="SellCameraScreen"
        component={SellCameraScreen}
        options={{
          title: "Kapak Fotoğrafı",
          headerLeft: () => (
            <MaterialIcons
              name="cancel"
              size={28}
              color={Colors[colorScheme].iconColor}
              style={{ marginLeft: 24 }}
              onPress={navigation.goBack}
            />
          ),
        }}
      />

      <Stack.Screen name="HomeNavigation" component={HomeNavigation} options={{headerShown:false}} />

    </Stack.Navigator>
  );
}
