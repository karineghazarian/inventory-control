import { createSlice, current } from '@reduxjs/toolkit'
import uuid4 from 'uuid4';

const initialState = {
  value: []
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct: (state, action)=> {
        state.value.push({ ...action.payload, id: uuid4() });
    },
    editProduct: (state, action)=>{
      const stateValue = current(state.value);
      const itemIndex = stateValue.findIndex((product)=> product.id === action.payload.id);
      if(itemIndex !== -1)
      {
        state.value[itemIndex] = {
          ...stateValue[itemIndex],
          ...action.payload
        };
      }
    },
    deleteProduct: (state, action) => {
      const stateValue = current(state.value);
      state.value = stateValue.filter((product)=> product.id !== action.payload);    
    }
  },
})

export const { createProduct, getProductById, editProduct, deleteProduct } = productsSlice.actions

export default productsSlice.reducer