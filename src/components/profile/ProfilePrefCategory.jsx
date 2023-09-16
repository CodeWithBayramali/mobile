import { View, Platform, Dimensions, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Text, Box, Heading, Select, CheckIcon } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  selectCategoryDispatch,
} from "../../redux/userSlice";
import { getCategoriesDispatch } from "../../redux/categorySlice";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

export default function ProfilePrefCategory({
  compName,
  setOpen,
  open,
  disableCategory,
}) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { user, prefCategory } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesDispatch());
  }, [dispatch]);

  const updateCategory = () => {
    setOpen(false);
    dispatch(selectCategoryDispatch(user.id, prefCategory));
  };

  return (
    <View
      style={{
        marginTop: width * 0.13,
        display: disableCategory ? "none" : "flex",
      }}
    >
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
          <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            color="darkBlue.400"
            fontSize="md"
          >
            Düzenle
          </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => updateCategory()}>
          <AntDesign
            name="checkcircle"
            size={28}
            color="green"
          />
          </TouchableOpacity>
        )}
      </View>

      <Box display={open ? "flex" : "none"} mt="3">
        <Select
          selectedValue=""
          accessibilityLabel="Kategori Seçiniz"
          color="black"
          pl={"3"}
          mx={"3"}
          size="2xl"
          placeholder="Seç"
          _selectedItem={{ endIcon: <CheckIcon size="3" />, bg: "teal.600" }}
          onValueChange={(itemValue) => dispatch(addCategory(itemValue))}
        >
          {categories.map((item, index) => (
            <Select.Item
              key={index}
              label={item.name}
              value={item.name}
            ></Select.Item>
          ))}
        </Select>
      </Box>
      <Box flexWrap="wrap" flexDirection="row">
        {prefCategory?.map((item, index) => (
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
              onPress={() => dispatch(deleteCategory(item))}
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
