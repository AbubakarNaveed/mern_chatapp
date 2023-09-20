import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../userSlice.js";
import MessageReducer from "../messageSlice";
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
// const reducer = combineReducers({
//   user: UserReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, UserReducer),
    message: persistReducer(persistConfig, MessageReducer),
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
