import { createSlice } from "@reduxjs/toolkit";
import {getGuardRequest} from '../service/requestService'


const popularSellerSlice = createSlice({
    name:'popularSeller',
    initialState:{
        sellers:[]
    },
    reducers: {
        getPopularSellers:(state,action) => {
            state.sellers = action.payload
        }
    }
})


export const getPopularSellersDispatch = () => async(dispatch) => {
    await getGuardRequest({controller:'user'}).then(res => {
        dispatch(getPopularSellers(res.data))
    })
}



export const {getPopularSellers} = popularSellerSlice.actions
export default popularSellerSlice.reducer;