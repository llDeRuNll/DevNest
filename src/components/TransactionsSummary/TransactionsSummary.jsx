import TransactionsTotalAmount from '../TransactionsTotalAmount/TransactionsTotalAmount'
import s from './TransactionsSummary.module.css'

const TransactionsSummary = ({ transactionsType }) => {
	return (
		<div className={s.summaryWrapper}>
			<div className={s.summaryTextWrapper}>
				<h2 className={s.summaryTitle}>
					{transactionsType === 'expenses' ? 'All Expense' : 'All Income'}
				</h2>
				<p className={s.summaryDescription}>
					{transactionsType === 'expenses'
						? 'View and manage every transaction seamlessly! Your entire financial landscape, all in one place.'
						: 'Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap.'}
				</p>
			</div>
			<TransactionsTotalAmount />
		</div>
	)
}

export default TransactionsSummary
