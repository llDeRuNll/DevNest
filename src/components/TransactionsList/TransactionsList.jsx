import s from './TransactionsList.module.css'
import TransactionEmpty from '../TransactionEmpty/TransactionEmpty'
import { searchSelection } from '../../utils/searchSelection'
import { useEffect, useState } from 'react'
import TransactionsItem from '../TransactionsItem/TransactionsItem'

const TransactionsList = ({
	transactions,
	windowWidth,
	selectedDate,
	searchQuery,
	hasUserPickedDate,
}) => {
	const [filteredTransactions, setFilteredTransactions] = useState([])

	useEffect(() => {
		setFilteredTransactions(
			searchSelection(
				transactions,
				searchQuery,
				selectedDate,
				hasUserPickedDate
			)
		)
	}, [transactions, searchQuery, selectedDate, hasUserPickedDate])

	return (
		<>
			{filteredTransactions?.length === 0 ? (
				<TransactionEmpty />
			) : (
				<div className={s.tableWrapper}>
					<div className={s.tableHeaderWrapper}>
						<p className={s.tableHeaderCell}>Category</p>
						<p className={s.tableHeaderCell}>Comment</p>
						<p className={s.tableHeaderCell}>Date</p>
						<p className={s.tableHeaderCell}>Time</p>
						<p className={s.tableHeaderCell}>Sum</p>
						<p className={s.tableHeaderCell}>Actions</p>
					</div>
					<div className={s.tableBodyWrapper}>
						{filteredTransactions?.map(transaction => (
							<TransactionsItem
								key={transaction._id}
								transaction={transaction}
								windowWidth={windowWidth}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default TransactionsList
