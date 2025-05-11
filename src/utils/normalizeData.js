export const normalizeData = (date, windowWidth) => {
	const dateInstance = new Date(date)

	const dayShortNames = {
		Monday: 'Mo',
		Tuesday: 'Tu',
		Wednesday: 'We',
		Thursday: 'Th',
		Friday: 'Fr',
		Saturday: 'Sa',
		Sunday: 'Su',
	}

	const weekday = dateInstance.toLocaleDateString('en-US', {
		weekday: 'long',
	})

	const day = dateInstance.getDate()
	const month = String(dateInstance.getMonth() + 1).padStart(2, '0')
	const year = dateInstance.getFullYear()

	const finalDate = `${dayShortNames[weekday]}, ${day}.${month}.${year}`

	if (windowWidth <= 1439) {
		if (finalDate.length === 13) {
			return finalDate.slice(0, 5).padEnd(8, '...')
		} else if (finalDate.length === 14) {
			return finalDate.slice(0, 6).padEnd(9, '...')
		}
	}

	return finalDate
}
