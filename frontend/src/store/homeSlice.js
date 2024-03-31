import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    loading:true,
    menu:{},
    address:"",
    products:{},
    ordertext:"Order"
  },
  reducers: {
    getApiConfiguration:(state,action)=>{
      state.loading = action.payload;
    },
    getMenu:(state,action)=>{
      state.menu = action.payload;
    },
    setAddress:(state,action)=>{
      state.address = action.payload
    },
    setProducts:(state,action)=>{
      state.products = action.payload
    },
    setordertext:(state,action)=>{
      state.ordertext = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration,getMenu,setAddress,setProducts,setordertext} = homeSlice.actions

export default homeSlice.reducer