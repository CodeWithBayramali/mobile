import {createSlice} from '@reduxjs/toolkit'
import { getGuardRequest } from '../service/requestService'


const categorySlice = createSlice({
    name:'category',
    initialState:{
        categories:[]
    },
    reducers:{
        getCategories:(state,action)=> {
            state.categories = action.payload
        }
    }
})


export const getCategoriesDispatch = () => async(dispatch) => {
    await getGuardRequest({controller:'category'}).then(res=> {
        dispatch(getCategories(res.data))
    })
}


export const {getCategories} = categorySlice.actions;
export default categorySlice.reducer;