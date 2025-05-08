import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import s from './TransactionsItem.module.css'
import { croppedComment } from '../../utils/croppedComment'
import { croppedDate } from '../../utils/croppedDate'

const TransactionsItem = ({
	data: { category, comment, date, time, sum },
	windowWidth,
}) => {
	return (
		<tr>
			<td>{category}</td>
			<td>{croppedComment(comment, windowWidth)}</td>
			<td>{croppedDate(date.replaceAll('-', '/'), windowWidth)}</td>
			<td>{time}</td>
			<td>{sum}</td>
			<td>
				<div className={s.buttonsWrapper}>
					<button className={s.editBtn} type='button'>
						<FiEdit2 className={s.icon} color='#0C0D0D' />
						<span>Edit</span>
					</button>
					<button className={s.deleteBtn} type='button'>
						<FiTrash2 className={s.icon} color='#FAFAFA' />
						<span>Delete</span>
					</button>
				</div>
			</td>
		</tr>
	)
}

export default TransactionsItem
