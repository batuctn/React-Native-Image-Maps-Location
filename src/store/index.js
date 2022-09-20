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
    logout: (state) => {
      state.user = null;
    },
  },
});
const favListSlice = createSlice({
  name: 'favList',
  initialState: {
    favList: [],
    songList: [],
  },
  reducers: {
    setFav: (state, action) => {
      state.favList = [...state.favList, action.payload];
    },
    setUnFav: (state, action) => {
      state.favList = state.favList.filter((item) => item.valueId !== action.payload);
    },
    setSongList: (state, action) => {
      state.songList = action.payload;
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

export const { setUser, logout } = userSlice.actions;
export const { setFav, setUnFav, setSongList } = favListSlice.actions;
export const { toggleTheme } = themeSlice.actions;

export const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    favList: favListSlice.reducer,
    theme: themeSlice.reducer,
  }),
});