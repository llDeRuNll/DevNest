import React, { useState } from 'react'
import s from './TransactionsSearchTools.module.css'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineDateRange } from 'react-icons/md'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './TransactionsDatePicker.css'
import enUS from 'date-fns/locale/en-US'

const TransactionsSearchTools = () => {
	const [startDate, setStartDate] = useState(new Date())

	const handleChange = value => {
		console.log(value)
	}

	const handleDateChange = date => {
		setStartDate(date)
		console.log(startDate)
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
			<form className={s.form} autoComplete='false'>
				<div className={s.fields}>
					<div className={s.fieldWrapper}>
						<input
							className={s.searchInput}
							type='text'
							name='text'
							onChange={e => handleChange(e.target.value)}
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
							onChange={date => handleDateChange(date)}
						/>
						<MdOutlineDateRange className={s.icon} color='#0EF387' size={20} />
					</div>
				</div>
			</form>
		</>
	)
}

export default TransactionsSearchTools
