import { View, Platform, Dimensions, FlatList, LogBox, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Text, Box, Heading, Select, CheckIcon, ScrollView } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDispatch } from "../../redux/productSlice";
import {
  addProduct,
  deleteProduct,
  selectProductDispatch,
} from "../../redux/userSlice";

const { width } = Dimensions.get("window");

export default function ProfilePrefProduct({
  compName,
  setOpen,
  open,
  setDisableCategory,
}) {
  const colorScheme = useColorScheme();
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const { user, prefProduct } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const disableCategory = () => {
    setOpen(true);
    setDisableCategory(true);
  };
  const openCategorySendProduct = () => {
    setOpen(false);
    setDisableCategory(false);
    dispatch(selectProductDispatch(user.id, prefProduct));
  };

  return (
    <View style={{ marginVertical: width * 0.06 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 12,
        }}
      >
        <Heading color={Colors[colorScheme].text} size="lg">
          {compName}
        </Heading>

        {!open ? (
          <TouchableOpacity onPress={() => disableCategory()}>
          <Text color="darkBlue.400" fontSize="md" >Düzenle</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => openCategorySendProduct()}>
          <AntDesign
            name="checkcircle"
            size={28}
            color="green"
          />
          </TouchableOpacity>
        )}
      </View>
      <Box display={open ? "flex" : "none"} mt="3" mx="2">
        <Select
          accessibilityLabel="Kategori Seçiniz"
          borderColor="gray.100"
          borderWidth={0.2}
          pl={Platform.OS === "android" && "3"}
          py="3"
          mt="4"
          display={open ? "flex" : "none"}
          color={Colors[colorScheme].placeholderTextColor}
          size="xl"
          placeholder="Kategori Seçiniz"
          _selectedItem={{ endIcon: <CheckIcon size="2" />, bg: "teal.600" }}
          onValueChange={(itemValue) =>
            dispatch(getProductsDispatch(itemValue))
          }
        >
          {categories.map((item, index) => (
            <Select.Item
              key={index}
              label={item.name}
              value={item.name}
            ></Select.Item>
          ))}
        </Select>

        <Select
          accessibilityLabel="Ürün Seçiniz"
          borderColor="gray.100"
          borderWidth={0.2}
          pl={Platform.OS === "android" && "3"}
          py="3"
          mt="4"
          display={open ? "flex" : "none"}
          color="black"
          size="xl"
          placeholder="Ürün Seçiniz"
          _selectedItem={{ endIcon: <CheckIcon size="2" />, bg: "teal.600" }}
          onValueChange={(itemValue) => dispatch(addProduct(itemValue))}
        >
          {products.map((item, index) => (
            <Select.Item
              key={index}
              label={item.name}
              value={item.name}
            ></Select.Item>
          ))}
        </Select>
      </Box>
      <Box flexDirection="row" flexWrap="wrap">
        {prefProduct?.map((item, index) => (
          <Box
            key={index}
            px="1.5"
            py={Platform.OS === "ios" ? "1" : "1"}
            mt="3"
            ml="2"
            rounded="full"
            borderColor={Colors[colorScheme].borderColor}
            background={Colors[colorScheme].genelBackground}
            shadow="0"
            borderWidth="1"
            flexDirection="row"
            alignItems="center"
          >
            <Text style={{ color: Colors[colorScheme].text, paddingRight: 5 }}>
              {item}
            </Text>
            <MaterialIcons
              onPress={() => dispatch(deleteProduct(item))}
              style={{ display: open ? "flex" : "none" }}
              name="cancel"
              size={18}
              color="red"
            />
          </Box>
        ))}
      </Box>
    </View>
  );
}
