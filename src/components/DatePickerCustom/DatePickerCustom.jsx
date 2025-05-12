import s from './DatePickerCover.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import enUS from 'date-fns/locale/en-US'
import DatePicker, { registerLocale } from 'react-datepicker'
import './DatePickerCustom.css'

const DatePickerCustom = ({ selectedDate, handleDateChange }) => {
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
			<DatePicker
				className={s.datePicker}
				dateFormat='dd/MM/yyyy'
				locale='custom-en'
				selected={selectedDate}
				onChange={date => handleDateChange(date)}
			/>
		</>
	)
}

export default DatePickerCustom
