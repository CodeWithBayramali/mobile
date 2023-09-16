import {
  View,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { useColorScheme } from "react-native";
import { Heading, Text } from "native-base";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ProfilePrefCategory from "../components/profile/ProfilePrefCategory";
import ProfilePrefProduct from "../components/profile/ProfilePrefProduct";
import ProfileImage from "../components/profile/ProfileImage";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user } = useSelector((state) => state.user);
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [disableCategory, setDisableCategory] = useState(false);

  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme].background,
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: Colors[colorScheme].mainColor,
          height: Platform.OS === "ios" ? width * 0.7 : 280,
          borderBottomEndRadius: Platform.OS === "ios" ? 50 : 45,
          borderBottomLeftRadius: Platform.OS === "ios" ? 50 : 45,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Heading
            size={"xl"}
            style={{ color: Colors[colorScheme].buttonText }}
          >
           {user?.firstName} {user?.middleName !== null ? user?.middleName : ""} {user?.lastName}
          </Heading>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 24,
            }}
          >
            <Heading color={Colors[colorScheme].successTextColor} mt={2}>
              <Entypo
                name="flower"
                size={24}
                color={Colors[colorScheme].successTextColor}
              />
              {user?.popularPoint}
            </Heading>
            <Heading
              style={{ color: Colors[colorScheme].successTextColor }}
              mt={2}
            >
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={24}
                color={Colors[colorScheme].successTextColor}
              />
              {user?.totalKg}
            </Heading>
          </View>
          <View>
            {user.address?.map((item, index) => (
              <Text key={index} color={Colors[colorScheme].badgeText}>
                {user?.address[0]}
              </Text>
            ))}
            <Text color={Colors[colorScheme].badgeText}></Text>
          </View>
          {/** PROFILE IMAGE */}
          <ProfileImage userId={user.id} profilePhoto={user.profilePhoto} />
        </View>
      </View>

      {/** PREFFERED CONTENT */}
        <ProfilePrefCategory
          compName={"Tercih Edilen Kategoriler"}
          prefName={"category"}
          open={openCategory}
          setOpen={setOpenCategory}
          disableCategory={disableCategory}
        />

        <ProfilePrefProduct
          compName={"Tercih Edilen Ürünler"}
          prefName={"product"}
          open={openProduct}
          setDisableCategory={setDisableCategory}
          setOpen={setOpenProduct}
          listItem={user.prefferedProduct}
        />
    </View>
  );
}
