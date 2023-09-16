import { View, Text, TouchableOpacity, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const SelectInput = (text,placeholder) => {
    
    const colorScheme = useColorScheme()

    const TouchableComponent = () => {
    return (
      <TouchableOpacity style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:12,
        borderColor: Colors[colorScheme].borderColor,
        borderWidth:1,
        borderRadius:5
      }}>
        {
            text !== null && undefined ? 
            <Text style={[{color:Colors[colorScheme].text}]}>{text}</Text> :
            <Text style={[{color:Colors[colorScheme].placeholderTextColor}]}>{placeholder}</Text>

        }
        <FontAwesome name="chevron-down" color={Colors[colorScheme].borderColor} size={18} />
      </TouchableOpacity>
    );
  };
  return { TouchableComponent };
};

const Option = () => {};

const Select = ({ touchableComponent = SelectInput, touchableText,placeholderText }) => {
  const { TouchableComponent } = touchableComponent(touchableText,placeholderText);
  return (
    <>
        <TouchableComponent />
    </>
  )
};

export default Select;
