import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { openDB } from "idb";
import userSlice from "./user/user-slice";
import uiSlice from "./ui/ui-slice";
import featureSlice from "./feature/feature-slice";

async function createDB() {
  const db = await openDB("redux-persist", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("redux-store")) {
        db.createObjectStore("redux-store");
      }
    },
  });
  return db;
}

const customStorage = {
  async getItem(key) {
    const db = await createDB();
    return db.get("redux-store", key);
  },
  async setItem(key, value) {
    const db = await createDB();
    return db.put("redux-store", value, key);
  },
  async removeItem(key) {
    const db = await createDB();
    return db.delete("redux-store", key);
  },
};

const persistConfig = {
  key: "root",
  storage: customStorage,
  whitelist: ["user", "ui"],
};

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  feature: featureSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistedStore = persistStore(store);

export default store;
