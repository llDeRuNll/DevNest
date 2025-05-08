import { createAsyncThunk } from '@reduxjs/toolkit'
import { trakerApi } from '../auth/operations'

export const transactionPost = createAsyncThunk(
	'transactions/post',
	async (transaction, thunkAPI) => {
		try {
			const response = await trakerApi.post('/transactions', transaction)
			return response.data
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message)
		}
	}
)

export const transactionsGetByType = createAsyncThunk(
	'transactions/getByType',
	async (params, thunkAPI) => {
		try {
			const response = await trakerApi.get('/transactions/' + params.type, '', {
				params: {
					date: params.date,
				},
			})
			return response.data
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message)
		}
	}
)

// приймає цілий об'єкт транзакції, а не тільки id
export const transactionDelete = createAsyncThunk(
	'transactions/delete',
	async ({ _id, type, sum }, thunkAPI) => {
		try {
			await trakerApi.delete('/transactions/' + _id)
			return { _id, type, sum }
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message)
		}
	}
)

export const transactionChangeInfo = createAsyncThunk(
	'transactions/change',
	async ({ _id, type, ...newInfo }, thunkAPI) => {
		try {
			const response = await trakerApi.patch(
				`/transactions/${type}/${_id}`,
				newInfo
			)
			return response.data
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message)
		}
	}
)
