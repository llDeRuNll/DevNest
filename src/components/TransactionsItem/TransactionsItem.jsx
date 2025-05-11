import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import s from './TransactionsItem.module.css'
import { croppedComment } from '../../utils/croppedComment'
import { croppedCategory } from '../../utils/croppedCategory'
import { transactionDelete } from '../../redux/transactions/operations'
import { useDispatch } from 'react-redux'
import { normalizeData } from '../../utils/normalizeData'

const TransactionsItem = ({
	transaction: { _id, type, category, comment, date, time, sum },
	windowWidth,
}) => {
	const dispatch = useDispatch()

	const handleEdit = () => {
		// ...
	}

	const handleDelete = () => {
		dispatch(transactionDelete({ _id, type, sum }))
	}

	return (
		<div className={s.tableRow}>
			<p className={s.tableCell}>
				{croppedCategory(category.categoryName, windowWidth)}
			</p>
			<p className={s.tableCell}>{croppedComment(comment, windowWidth)}</p>
			<p className={s.tableCell}>{normalizeData(date, windowWidth)}</p>
			<p className={s.tableCell}>{time}</p>
			<p className={s.tableCell}>{`${sum} / UAH`}</p>
			<div className={s.actionButtonsWrapper}>
				<button className={s.editButton} type='button' onClick={handleEdit}>
					<FiEdit2 className={s.buttonIcon} color='#0C0D0D' />
					<span>Edit</span>
				</button>
				<button className={s.deleteButton} type='button' onClick={handleDelete}>
					<FiTrash2 className={s.buttonIcon} color='#FAFAFA' />
					<span>Delete</span>
				</button>
			</div>
		</div>
	)
}

export default TransactionsItem
