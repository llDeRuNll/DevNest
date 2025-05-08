export const croppedComment = (comment, windowWidth) => {
	if (windowWidth < 767 && comment.length > 8 && comment.length < 12) {
		return comment.slice(0, 4).padEnd(7, '...')
	} else if (windowWidth < 767 && comment.length > 12) {
		return comment.slice(0, 7).padEnd(10, '...')
	} else if (
		windowWidth > 767 &&
		windowWidth < 1440 &&
		comment.length > 8 &&
		comment.length < 12
	) {
		return comment.slice(0, 6).padEnd(9, '...')
	} else if (windowWidth > 767 && windowWidth < 1440 && comment.length > 12) {
		return comment.slice(0, 8).padEnd(11, '...')
	} else if (windowWidth >= 1440 && comment.length > 14) {
		return comment.slice(0, 11).padEnd(14, '...')
	} else {
		return comment
	}
}
