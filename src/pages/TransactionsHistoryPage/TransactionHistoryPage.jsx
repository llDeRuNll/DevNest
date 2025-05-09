import { useEffect, useState } from 'react'
import TransactionsList from '../../components/TransactionsList/TransactionsList'
import TransactionsSearchTools from '../../components/TransactionsSearchTools/TransactionsSearchTools'
import TransactionsTotalAmount from '../../components/TransactionsTotalAmount/TransactionsTotalAmount'
import s from './TransactionsHistoryPage.module.css'
import { transactionPost, transactionsGetByType } from '../../redux/transactions/operations'
import { useDispatch } from 'react-redux'

const TransactionHistoryPage = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [startDate, setStartDate] = useState(new Date())
	const [userValue, setUserValue] = useState("")
	const dispatch = useDispatch()
	
	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		dispatch(transactionsGetByType({type: "expenses"}))
	}, [dispatch])
	
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
					<TransactionsSearchTools setUserValue={setUserValue} setStartDate={setStartDate} startDate={startDate}/>
					<TransactionsList windowWidth={windowWidth} userValue={userValue} startDate={startDate}/>
				</div>
			</div>
		</section>
	)
}

export default TransactionHistoryPage
