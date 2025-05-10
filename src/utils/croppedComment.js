export const croppedComment = (comment, windowWidth) => {
	if (windowWidth < 767) {
		if (comment.length > 8 && comment.slice(0, 8).endsWith(' ')) {
			return comment.slice(0, 7).padEnd(10, '...')
		}
		if (comment.length > 8 && comment.length < 12) {
			return comment.slice(0, 4).padEnd(7, '...')
		} else if (comment.length > 12) {
			return comment.slice(0, 5).padEnd(8, '...')
		}
	}

	if (windowWidth > 767 && windowWidth < 1440) {
		if (comment.length > 8 && comment.slice(0, 8).endsWith(' ')) {
			return comment.slice(0, 7).padEnd(10, '...')
		}
		if (comment.length > 8 && comment.length < 12) {
			return comment.slice(0, 6).padEnd(9, '...')
		} else if (comment.length > 12) {
			return comment.slice(0, 8).padEnd(11, '...')
		}
	}

	if (windowWidth >= 1440 && comment.length > 16) {
		return comment.slice(0, 15).padEnd(18, '...')
	}

	return comment
}
