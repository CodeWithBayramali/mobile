import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import popularSellerSlice from "./popularSellerSlice";
import sellProductSlice from "./sellProductSlice";


const customizeMiddleWare = getDefaultMiddleware({
    serializableCheck:false
})

export default store = configureStore({
    reducer:{
        user:userSlice,
        category:categorySlice,
        product:productSlice,
        popularSeller:popularSellerSlice,
        sellProduct:sellProductSlice
    },
    middleware:customizeMiddleWare
})