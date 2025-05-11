import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import s from './TransactionsItem.module.css'
import { croppedComment } from '../../utils/croppedComment'
import { croppedCategory } from '../../utils/croppedCategory'
import { normalizeData } from '../../utils/normalizeData'
import { transactionDelete } from '../../redux/transactions/operations'
import TransactionForm from '../TransactionForm/TransactionForm'

const TransactionsItem = ({
	transaction: { _id, type, category, comment, date, time, sum },
	userWindowWidth,
}) => {
	const dispatch = useDispatch()
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const handleDelete = async () => {
		try {
			await dispatch(transactionDelete({ _id, type })).unwrap()
			toast.success('Транзакцію видалено')
		} catch (err) {
			toast.error(err.message || 'Помилка при видаленні')
		}
	}

	return (
		<>
			<div className={s.tableRow}>
				<p className={s.tableCell}>
					{croppedCategory(category.categoryName, userWindowWidth)}
				</p>
				<p className={s.tableCell}>
					{croppedComment(comment, userWindowWidth)}
				</p>
				<p className={s.tableCell}>{normalizeData(date, userWindowWidth)}</p>
				<p className={s.tableCell}>{time}</p>
				<p className={s.tableCell}>{`${sum} / UAH`}</p>
				<div className={s.actionButtonsWrapper}>
					<button
						className={s.editButton}
						type='button'
						onClick={() => setIsEditModalOpen(true)}
					>
						<FiEdit2 className={s.buttonIcon} color='#0c0d0d' />
						<span>Edit</span>
					</button>
					<button
						className={s.deleteButton}
						type='button'
						onClick={handleDelete}
					>
						<FiTrash2 className={s.buttonIcon} color=' #fafafa' />
						<span>Delete</span>
					</button>
				</div>
			</div>

			{/* модалка з формою */}
			{isEditModalOpen && (
				<div className={s.backdrop} onClick={() => setIsEditModalOpen(false)}>
					<div className={s.modalContent} onClick={e => e.stopPropagation()}>
						<TransactionForm
							transaction={{
								_id,
								type,
								category: category._id,
								date,
								time,
								sum,
								comment,
							}}
							isModal={true}
							onClose={() => setIsEditModalOpen(false)}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default TransactionsItem
