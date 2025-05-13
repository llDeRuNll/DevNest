import { GrTransaction } from 'react-icons/gr'
import s from './TransactionEmpty.module.css'
import { Link } from 'react-router-dom'

const TransactionEmpty = ({ transactionsType }) => {
	return (
		<div className={s.emptyWrapper}>
			<GrTransaction className={s.emptyIcon} size={100} />
			<p className={s.text}>Nothing here yet!</p>
			{transactionsType === 'expenses' ? (
				<Link className={s.link} to='/transactions/expenses'>
					Start your way in economy!
				</Link>
			) : (
				<Link className={s.link} to='/transactions/incomes'>
					Start your way in economy!
				</Link>
			)}
		</div>
	)
}

export default TransactionEmpty
