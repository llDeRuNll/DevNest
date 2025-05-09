import React from 'react'
import s from './TransactionsList.module.css'
import TransactionsItem from '../TransactionsItem/TransactionsItem'
import transactions from './transactions.json'

const TransactionsList = () => {
	return (
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
					{transactions?.map(transaction => (
						<TransactionsItem key={transaction.id} data={transaction} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TransactionsList
