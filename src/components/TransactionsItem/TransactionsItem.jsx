import { useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import s from './TransactionsItem.module.css'
import { croppedComment } from '../../utils/Transaction/croppedComment'
import { croppedCategory } from '../../utils/Transaction/croppedCategory'
import { normalizeData } from '../../utils/Transaction/normalizeData'
import TransactionForm from '../TransactionForm/TransactionForm'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import { useConfirmDeleteTransaction } from '../../hooks/Modal/useConfirmDeleteTransaction'
import { useModal } from '../../utils/Modal/useModal'

const TransactionsItem = ({
	transaction: { _id, type, category, comment, date, time, sum },
	userWindowWidth,
}) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const confirmDelete = useConfirmDeleteTransaction()
	const { isModalOpen, openModal } = useModal()

	return (
		<>
			{isModalOpen && (
				<ModalConfirm
					title='Are you sure you want to delete this transaction?'
					confirmButton='Delete'
					confirmFc={() => confirmDelete(_id, type)}
				/>
			)}
			<div className={s.tableRow}>
				<p className={s.tableCell} title={category.categoryName}>
					{croppedCategory(category.categoryName, userWindowWidth)}
				</p>
				<p className={s.tableCell} title={comment}>
					{croppedComment(comment, userWindowWidth)}
				</p>
				<p className={s.tableCell} title={normalizeData(date)}>
					{normalizeData(date, userWindowWidth)}
				</p>
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
					<button className={s.deleteButton} type='button' onClick={openModal}>
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
