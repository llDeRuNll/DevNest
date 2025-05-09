<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import s from './TransactionsItem.module.css'
import { croppedDate } from '../utils/croppedDate'
import { croppedComment } from '../utils/croppedComment'

const TransactionsItem = ({ data: { category, comment, date, time, sum } }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<tr>
			<td>{category}</td>
			<td>{croppedComment(comment, windowWidth)}</td>
			<td>{croppedDate(date.replaceAll('-', '/'), windowWidth)}</td>
			<td>{time}</td>
			<td>{sum}</td>
			<td>
				<div className={s.buttons}>
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
>>>>>>> 4e9ea20416a868658c947df04bacdd7210cb9351
	)
}

export default TransactionsItem
