import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const useTransactionType = () => {
	const { transactionsType } = useParams()

	const transactions = useSelector(
		state => state.transactions[transactionsType]
	)
	return { transactions, transactionsType }
}
