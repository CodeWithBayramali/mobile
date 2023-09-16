import {
  Dimensions,
  Keyboard,
  Platform,
  useColorScheme,
  View,
  TouchableWithoutFeedback
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Input,
  Pressable,
  Icon,
  KeyboardAvoidingView,
  FormControl,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { loginDispatch } from "../../redux/auth/authSlice";
import { loginValidate } from "../../utils/validations/loginValidation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const {login} = useContext(AuthContext)

  const _handleSubmit = (values, { resetForm }) => {
    login(values)
    // resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "100px"} style={{backgroundColor:Colors[colorScheme].background}}>
      
        <Formik
          initialValues={{
            emailOrPhoneNumber: "",
            password: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={loginValidate}
        >
          {({
            values,
            touched,
            handleSubmit,
            handleChange,
            errors,
            setFieldTouched,
          }) => (
            <View
              style={{
                width: "100%",
                height: "100%",
                rowGap: width * 0.06,
                paddingHorizontal: width * 0.06,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Heading size="2xl" color={Colors[colorScheme].mainColor}>
                Hoş Geldiniz
              </Heading>
              <FormControl
                isInvalid={
                  errors.emailOrPhoneNumber && touched.emailOrPhoneNumber
                }
              >
                <Input
                  type="text"
                  placeholderTextColor={
                    Colors[colorScheme].placeholderTextColor
                  }
                  borderColor={Colors[colorScheme].borderColor}
                  fontSize={"md"}
                  color={Colors[colorScheme].text}
                  keyboardType="email-address"
                  py={Platform.OS === "ios" ? "4" : "2"}
                  variant="rounded"
                  placeholder="Email veya Telefon"
                  value={values.emailOrPhoneNumber}
                  onChangeText={handleChange("emailOrPhoneNumber")}
                  onBlur={() => setFieldTouched("emailOrPhoneNumber")}
                />
                {errors.emailOrPhoneNumber && (
                  <FormControl.ErrorMessage>
                    {" "}
                    {errors.emailOrPhoneNumber}{" "}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.password && touched.password}>
                <Input
                  type={show ? "text" : "password"}
                  variant="rounded"
                  fontSize="md"
                  color={Colors[colorScheme].text}
                  placeholderTextColor={
                    Colors[colorScheme].placeholderTextColor
                  }
                  borderColor={Colors[colorScheme].borderColor}
                  py={Platform.OS === "ios" ? "4" : "2"}
                  InputLeftElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        ml="2"
                      />
                    </Pressable>
                  }
                  placeholder="Parola"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                />
                {errors.password && (
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <Button
                onPress={handleSubmit}
                w={"full"}
                rounded="full"
                colorScheme="success"
                size="lg"
                mt="4"
                zIndex={1000}
              >
                Giriş Yap
              </Button>
            </View>
          )}
        </Formik>
      
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
