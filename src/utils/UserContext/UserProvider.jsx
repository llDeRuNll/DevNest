import { useState } from 'react'
import { UserContext } from '../Modal/ModalContext'

export const UserProvider = ({ children }) => {
	const savedTheme = localStorage.getItem('theme')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [userSelect, setUserSelect] = useState(savedTheme || 'dark')

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)
	const setTheme = theme => {
		setUserSelect(theme)
		localStorage.setItem('theme', theme)
	}

	return (
		<UserContext.Provider
			value={{ isModalOpen, openModal, closeModal, userSelect, setTheme }}
		>
			{children}
		</UserContext.Provider>
	)
}
