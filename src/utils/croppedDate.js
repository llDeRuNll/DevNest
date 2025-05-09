export const croppedDate = (date, windowWidth) => {
	if (windowWidth <= 1439 && date.length === 9) {
		return date.slice(0, 1).padEnd(4, '...')
	} else if(windowWidth <= 1439 && date.length === 10){
		return date.slice(0, 2).padEnd(5, '...')
	} else{ 
		return date
	}
}
