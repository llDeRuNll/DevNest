import { useEffect, useState } from 'react'
import TransactionsSearchTools from '../../components/TransactionsSearchTools/TransactionsSearchTools'
import s from './TransactionsHistoryPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { transactionsGetByType } from '../../redux/transactions/operations'
import { useParams } from 'react-router-dom'
import { selectIsLoading } from '../../redux/transactions/selectors'
import Loader from '../../components/Loader/Loader'
import TransactionsSummary from '../../components/TransactionsSummary/TransactionsSummary'
import TransactionsList from '../../components/TransactionsList/TransactionsList'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import { useTransactionType } from '../../hooks/useTransactionType'

const TransactionHistoryPage = () => {
	const [hasUserPickedDate, setHasUserPickedDate] = useState(false)
	const { transactions, transactionsType } = useTransactionType()
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [searchQuery, setSearchQuery] = useState('')
	const isLoading = useSelector(selectIsLoading)
	const userWindowWidth = useWindowWidth()
	const dispatch = useDispatch()

	useEffect(() => {
		const loadDataByType = async () => {
			await dispatch(transactionsGetByType({ type: transactionsType })).unwrap()
		}
		loadDataByType()
	}, [dispatch, transactionsType])

	return (
		<>
			{isLoading && <Loader />}
			<section className={s.section}>
				<div className='container'>
					<TransactionsSummary transactionsType={transactionsType} />
					<div className={s.transactionWrapper}>
						<TransactionsSearchTools
							setSearchQuery={setSearchQuery}
							setSelectedDate={setSelectedDate}
							selectedDate={selectedDate}
							setHasUserPickedDate={setHasUserPickedDate}
							hasUserPickedDate={hasUserPickedDate}
						/>
						<TransactionsList
							userWindowWidth={userWindowWidth}
							searchQuery={searchQuery}
							selectedDate={selectedDate}
							transactions={transactions}
							hasUserPickedDate={hasUserPickedDate}
						/>
					</div>
				</div>
			</section>
		</>
	)
}

export default TransactionHistoryPage
