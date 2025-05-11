import s from './TransactionsSearchTools.module.css'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineDateRange } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import DatePickerCustom from '../DatePickerCustom/DatePickerCustom'
import { Formik, Form, Field } from 'formik'

const TransactionsSearchTools = ({
	setSearchQuery,
	setSelectedDate,
	selectedDate,
	setHasUserPickedDate,
	hasUserPickedDate,
}) => {
	const handleInputChange = query => {
		setTimeout(() => {
			setSearchQuery(query)
		}, 250)
	}

	const handleDateChange = date => {
		setSelectedDate(date)
		setHasUserPickedDate(true)
	}

	const handleClose = () => {
		setSelectedDate(new Date())
		setHasUserPickedDate(false)
	}

	return (
		<Formik>
			<Form className={s.searchForm} autoComplete='false'>
				<div className={s.searchFields}>
					<div className={s.fieldWrapper}>
						<Field
							className={s.searchInput}
							name='text'
							onChange={e => handleInputChange(e.target.value)}
							placeholder='Search for anything..'
						/>
						<CiSearch className={s.fieldIcon} color='#0EF387' size={20} />
					</div>
					<div className={s.fieldWrapper}>
						<DatePickerCustom
							selectedDate={selectedDate}
							handleDateChange={handleDateChange}
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
			</Form>
		</Formik>
	)
}

export default TransactionsSearchTools
