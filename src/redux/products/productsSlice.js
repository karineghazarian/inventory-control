import { createSlice } from '@reduxjs/toolkit'
import uuid4 from 'uuid4';

const initialState = {
  value: []
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    create: (state, action)=> {
        const id = uuid4();
        state.value.push({
          ...action.payload,
          id
        });
    },
  },
})

export const { create } = productsSlice.actions

export default productsSlice.reducer