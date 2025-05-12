import { useState } from 'react'
import { ModalContext } from './ModalContext'

export const ModalProvider = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	)
}
