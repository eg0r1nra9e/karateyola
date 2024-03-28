import { ICategory } from './../../types/ICategory'
import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { TAppState } from '../store'
interface ICategoriesState {
  categories: ICategory[]
}

const initialState: ICategoriesState = {
  categories: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      const category = { ...action.payload, id: uuidv4() }
      state.categories = [...state.categories, category]
    },
    editCategory: (state, action: PayloadAction<ICategory>) => {
      const category = state.categories.find((category) => category.id === action.payload.id)
      category.name = action.payload.name
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    },
  },
})

export const { addCategory, removeCategory, editCategory } = categoriesSlice.actions

export const selectCategories = (state: TAppState) => state.categories.categories
export const selectCategory = (state: TAppState, categoryId: string) =>
  state.categories.categories.find((category) => category.id === categoryId)

export default categoriesSlice.reducer
