export const searchSelection = (
	transactions,
	userValue,
	startDate,
	hasUserPickedDate
) => {
	const dataConversion = startDate.toLocaleDateString('en-CA')

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
