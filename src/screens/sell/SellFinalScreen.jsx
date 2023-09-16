import {
  View,
  Text,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Select } from 'native-base'
import React,{ useState } from "react";
import { AntDesign,FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ProgressiveImage from "../../components/common/ProgressiveImage";
import { Formik } from "formik";
import { getCategoriesDispatch } from "../../redux/categorySlice";
import { getProductsDispatch } from "../../redux/productSlice";
import CurrencyInput from "react-native-currency-input";
import { createSellProductDispatch } from "../../redux/sellProductSlice";

const { width, height } = Dimensions.get("window");

export default function SellFinalScreen() {
  const colorScheme = useColorScheme();
  const [finish,setFinish] = useState(false) 
  const {img1,img2,img3,img4,img5} = useSelector(state=> state.sellProduct)
  const [sellProField,setSellProField] = useState({product:"",category:""})
  const [price,setPrice] = useState()
  const [kg,setKg] = useState()
  const {categories} = useSelector(state=> state.category)
  const {products} = useSelector(state=> state.product)
  const {user} = useSelector(state=> state.user)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  useDispatch(()=> {
    dispatch(getCategoriesDispatch())
  },[dispatch])

  const imgFiles = [{uri:img1},{uri:img2},{uri:img3},{uri:img4},{uri:img5}]

  const _handleSubmit = async (values,{resetForm}) => {
    const formData = new FormData();
    formData.append('sellproduct',JSON.stringify({
      ...values,
      user:{userId:user.id,userName:`${user.firstName} ${user?.middleName} ${user.lastName}`,profilePhoto:user.profilePhoto},
      price:price,
      kg:Number(kg),
      category:sellProField.category,
      productName:sellProField.product
    }))

    imgFiles.forEach((file,index)=> {
      formData.append(`files`,{
        name: `images${index}.png`,
        type: 'image/jpg',
        uri: file.uri
      })
    })
    dispatch(createSellProductDispatch(formData,navigation,resetForm,setFinish,values))
    
  }

  return (

    !finish ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ padding: width * 0.04, rowGap: 12 }}>

      {/* VİEW PHOTOS */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
        onPress={()=> navigation.navigate("SellCameraScreen",{imgNumber:"img1"})}
          style={{
            borderRadius: 12,
            borderColor: Colors[colorScheme].borderColor,
            borderWidth: 0.8,
            width: width * 0.16,
            height: width * 0.16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            img1 != "" || null ?(
              <ProgressiveImage source={{uri:img1}} style={{width: width * 0.16,height: width * 0.16,}} />
            ):(
              <AntDesign name="plus" size={24} color={Colors[colorScheme].borderColor} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=> navigation.navigate("SellCameraScreen",{imgNumber:"img2"})}
          style={{
            borderRadius: 12,
            borderColor: Colors[colorScheme].borderColor,
            borderWidth: 0.8,
            width: width * 0.16,
            height: width * 0.16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
         {
            img2 != "" || null ?(
              <ProgressiveImage source={{uri:img2}} style={{width: width * 0.16,height: width * 0.16,}} />
            ):(
              <AntDesign name="plus" size={24} color={Colors[colorScheme].borderColor} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=> navigation.navigate("SellCameraScreen",{imgNumber:"img3"})}
          style={{
            borderRadius: 12,
            borderColor: Colors[colorScheme].borderColor,
            borderWidth: 0.8,
            width: width * 0.16,
            height: width * 0.16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            img3 != "" || null ?(
              <ProgressiveImage source={{uri:img3}} style={{width: width * 0.16,height: width * 0.16,}} />
            ):(
              <AntDesign name="plus" size={24} color={Colors[colorScheme].borderColor} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=> navigation.navigate("SellCameraScreen",{imgNumber:"img4"})}
          style={{
            borderRadius: 12,
            borderColor: Colors[colorScheme].borderColor,
            borderWidth: 0.8,
            width: width * 0.16,
            height: width * 0.16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            img4 != "" || null ?(
              <ProgressiveImage source={{uri:img4}} style={{width: width * 0.16,height: width * 0.16,}} />
            ):(
              <AntDesign name="plus" size={24} color={Colors[colorScheme].borderColor} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=> navigation.navigate("SellCameraScreen",{imgNumber:"img5"})}
          style={{
            borderRadius: 12,
            borderColor: Colors[colorScheme].borderColor,
            borderWidth: 0.8,
            width: width * 0.16,
            height: width * 0.16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            img5 != "" || null ?(
              <ProgressiveImage source={{uri:img5}} style={{width: width * 0.16,height: width * 0.16,}} />
            ):(
              <AntDesign name="plus" size={24} color={Colors[colorScheme].borderColor} />
            )
          }
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ fontSize: 9, color: Colors[colorScheme].text }}>
          * İlk fotoğraf ürünün kapak fotoğrafıdır.
        </Text>
        <Text style={{ fontSize: 9, color: Colors[colorScheme].text }}>
          * Lütfen fotoğraflarınızı ürünleri belirgin bir şekilde gösterecek
          biçimde ayarlayınız.
        </Text>
      </View>
        
        {/* PRODUCT INFORMATION */}
      <View style={{ rowGap: 12, marginTop:height*0.03 }}>
        <Formik
          initialValues={{
            user:{},
            productName:"",
            title:"",
            category:"",
            price:0,
            kg:0,
            images:[]
          }}
          onSubmit={_handleSubmit}
        >
          {
            ({values,touched,handleSubmit,handleChange,errors,setFieldTouched}) => (
              <>
              <View style={{ rowGap: 8 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: Colors[colorScheme].text,
                }}
              >
                Ürün Başlığı <Text style={{ fontSize: 12, color: "red" }}>*</Text>
              </Text>
              <TextInput
              value={values.title}
              onChangeText={handleChange("title")}
                style={{
                  borderWidth: 0.8,
                  borderColor: Colors[colorScheme].borderColor,
                  borderRadius: 5,
                  paddingLeft: 12,
                  paddingVertical: 12,
                  color: Colors[colorScheme].text,
                }}
              />
            </View>

            
            {/* CATEGORY & PRODUCT */}
            <View style={{ rowGap: 8 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: Colors[colorScheme].text,
                }}
              >
                Kategori <Text style={{ fontSize: 12, color: "red" }}>*</Text>
              </Text>
              <Select h='10' selectedValue={sellProField.category} placeholder="Kategori Seç"
              accessibilityLabel={sellProField.category}
              onValueChange={itemValue=> {
                setSellProField({...sellProField,category:itemValue})
                dispatch(getProductsDispatch(itemValue))
              }}
              color={Colors[colorScheme].text}
              fontSize={'md'}
              borderWidth='0.3'
                placeholderTextColor={Colors[colorScheme].placeholderTextColor} >
                 {
                     categories?.map((item,index)=> (
                         <Select.Item key={index} label={item.name} value={item.name} />
                     ))
                 }
                 </Select>
            </View>
    
            <View style={{ rowGap: 8 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: Colors[colorScheme].text,
                }}
              >
                Ürün <Text style={{ fontSize: 12, color: "red" }}>*</Text>
              </Text>
              <Select h='10' selectedValue={sellProField.product} placeholder="Kategori Seç"
              accessibilityLabel={sellProField.product}
              onValueChange={itemValue=> setSellProField({...sellProField,product:itemValue})}
              color={Colors[colorScheme].text}
              fontSize='md'
              borderWidth='0.3'
                placeholderTextColor={Colors[colorScheme].placeholderTextColor} >
                 {
                     products?.map((item,index)=> (
                         <Select.Item key={index} label={item.name} value={item.name} />
                     ))
                 }
                 </Select>
            </View>
            
            
    
            {/* Price & KG */}
            <View style={{ rowGap: 8,flexDirection:'row',justifyContent:'space-between' }}>
    
              <View style={{rowGap:8,width:'45%'}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: Colors[colorScheme].text,
                }}
              >
                Fiyat <Text style={{ fontSize: 12, color: "red" }}>*</Text>
              </Text>
              <CurrencyInput
                  value={price}
                  onChangeValue={setPrice}
                  delimiter="."
                  separator=","
                  precision={2}
                  minValue={0}
                  style={{
                    borderWidth: 0.8,
                    borderColor: Colors[colorScheme].borderColor,
                    borderRadius: 5,
                    paddingLeft: 12,
                    paddingVertical: 12,
                    color: Colors[colorScheme].text,
                  }}
              />
                <FontAwesome name="turkish-lira" size={18} color={Colors[colorScheme].placeholderTextColor}
                  style={{position:"absolute",right:height*0.01,bottom:height*0.02}}
                />
              </View>
    
              <View style={{rowGap:8,width:'45%'}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: Colors[colorScheme].text,
                }}
              >
                Kg/Adet <Text style={{ fontSize: 12, color: "red" }}>*</Text>
              </Text>
              <TextInput
              value={kg}
              onChangeText={setKg}
              inputMode="numeric"
                style={{
                  borderWidth: 0.8,
                  borderColor: Colors[colorScheme].borderColor,
                  borderRadius: 5,
                  paddingLeft: 12,
                  paddingVertical: 12,
                  color: Colors[colorScheme].text,
                }}
              />
              </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={{alignItems:'center',justifyContent:'center',marginTop:height*0.04}}>
            <AntDesign name="checkcircle" size={52} color={Colors[colorScheme].successTextColor} />
            </TouchableOpacity>
            </>
            )
          }
        </Formik>

      </View>
    </View>
    </TouchableWithoutFeedback>
    ):(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:Colors[colorScheme].mainColor,marginBottom:12}}>Lütfen Bekleyiniz...</Text>
        <ActivityIndicator size="large" color={Colors[colorScheme].mainColor} />
      </View>
    )

    
  
  
  );
}
