import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, {useEffect} from "react";
import { Box } from "native-base";
import Colors from "../constants/Colors";
import { useColorScheme } from "react-native";
import ProgressiveImage from "../components/common/ProgressiveImage";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "native-base";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
  AntDesign
} from "@expo/vector-icons";
import { getSellProductsByUserIdDispatch } from "../redux/sellProductSlice";

const { width } = Dimensions.get("window");

export default function ListScreen() {
  
  const colorScheme = useColorScheme();
  const {sellProducts} = useSelector(state=> state.sellProduct)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getSellProductsByUserIdDispatch())
  },[dispatch])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingVertical: width * 0.03, height: "100%",backgroundColor:Colors[colorScheme].background }}
    >
      {sellProducts?.map((item, index) => (
        <Box
          key={index}
          shadow="2"
          rounded="lg"
          flexDirection="row"
          mb="4"
          mx="2.5"
          background={Colors[colorScheme].darkModeBackground}
          alignItems={"center"}
        >
          <ProgressiveImage
            source={{uri:`${process.env.BUCKET_PRODUCT_URI}${item.images[0]}`}}
            style={{
              width: Platform.OS === "ios" ? 70 : 70,
              height: Platform.OS === "ios" ? 70 : 70,
              borderRadius: 100,
              margin: 10,
            }}
          />
          {/** LIST ITEM CARD CONTENT */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent:'space-between',
                width:width*0.70
              }}
            >
              <Heading size="sm" color={Colors[colorScheme].text}>
                {item.title.length >= 26
                  ? `${item.title.substring(0, 25)}...`
                  : item.title}
              </Heading>
              <View style={{flexDirection:'row',columnGap:12}}>
                <TouchableOpacity>
                  <Feather name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                width: width * 0.5,
              }}
            >
              <Heading size="xs" color={Colors[colorScheme].successTextColor}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={24}
                  color={Colors[colorScheme].successTextColor}
                />
                {item.kg}
              </Heading>
              <Heading size={"sm"} color={Colors[colorScheme].successTextColor}>
                <FontAwesome
                  name="turkish-lira"
                  size={18}
                  color={Colors[colorScheme].successTextColor}
                />{" "}
                {item.price}
              </Heading>
            </View>
          </View>
        </Box>
      ))}
    </ScrollView>
  );
}
