import { useState } from 'react'
import { UserContext } from './UserContext'

export const UserProvider = ({ children }) => {
	const savedTheme = localStorage.getItem('theme')
	const [userSelect, setUserSelect] = useState(savedTheme || 'dark')

	const setTheme = theme => {
		setUserSelect(theme)
		localStorage.setItem('theme', theme)
	}

	return (
		<UserContext.Provider value={{ userSelect, setTheme }}>
			{children}
		</UserContext.Provider>
	)
}
