import s from './TransactionsList.module.css'
import TransactionsItem from '../TransactionsItem/TransactionsItem'
import TransactionEmpty from '../TransactionEmpty/TransactionEmpty'
import { searchSelection } from '../../utils/searchSelection'
import { useEffect, useState } from 'react'

const TransactionsList = ({
	transactions,
	windowWidth,
	startDate,
	userValue,
}) => {
	const [filteredTransactions, setFilteredTransactions] = useState([])

	useEffect(() => {
		setFilteredTransactions(searchSelection(transactions, userValue, startDate))
	}, [transactions, userValue, startDate])

	return (
		<>
			{filteredTransactions?.length === 0 ? (
				<TransactionEmpty />
			) : (
				<div className={s.tableWrapper}>
					<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Comment</th>
								<th>Date</th>
								<th>Time</th>
								<th>Sum</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredTransactions?.map(transaction => (
								<TransactionsItem
									key={transaction._id}
									data={transaction}
									windowWidth={windowWidth}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	)
}

export default TransactionsList
