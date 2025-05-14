import React, { useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import s from './TransactionsItem.module.css'
import { croppedComment } from '../../utils/Transaction/croppedComment'
import { normalizeData } from '../../utils/Transaction/normalizeData'
import TransactionForm from '../TransactionForm/TransactionForm'

const truncate = (str, maxChars = 8) =>
	str.length > maxChars ? `${str.slice(0, maxChars)}...` : str

const TransactionsItem = ({
	transaction: {
		_id,
		type,
		category,
		comment,
		date,
		time,
		sum,
		currency = 'UAH',
	},
	userWindowWidth,
	setIsModalOpen,
	setTransactionToDelete,
}) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	return (
		<>
			<div className={s.tableRow}>
				<p className={s.tableCell} title={category.categoryName}>
					{truncate(category.categoryName)}
				</p>

				<p className={s.tableCell} title={comment}>
					{croppedComment(comment, userWindowWidth)}
				</p>

				<p className={s.tableCell} title={normalizeData(date)}>
					{normalizeData(date, userWindowWidth)}
				</p>

				<p className={s.tableCell}>{time}</p>

				<p className={s.tableCell}>{`${sum} / ${currency}`}</p>

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
						onClick={() => {
							setTransactionToDelete({ _id, type, sum })
							setIsModalOpen(true)
						}}
					>
						<FiTrash2 className={s.buttonIcon} color='#fafafa' />
						<span>Delete</span>
					</button>
				</div>
			</div>

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
								currency,
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
