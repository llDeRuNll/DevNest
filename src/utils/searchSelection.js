export const searchSelection = (
	transactions,
	userValue,
	startDate,
	hasUserPickedDate
) => {
	const dataConversion = startDate
		? `${startDate.getFullYear()}-${
				startDate.getMonth() + 1
		  }-${startDate.getDate()}`
		: null

	if (hasUserPickedDate) {
		return transactions.filter(
			transaction => transaction?.date === dataConversion
		)
	}
	if (userValue) {
		return transactions.filter(transaction =>
			transaction?.comment.toLowerCase().includes(userValue.toLowerCase())
		)
	}
	return transactions
}
