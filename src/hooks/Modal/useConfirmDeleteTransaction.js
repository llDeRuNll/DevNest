import { useDispatch } from 'react-redux'
import { transactionDelete } from '../../redux/transactions/operations'
import toast from 'react-hot-toast'
import { useModal } from '../../utils/Modal/useModal'

export const useConfirmDeleteTransaction = () => {
	const { closeModal } = useModal()
	const dispatch = useDispatch()

	const confirmDelete = async ({ _id, type, sum }) => {
		try {
			await dispatch(transactionDelete({ _id, type, sum })).unwrap()
			toast.success('Транзакцію видалено')
			closeModal()
		} catch (err) {
			toast.error(err.message || 'Помилка при видаленні')
		}
	}

	return confirmDelete
}
