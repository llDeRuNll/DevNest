import { useUserContext } from '../../utils/UserContext/useUserContext'
import s from './ModalConfirm.module.css'
import { IoMdClose } from 'react-icons/io'

const ModalConfirm = ({ title, confirmButton, confirmFc }) => {
	const { closeModal } = useUserContext()

	const handleOverlayClick = event => {
		if (event.target === event.currentTarget) {
			closeModal()
		}
	}

	return (
		<div className={s.modalOverlay} onClick={handleOverlayClick}>
			<div className='container'>
				<div className={s.modal}>
					<button className={s.closeButton} onClick={() => closeModal()}>
						<IoMdClose className={s.closeIcon} />
					</button>
					<p className={s.modalTitle}>{title}</p>
					<div className={s.buttonsWrapper}>
						<button
							className={s.logoutButton}
							type='button'
							onClick={confirmFc}
						>
							{confirmButton}
						</button>
						<button
							className={s.cancelButton}
							type='button'
							onClick={() => closeModal()}
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
