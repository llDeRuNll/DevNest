import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import s from './TransactionsItem.module.css'
import { croppedComment } from '../../utils/croppedComment'
import { croppedDate } from '../../utils/croppedDate'
import { croppedCategory } from '../../utils/croppedCategory'
import { transactionDelete } from '../../redux/transactions/operations'
import { useDispatch } from 'react-redux'
import { normalizeData } from '../../utils/normalizeData'

const TransactionsItem = ({
	data: { _id, type, category, comment, date, time, sum },
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
		<>
			<tr>
				<td>{croppedCategory(category.categoryName, windowWidth)}</td>
				<td>{croppedComment(comment, windowWidth)}</td>
				<td>{`Sn, ${croppedDate(normalizeData(date), windowWidth)}`}</td>
				<td>{time}</td>
				<td>{`${sum}/UAH`}</td>
				<td>
					<div className={s.buttonsWrapper}>
						<button className={s.editBtn} type='button' onClick={handleEdit}>
							<FiEdit2 className={s.icon} color='#0C0D0D' />
							<span>Edit</span>
						</button>
						<button
							className={s.deleteBtn}
							type='button'
							onClick={handleDelete}
						>
							<FiTrash2 className={s.icon} color='#FAFAFA' />
							<span>Delete</span>
						</button>
					</div>
				</td>
			</tr>
		</>
	)
}

export default TransactionsItem
