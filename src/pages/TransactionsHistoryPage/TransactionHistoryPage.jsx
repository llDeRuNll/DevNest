import TransactionsList from '../../components/TransactionsList/TransactionsList '
import TransactionsSearchTools from '../../components/TransactionsSearchTools/TransactionsSearchTools'
import TransactionsTotalAmount from '../../components/TransactionsTotalAmount/TransactionsTotalAmount'
import s from './TransactionsHistoryPage.module.css'

const TransactionHistoryPage = () => {
	return (
		<section className={s.section}>
			<div className='container'>
				<div className={s.summaryWrapper}>
					<div className={s.textWrapper}>
						<h2 className={s.title}>All Expense</h2>
						<p className={s.description}>
							View and manage every transaction seamlessly! Your entire
							financial landscape, all in one place.
						</p>
					</div>
					<TransactionsTotalAmount />
				</div>
				<div className={s.transactionWrapper}>
					<TransactionsSearchTools />
					<TransactionsList />
				</div>
			</div>
		</section>
	)
}

export default TransactionHistoryPage
