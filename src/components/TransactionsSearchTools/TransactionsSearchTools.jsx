import s from './TransactionsSearchTools.module.css'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineDateRange } from 'react-icons/md'
import DatePicker, { registerLocale } from 'react-datepicker'
import { IoMdClose } from 'react-icons/io'
import 'react-datepicker/dist/react-datepicker.css'
import './TransactionsDatePicker.css'
import enUS from 'date-fns/locale/en-US'

const TransactionsSearchTools = ({ setUserValue, setStartDate, startDate }) => {
	// const handleChange = value => {
	// 	setUserValue(value)
	// }

	// const handleDateChange = date => {
	// 	setStartDate(date)
	// }

	// const handleClose = () => {
	// 	setStartDate(null)
	// }

	const customLocale = {
		...enUS,
		options: {
			...enUS.options,
			weekStartsOn: 1,
		},
	}

	registerLocale('custom-en', customLocale)
	return (
		<>
			<form className={s.form} autoComplete='false'>
				<div className={s.fields}>
					<div className={s.fieldWrapper}>
						<input
							className={s.searchInput}
							type='text'
							name='text'
							onChange={e => setUserValue(e.target.value)}
							placeholder='Search for anything..'
							id='search'
						/>
						<CiSearch className={s.icon} color='#0EF387' size={20} />
					</div>
					<div className={s.fieldWrapper}>
						<DatePicker
							className={s.datePicker}
							dateFormat='dd/MM/yyyy'
							selected={startDate}
							locale='custom-en'
							placeholderText='dd/mm/yyyy'
							onChange={date => setStartDate(date)}
						/>
						{startDate ? (
							<IoMdClose
								className={s.closeIcon}
								color='#0EF387'
								size={20}
								onClick={() => setStartDate(null)}
							/>
						) : (
							<MdOutlineDateRange
								className={s.icon}
								color='#0EF387'
								size={20}
							/>
						)}
					</div>
				</div>
			</form>
		</>
	)
}

export default TransactionsSearchTools
