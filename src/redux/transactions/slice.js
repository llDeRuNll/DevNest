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
	expenses: [],
	incomes: [],
	transactionsTotal: {
		incomes: null,
		expenses: null,
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

const allOperationsCertainResult = result => {
	switch (result) {
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

	extraReducers: builder => {
		builder
			.addCase(userLogout.fulfilled, () => {
				return initialState
			})
			.addCase(userRefresh.rejected, () => {
				return initialState
			})
			.addCase(transactionPost.fulfilled, (state, action) => {
				state[action.payload.type].push(action.payload)
				state.transactionsTotal[action.payload.type] += action.payload.sum
			})
			.addCase(transactionsGetByType.fulfilled, (state, action) => {
				state[action.payload.type] = action.payload.items
			})
			.addCase(transactionDelete.fulfilled, (state, action) => {
				state[action.payload.type] = state[action.payload.type].filter(
					item => item._id != action.payload._id
				)
				state.transactionsTotal[action.payload.type] -= action.payload.sum
			})
			.addCase(transactionChangeInfo.fulfilled, (state, action) => {
				const changedTransaction = action.payload
				const index = state[changedTransaction.type].findIndex(
					item => item._id === changedTransaction._id
				)
				const prevSum = state[changedTransaction.type][index].sum
				state.transactionsTotal[changedTransaction.type] -= prevSum
				state[changedTransaction.type][index] = changedTransaction
				state.transactionsTotal[changedTransaction.type] +=
					changedTransaction.sum
			})
			.addMatcher(
				isAnyOf(userLogin.fulfilled, userCurrent.fulfilled),
				(state, action) => {
					if (action.payload.transactionsTotal) {
						state.transactionsTotal.incomes =
							action.payload.transactionsTotal.incomes
						state.transactionsTotal.expenses =
							action.payload.transactionsTotal.expenses
					}
				}
			)
			.addMatcher(isAnyOf(...allOperationsCertainResult('pending')), state => {
				state.isLoading = true
			})
			.addMatcher(
				isAnyOf(...allOperationsCertainResult('rejected')),
				(state, action) => {
					state.error = action.payload
					state.isLoading = false
				}
			)
			.addMatcher(
				isAnyOf(...allOperationsCertainResult('fulfilled')),
				state => {
					state.isLoading = false
					state.error = null
				}
			)
	},
})

export const transactionsReducer = slice.reducer
