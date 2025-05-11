import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import { authReducer } from './auth/slice'
import { categoryReducer } from './category/slice'
import { transactionsReducer } from './transactions/slice'
import { configureStore } from '@reduxjs/toolkit'

import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
const persistConfig = {
	key: 'root-auth',
	storage,
	version: 1,
	whitelist: ['refreshToken', 'sid', 'transactions', 'category'],
}

export const store = configureStore({
	reducer: {
		auth: persistReducer(persistConfig, authReducer),
		category: categoryReducer,
		transactions: transactionsReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)
