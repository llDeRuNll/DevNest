export const croppedCategory = (category, windowWidth) => {
	if (windowWidth < 767) {
		return category.length > 7
			? category.slice(0, 7).padEnd(10, '...')
			: category
	}
	if (windowWidth >= 768 && windowWidth <= 1439) {
		return category.length > 7
			? category.slice(0, 7).padEnd(10, '...')
			: category
	}
	if (windowWidth >= 1440 && category.length > 20) {
		return category.slice(0, 14).padEnd(17, '...')
	}
	return category
}
