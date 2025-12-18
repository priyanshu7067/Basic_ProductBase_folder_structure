import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage use karne ke liye
import userReducer from "./slice/userSlice";

const persistConfig = {
  key: "user",
  storage,
  
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Store setup
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
