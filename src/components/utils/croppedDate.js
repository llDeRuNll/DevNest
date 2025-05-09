export const croppedDate = (date, windowWidth) => {
	if (windowWidth < 767 && date.length > 6) {
		return date.slice(0, 6).padEnd(9, '...')
	} else if (windowWidth > 767 && windowWidth < 1440 && date.length === 13) {
		return date.slice(0, 5).padEnd(8, '...')
	} else if (windowWidth > 767 && windowWidth < 1440 && date.length === 14) {
		return date.slice(0, 6).padEnd(9, '...')
	} else {
		return date
	}
}
