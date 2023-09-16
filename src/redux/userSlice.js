import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest, postGuardRequest, putGuardRequest } from "../service/requestService";
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:{},
        prefCategory:[],
        prefProduct:[]
    },
    reducers:{
        getUser:(state,action)=> {
            state.user = action.payload
            state.prefCategory = action.payload.prefferedCategory !== null || undefined ? action.payload.prefferedCategory:[]
            state.prefProduct = action.payload.prefferedProduct !== null || undefined ? action.payload.prefferedProduct:[]
        },
        addCategory:(state,action)=> {
            if(state.prefCategory !== null) {
                let findItem = state.prefCategory.find(item => item === action.payload)
                if(findItem === undefined || null){
                    state.prefCategory.push(action.payload)
                }else{Toast.show({type:'error',text1:'Kategori zaten eklendi !'})}
            }else{
                state.prefCategory.push(action.payload)
            }
        },
        addProduct:(state,action)=> {
            if(state.prefProduct !== null) {
                let findItem = state.prefProduct.find(item => item === action.payload)
                if(findItem === undefined || null) {
                    state.prefProduct.push(action.payload)
                }else{Toast.show({type:'error',text1:'Ürün zaten eklendi !'})}
            }else {
                state.prefProduct.push(action.payload)
            }
        },
        deleteCategory:(state,action)=> {
            let index = state.prefCategory.indexOf(action.payload)
            state.prefCategory.splice(index,1)
        },
        deleteProduct:(state,action) => {
            let index = state.prefProduct.indexOf(action.payload)
            state.prefProduct.splice(index,1)
        }
    }
})

export const getUserDispatch = (id) => async(dispatch) => {
    await getGuardRequest({controller:'user',action:'user'},id).then(res=> {
        dispatch(getUser(res.data))
    })
}

export const getUsersPageable = () => async(dispatch) => {
    await getGuardRequest({controller:'user'})
}

export const selectCategoryDispatch = (id,body) => async(dispatch) => {
    await putGuardRequest({controller:'user',action:'prefferedcategory'},id,body).then(res=> {
        try{
            if(res.data.success){
                return Toast.show({type:'success',text1:res.data.message})
            }
            else
                return Toast.show({type:'error',text1:res.data.message})
        }catch(e) {
            return Toast.show({type:'error',text1:e})
        }
    })
}

export const selectProductDispatch = (id,body) => async(dispatch) => {
    await putGuardRequest({controller:'user',action:'prefferedproduct'},id,body).then(res=> {
        try{
            if(res.data.success){
                return Toast.show({type:'success',text1:res.data.message})
            }else {
                return Toast.show({type:'error',text1:res.data.message})
            }
        }catch(e){
            return Toast.show({type:'error',text1:`Beklenmedik bir sorun ile karşılaşıldı ${e}`})
        }
    })
}

export const changeProfilePhotoDispatch = (image) => async(dispatch) => {
    const userId = await AsyncStorage.getItem('@userId')
    try{
        postGuardRequest({controller:'user',action:`profileImage/${userId}`},image).then(res=> {
            if(res.data.success){
                dispatch(getUserDispatch(userId))
                Toast.show({type:'success',text1:res.data.message})
            }
            else
                Toast.show({type:'error',text1:res.data.message})
        })
    }catch (e) {
        console.log(e)
    }
}

export const {getUser,addCategory,deleteCategory,addProduct,deleteProduct} = userSlice.actions;
export default userSlice.reducer;