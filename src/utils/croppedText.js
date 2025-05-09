export const croppedComment = (comment, windowWidth) => {
	if (windowWidth < 767) {
		return comment.length > 7 ? comment.slice(0, 4).padEnd(7, "...") : comment;
	}			
	if (windowWidth >= 768 && windowWidth <= 1439) {
		return comment.length > 7 ? comment.slice(0, 6).padEnd(9, "...") : comment;
	}
	if (windowWidth >= 1440 && comment.length > 20) {
		return comment.slice(0, 17).padEnd(20, "...");
	}
	return comment;
};