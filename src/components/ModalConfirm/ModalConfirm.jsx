import s from './ModalConfirm.module.css'
import { IoMdClose } from 'react-icons/io'

const ModalConfirm = ({ title, confirmButton, confirmFc, setIsModalOpen }) => {
	const handleOverlayClick = event => {
		if (event.target === event.currentTarget) {
			setIsModalOpen(false)
		}
	}

	return (
		<div className={s.modalOverlay} onClick={handleOverlayClick}>
			<div className='container'>
				<div className={s.modal}>
					<button
						className={s.closeButton}
						onClick={() => setIsModalOpen(false)}
					>
						<IoMdClose className={s.closeIcon} />
					</button>
					<p className={s.modalTitle}>{title}</p>
					<div className={s.buttonsWrapper}>
						<button
							className={s.logoutButton}
							type='button'
							onClick={() => {
								confirmFc()
								setIsModalOpen(false)
							}}
						>
							{confirmButton}
						</button>
						<button
							className={s.cancelButton}
							type='button'
							onClick={() => setIsModalOpen(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalConfirm
