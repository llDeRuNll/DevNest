export const croppedCategory = (category, windowWidth) => {
	if (windowWidth < 767 && category.length > 7) {
		return category.slice(0, 7).padEnd(10, '...')
	}
	if (windowWidth >= 768 && windowWidth <= 1439 && category.length > 7) {
		return category.slice(0, 7).padEnd(10, '...')
	}
	if (windowWidth >= 1440 && category.length > 14) {
		return category.slice(0, 14).padEnd(17, '...')
	}
	return category
}
