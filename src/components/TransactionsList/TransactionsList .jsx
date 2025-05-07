import React, { useEffect, useState } from 'react'
import s from './TransactionsList.module.css'
import { FiEdit2 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import transactions from './transactions.json'

const TransactionsList = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const croppedComment = text => {
		if (windowWidth < 767 && text.length > 8 && text.length < 12) {
			return text.slice(0, 4).padEnd(7, '...')
		} else if (windowWidth < 767 && text.length > 12) {
			return text.slice(0, 7).padEnd(10, '...')
		} else if (
			windowWidth > 767 &&
			windowWidth < 1440 &&
			text.length > 8 &&
			text.length < 12
		) {
			return text.slice(0, 6).padEnd(9, '...')
		} else if (windowWidth > 767 && windowWidth < 1440 && text.length > 12) {
			return text.slice(0, 8).padEnd(11, '...')
		} else if (windowWidth >= 1440 && text.length > 14) {
			return text.slice(0, 11).padEnd(14, '...')
		} else {
			return text
		}
	}

	const croppedDate = text => {
		if (windowWidth < 767 && text.length > 6) {
			return text.slice(0, 6).padEnd(9, '...')
		} else if (windowWidth > 767 && windowWidth < 1440 && text.length === 13) {
			return text.slice(0, 5).padEnd(8, '...')
		} else if (windowWidth > 767 && windowWidth < 1440 && text.length === 14) {
			return text.slice(0, 6).padEnd(9, '...')
		} else {
			return text
		}
	}

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
					{transactions?.map(({ id, category, comment, date, time, sum }) => (
						<tr key={id}>
							<td>{category}</td>
							<td>{croppedComment(comment)}</td>
							<td>{croppedDate(date)}</td>
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
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TransactionsList
