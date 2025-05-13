import { useContext } from 'react'
import { UserContext } from '../Modal/ModalContext'

export const useUserContext = () => useContext(UserContext)
