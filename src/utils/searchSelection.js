export const searchSelection = (transactions, userValue, startDate) => {
	const dataConversion = startDate
		? `${startDate.getFullYear()}-${
				startDate.getMonth() + 1
		  }-${startDate.getDate()}`
		: null

	if (userValue) {
		return transactions.filter(transaction =>
			transaction?.comment.toLowerCase().includes(userValue.toLowerCase())
		)
	} else if (startDate) {
		return transactions.filter(
			transaction => transaction?.date === dataConversion
		)
	}
	return transactions
}
