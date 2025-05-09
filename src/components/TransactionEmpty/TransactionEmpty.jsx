import { GrTransaction } from 'react-icons/gr'
import s from './TransactionEmpty.module.css'

const TransactionEmpty = () => {
	return (
		<div className={s.emptyWrapper}>
			<GrTransaction color='rgba(197, 197, 197, 0.2)' size={100} />
			<p className={s.text}>Nothing here yet!</p>
		</div>
	)
}

export default TransactionEmpty
