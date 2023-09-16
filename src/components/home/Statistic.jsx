import { View,Text, Platform, Image } from "react-native";
import React from "react";
import { useColorScheme } from "react-native";
import TextItem from "../common/TextItem";
import Colors from "../../constants/Colors";

export default function Statistics() {
  const colorScheme = useColorScheme();
  return (
    <View style={{marginBottom:24,marginHorizontal:12}}>
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontSize:Platform.OS === 'ios' ? 32:28,
          marginLeft:7,
          fontWeight: "bold",
          marginVertical: Platform.OS==='ios' ? 30:15,
        }}
      >
        İstatistikler
      </Text>

        <View style={{
          borderRadius:12,
          backgroundColor:Colors[colorScheme].darkModeBackground,
          shadowColor: "#000",
                shadowOffset: {
                	width: 0,
                	height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
          }}>

      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal:5,
          marginHorizontal:7,
          borderRadius:12,
          flexDirection:'row',
          alignItems:'center',
          borderBottomWidth:1,
          borderColor:Colors[colorScheme].borderColor
        }}
      >
        <View>
            <Image style={{width:48,height:48,borderRadius:50}}
             source={{uri:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'}} 
             />
        </View>
        <View style={{flexDirection:'column',marginLeft:12}}>
            <TextItem title="Baklagiller" fontW="bold" />
            <TextItem title="6.67%" />
        </View>
        <View style={{alignItems:'flex-end',width:200}}>
        <TextItem title="123.345 kg" size={16} />
        </View>
      </View>

      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal:5,
          marginHorizontal:7,
          borderRadius:12,
          flexDirection:'row',
          alignItems:'center',
          borderBottomWidth:1,
          borderColor:Colors[colorScheme].borderColor
        }}
      >
        <View>
            <Image style={{width:48,height:48,borderRadius:50}}
             source={{uri:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'}} 
             />
        </View>
        <View style={{flexDirection:'column',marginLeft:12}}>
            <TextItem title="Baklagiller" fontW="bold" />
            <TextItem title="6.67%" />
        </View>
        <View style={{alignItems:'flex-end',width:200}}>
        <TextItem title="123.345 kg" size={16} />
        </View>
      </View>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal:5,
          marginHorizontal:7,
          borderRadius:12,
          flexDirection:'row',
          alignItems:'center',
          borderBottomWidth:1,
          borderColor:Colors[colorScheme].borderColor
        }}
      >
        <View>
            <Image style={{width:48,height:48,borderRadius:50}}
             source={{uri:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'}} 
             />
        </View>
        <View style={{flexDirection:'column',marginLeft:12}}>
            <TextItem title="Baklagiller" fontW="bold" />
            <TextItem title="6.67%" />
        </View>
        <View style={{alignItems:'flex-end',width:200}}>
        <TextItem title="123.345 kg" size={16} />
        </View>
      </View>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal:5,
          marginHorizontal:7,
          borderRadius:12,
          flexDirection:'row',
          alignItems:'center',
          borderBottomWidth:1,
          borderColor:Colors[colorScheme].borderColor
        }}
      >
        <View>
            <Image style={{width:48,height:48,borderRadius:50}}
             source={{uri:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'}} 
             />
        </View>
        <View style={{flexDirection:'column',marginLeft:12}}>
            <TextItem title="Baklagiller" fontW="bold" />
            <TextItem title="6.67%" />
        </View>
        <View style={{alignItems:'flex-end',width:200}}>
        <TextItem title="123.345 kg" size={16} />
        </View>
      </View>


      </View>
    </View>
  );
}
