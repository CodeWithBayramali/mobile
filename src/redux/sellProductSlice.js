import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest, postGuardRequest } from "../service/requestService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message'

const sellProductSlice = createSlice({
    name:'sellProduct',
    initialState:{
        img1:'',
        img2:'',
        img3:'',
        img4:'',
        img5:'',
        sellProducts:[],
        sellProductsCategory:[],
        sellProduct:{},
        sellProductUser:{}
    },
    reducers: {
        selectPhoto: (state,action) => {
            switch (action.payload.selected) {
                case 'img1':
                    state.img1 = action.payload.uri
                    break;
                case 'img2':
                    state.img2 = action.payload.uri
                    break;
                case 'img3':
                    state.img3 = action.payload.uri
                    break;
                case 'img4':
                    state.img4 = action.payload.uri
                    break;
                case 'img5':
                    state.img5 = action.payload.uri
                    break;
            
                default:
                    return null;
            }
        },
        createSellProduct: () => {

        },
        deleteSellProduct: () => {

        },
        getSellProductByUserId: () => {
            
        },
        getSellProductsByUserId: (state,action) => {
            state.sellProducts= action.payload
        },
        getSellProductsByCategoryName: (state,action) => {
            state.sellProductsCategory = action.payload;
        }
    }
})


export const createSellProductDispatch = (formData,navigation,resetForm,setFinish,values) => async(dispatch) => {
    setFinish(true)
    await postGuardRequest({controller:'sellproduct',action:'createSellProduct'},formData).then(res=> {
        if(res.data.success){
            resetForm()
            values.category=''
            values.productName='',
            values.price=0,
            values.kg=0
            navigation.push('HomeNavigation')
            setFinish(false)
            Toast.show({type:'success',text1:res.data.message})
            
        }
        else
            Toast.show({type:'error',text1:res.data.message})
    })
}


export const getSellProductsByUserIdDispatch = () => async(dispatch) => {
    const userId = await AsyncStorage.getItem("@userId")
    await getGuardRequest({controller:"sellproduct",action:`getUserSellProductsByUserId`},userId).then(res=> {
        dispatch(getSellProductsByUserId(res.data))
    })
}

export const getSellProductsByCategoryNameDispatch = (categoryName,navigation) => async (dispatch) => {
    await getGuardRequest({controller:"sellproduct",action:`getSellProductsByCategoryName/${categoryName}`}).then(res=> {
        if(res.data.success) {
            dispatch(getSellProductsByCategoryName(res.data.data))
            navigation.push('SellProductCategoryList',{categoryN:categoryName})
        }else {
            Toast.show({type:'error',text1:res.data.message})
        }
        
    })
}


export const {
    selectPhoto,
    createSellProduct,
    deleteSellProduct,
    getSellProductByUserId,
    getSellProductsByUserId,
    getSellProductsByCategoryName
} = sellProductSlice.actions
export default sellProductSlice.reducer