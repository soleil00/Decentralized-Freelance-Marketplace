import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import appReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistSidebarReducer = persistReducer(persistConfig, sidebarReducer);
const peristAuthReducer = persistReducer(persistConfig, appReducer);

export function makeStore() {
  return configureStore({
    reducer: {
      auth: appReducer,
      jobs: jobReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          ignoredPaths: ["register"],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
}

const store = makeStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
