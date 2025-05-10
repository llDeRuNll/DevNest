import s from './TransactionsSearchTools.module.css'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineDateRange } from 'react-icons/md'
import DatePicker, { registerLocale } from 'react-datepicker'
import { IoMdClose } from 'react-icons/io'
import 'react-datepicker/dist/react-datepicker.css'
import './TransactionsDatePicker.css'
import enUS from 'date-fns/locale/en-US'

const TransactionsSearchTools = ({
	setSearchQuery,
	setSelectedDate,
	selectedDate,
	setHasUserPickedDate,
	hasUserPickedDate,
}) => {
	const handleDateChange = date => {
		setSelectedDate(date)
		setHasUserPickedDate(true)
	}

	const handleClose = () => {
		setSelectedDate(new Date())
		setHasUserPickedDate(false)
	}

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
			<form className={s.searchForm} autoComplete='false'>
				<div className={s.searchFields}>
					<div className={s.fieldWrapper}>
						<input
							className={s.searchInput}
							type='text'
							name='text'
							onChange={e => setSearchQuery(e.target.value)}
							placeholder='Search for anything..'
							id='search'
						/>
						<CiSearch className={s.fieldIcon} color='#0EF387' size={20} />
					</div>
					<div className={s.fieldWrapper}>
						<DatePicker
							className={s.datePicker}
							dateFormat='dd/MM/yyyy'
							selected={selectedDate}
							locale='custom-en'
							onChange={date => handleDateChange(date)}
						/>
						{hasUserPickedDate ? (
							<IoMdClose
								className={s.clearDateIcon}
								color='#0EF387'
								size={20}
								onClick={handleClose}
							/>
						) : (
							<MdOutlineDateRange
								className={s.fieldIcon}
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
