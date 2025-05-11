import s from './TransactionsTotalAmount.module.css'
import TotalAmountElement from '../TotalAmountElement/TotalAmountElement'
import { useSelector } from 'react-redux'
import { selectTransactionsTotal } from '../../redux/transactions/selectors'

const TransactionsTotalAmount = () => {
	const { incomes, expenses } = useSelector(selectTransactionsTotal)

	const currency = '$'

	return (
		<div className={s.mainWrapper}>
			<TotalAmountElement
				currency={currency}
				amount={incomes}
				type={'Income'}
			/>

			<TotalAmountElement
				currency={currency}
				amount={expenses}
				type={'Expense'}
			/>
		</div>
	)
}

export default TransactionsTotalAmount
