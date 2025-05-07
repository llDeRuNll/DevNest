import TransactionsList from '../../components/TransactionsList/TransactionsList '
import TransactionsSearchTools from '../../components/TransactionsSearchTools/TransactionsSearchTools'
import s from './TransactionsHistoryPage.module.css'

const TransactionHistoryPage = () => {
	return (
		<section className={s.section}>
			<div className='container'>
				<div className={s.transactionWrapper}>
					<TransactionsSearchTools />
					<TransactionsList />
				</div>
			</div>
		</section>
	)
}

export default TransactionHistoryPage
