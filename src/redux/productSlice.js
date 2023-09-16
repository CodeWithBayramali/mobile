import {createSlice} from '@reduxjs/toolkit'
import { getGuardRequest } from '../service/requestService'

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[]
    },
    reducers:{
        getProducts:(state,action) => {
            state.products = action.payload
        }
    }
})


export const getProductsDispatch = (categoryName) => async(dispatch) => {
    await getGuardRequest({controller:`product/${categoryName}`}).then(res=> {
        dispatch(getProducts(res.data))
    })
}


export const {getProducts} = productSlice.actions;
export default productSlice.reducer;