import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    activeTheme: 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      return {
        activeTheme: state.activeTheme === 'light' ? 'dark' : 'light',
      };
    },
  },
});
const imageSlice = createSlice({
  name: 'image',
  initialState: {
    image: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = {
        ...state.image,
        ...action.payload,
      }
    },
   
  },
});

export const { setUser, logout,updateUser } = userSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export const { setImage } = imageSlice.actions;

export const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    image: imageSlice.reducer,
  }),
});