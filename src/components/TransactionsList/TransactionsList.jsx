import s from './TransactionsList.module.css'
import TransactionEmpty from '../TransactionEmpty/TransactionEmpty'
import { searchSelection } from '../../utils/Transaction/searchSelection'
import { useEffect, useState } from 'react'
import TransactionsItem from '../TransactionsItem/TransactionsItem'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import { useConfirmDeleteTransaction } from '../../hooks/Modal/useConfirmDeleteTransaction'
import { useUserContext } from '../../utils/UserContext/useUserContext'

const TransactionsList = ({
	transactions,
	userWindowWidth,
	selectedDate,
	searchQuery,
	hasUserPickedDate,
	transactionsType,
}) => {
	const [filteredTransactions, setFilteredTransactions] = useState([])
	const { isModalOpen, openModal } = useUserContext()
	const confirmDelete = useConfirmDeleteTransaction()
	const [transactionToDelete, setTransactionToDelete] = useState(null)

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
			{isModalOpen && (
				<ModalConfirm
					title='Are you sure you want to delete this transaction?'
					confirmButton='Delete'
					confirmFc={() => confirmDelete(transactionToDelete)}
				/>
			)}
			{filteredTransactions?.length === 0 ? (
				<TransactionEmpty transactionsType={transactionsType} />
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
								userWindowWidth={userWindowWidth}
								setTransactionToDelete={setTransactionToDelete}
								openModal={openModal}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default TransactionsList
