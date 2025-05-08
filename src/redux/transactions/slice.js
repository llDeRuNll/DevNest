import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
	userAvatarChange,
	userAvatarDelete,
	userCurrent,
	userInfoUpdate,
	userLogin,
	userLogout,
	userRefresh,
	userRegister,
} from '../auth/operations'
import {
	categoryChangeInfo,
	categoryDelete,
	categoryGetAll,
	categoryPost,
} from '../category/operations'
import {
	transactionsGetByType,
	transactionPost,
	transactionDelete,
	transactionChangeInfo,
} from './operations'

const initialState = {
	items: [],
	transactionsTotal: {
		incomes: null,
		expences: null,
	},
	error: null,
	isLoading: false,
}

const allOperations = [
	userLogin,
	userLogout,
	userRegister,
	userRefresh,
	userCurrent,
	userInfoUpdate,
	userAvatarChange,
	userAvatarDelete,
	categoryPost,
	categoryGetAll,
	categoryChangeInfo,
	categoryDelete,
	transactionPost,
	transactionsGetByType,
	transactionDelete,
	transactionChangeInfo,
]

const allOperationsCertainResalt = resalt => {
	switch (resalt) {
		case 'pending':
			return allOperations.map(el => el.pending)
		case 'rejected':
			return allOperations.map(el => el.rejected)
		case 'fulfilled':
			return allOperations.map(el => el.fulfilled)
		default:
			console.log('only pending, rejected or fulfilled')
	}
}

const slice = createSlice({
	name: 'transactionsSlice',
	initialState,



export const transactionsReduser = slice.reducer
