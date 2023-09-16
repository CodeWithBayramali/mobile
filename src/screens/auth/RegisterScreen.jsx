import {
  Keyboard,
  useColorScheme,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import {
  Input,
  Text,
  KeyboardAvoidingView,
  Button,
  Heading,
  Pressable,
  FormControl,
  Icon,
  HStack,
  Select,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import MaskInput from "react-native-mask-input";
import { useDispatch } from "react-redux";
import { registerDispatch } from "../../redux/auth/authSlice";
import { registerValidation } from "../../utils/validations/registerValidation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_APIKEY,API_AUTH_URI } from '@env'
import axios from "axios";
import Toast from 'react-native-toast-message'

const { width } = Dimensions.get("window");

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const [phone,setPhone] = useState('')
  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [location,setLocation] = useState([])

  const _handleSubmit = (values, { resetForm }) => {
    axios.post(`${API_AUTH_URI}/register`,{...values,
      phoneNumber:phone,
      address:location,
      popularPoint:0,
      profilePhoto:"",
      prefferedCategory:[],
      prefferedProduct:[],
      popularPoint:0
    }).then(res=> {
      if(res.data.success) {
        Toast.show({type:'success',text1:res.data.message})
        navigation.navigate('LoginScreen')
        resetForm()
      }
      if(!res.data.success)
        return Toast.show({type:'error',text1:'Hata',text2:res.data.message})
    })

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        w={"full"}
        h={"full"}
        style={{
          rowGap: Platform.OS === "ios" ? width * 0.06 : width * 0.04,
          paddingHorizontal: width * 0.05,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:Colors[colorScheme].background
        }}
      >
        <Formik
          initialValues={{
            firstName: "",
            middleName: "",
            lastName: "",
            phoneNumber: phone,
            email: "",
            password: "",
            rePassword: "",
            popularPoint:0,
            profilePhoto:"",
            prefferedCategory:null,
            prefferedProduct:null
          }}
          onSubmit={_handleSubmit}
          validationSchema={registerValidation}
        >
          {({
            values,
            touched,
            handleSubmit,
            handleChange,
            errors,
            setFieldTouched,
          }) => (
            <>
              <Heading size="2xl" color={Colors[colorScheme].mainColor}>
                Naquet
              </Heading>

              {/* FIRST NAME & MIDDLE NAME */}
              <HStack space={2} justifyContent="space-between">
                <FormControl
                  w={width*0.42}
                  isInvalid={errors.firstName && touched.firstName}
                >
                  <Input
                    type="text"
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                    borderColor={Colors[colorScheme].borderColor}
                    fontSize={"sm"}
                    color={Colors[colorScheme].text}
                    keyboardType="default"
                    py={Platform.OS === "ios" ? "3" : "1.5"}
                    variant="outline"
                    placeholder="Ad"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={() => setFieldTouched("firstName")}
                  />
                  {errors.firstName && (
                    <FormControl.ErrorMessage>
                      {" "}
                      {errors.firstName}{" "}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  w={width*0.46}
                  isInvalid={errors.middleName && touched.middleName}
                >
                  <Input
                    type="text"
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                    borderColor={Colors[colorScheme].borderColor}
                    fontSize={"sm"}
                    color={Colors[colorScheme].text}
                    keyboardType="default"
                    py={Platform.OS === "ios" ? "3" : "1.5"}
                    variant="outline"
                    placeholder="İkinci Ad"
                    value={values.middleName}
                    onChangeText={handleChange("middleName")}
                    onBlur={() => setFieldTouched("middleName")}
                  />
                  {errors.middleName && (
                    <FormControl.ErrorMessage>
                      {" "}
                      {errors.middleName}{" "}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              </HStack>

              {/* LAST NAME , E-MAIL , PHONE */}

                <FormControl
                  isInvalid={errors.lastName && touched.lastName}
                >
                  <Input
                    type="text"
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                    borderColor={Colors[colorScheme].borderColor}
                    fontSize={"sm"}
                    color={Colors[colorScheme].text}
                    keyboardType="default"
                    py={Platform.OS === "ios" ? "3" : "1.5"}
                    variant="outline"
                    placeholder="Soyad"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={() => setFieldTouched("lastName")}
                  />
                  {errors.lastName && (
                    <FormControl.ErrorMessage>
                      {errors.lastName}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                    <GooglePlacesAutocomplete
                      placeholder="Adres seçiniz"
                      isRowScrollable={true}
                      minLength={2}
                      fetchDetails={false}
                      styles={{
                        container:{flex:0,zIndex:100,width:'100%',borderRadius:5},
                        textInput:{
                          height:42,color:Colors[colorScheme].text,backgroundColor:Colors[colorScheme].background,
                          borderColor:Colors[colorScheme].borderColor,borderWidth:1
                        },
                        description:{color:Colors[colorScheme].text},
                        row:{backgroundColor:Colors[colorScheme].darkModeBackground}
                    }}
                      onPress={(data,details=null)=> {
                        if(location !== [])
                           setLocation([])
                        setLocation([data.description]);
                      }}
                      enablePoweredByContainer={false}
                      debounce={400}
                      nearbyPlacesAPI="GooglePlacesSearch"
                      query={{key:GOOGLE_PLACES_APIKEY,language:'tr',components:'country:tr',}}
                    />
                </FormControl>

                <FormControl
                  isInvalid={errors.email && touched.email}
                >
                  <Input
                    type="text"
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                    fontSize={"sm"}
                    color={Colors[colorScheme].text}
                    keyboardType="email-address"
                    borderColor={Colors[colorScheme].borderColor}
                    py={Platform.OS === "ios" ? "3" : "1.5"}
                    variant="outline"
                    placeholder="E-mail"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                  />
                  {errors.email && (
                    <FormControl.ErrorMessage>
                      {" "}
                      {errors.email}{" "}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  isInvalid={errors.phoneNumber && touched.phoneNumber}
                >
                  <MaskInput
                  mask={['(', /\d/, /\d/,/\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                    keyboardType="phone-pad"
                    style={{borderColor:Colors[colorScheme].borderColor,borderWidth:1,paddingHorizontal:12,borderRadius:5,
                    paddingVertical:Platform.OS=== 'ios' ? 12:6,color:Colors[colorScheme].text}}
                    placeholder="(555) 555 55 55"
                    value={phone}
                    onChangeText={(masked,unmasked)=> {setPhone(masked)}}
                    onBlur={() => setFieldTouched("phoneNumber")}
                  />
                  <Text style={{position:'absolute',right:12,marginTop:10,fontSize:10}} color='indigo.800'>Opsiyonel</Text>
                  {errors.phoneNumber && (
                    <FormControl.ErrorMessage>
                      {errors.phoneNumber}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={errors.password && touched.password}>
                  <Input type={show ? "text" : "password"} 
                  variant='outline'
                  placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                  fontSize='md'
                  color={Colors[colorScheme].text}
                  borderColor={Colors[colorScheme].borderColor}
                  py={Platform.OS === "ios" ? "3" : "1.5"}
                  InputLeftElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} ml="2" />
                      </Pressable>} 
                      placeholder="Parola" 
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={()=> setFieldTouched('password')}
                   />
                   {
                       errors.password && 
                       <FormControl.ErrorMessage>
                         {errors.password}
                      </FormControl.ErrorMessage>
                      }
                  </FormControl>

                  <FormControl isInvalid={errors.rePassword && touched.rePassword}>
                  <Input type={show ? "text" : "password"} 
                  variant='outline'
                  placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                  fontSize='md'
                  color={Colors[colorScheme].text}
                  borderColor={Colors[colorScheme].borderColor}
                  py={Platform.OS === "ios" ? "3" : "1.5"}
                  InputLeftElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} ml="2" />
                      </Pressable>} 
                      placeholder="Parola Tekrar" 
                      value={values.rePassword}
                      onChangeText={handleChange('rePassword')}
                      onBlur={()=> setFieldTouched('rePassword')}
                   />
                   {
                       errors.rePassword && 
                       <FormControl.ErrorMessage>
                         {errors.rePassword}
                      </FormControl.ErrorMessage>
                      }
                  </FormControl>

              <Button
              onPress={handleSubmit}
                colorScheme={"fuchsia"}
                w={"full"}
                size="lg"
                variant="solid"
              >
                Kayıt Ol
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}