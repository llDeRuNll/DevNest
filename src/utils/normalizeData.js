export const normalizeData = date => {
	const splittedData = date.split('-')

	return `${splittedData[2]}.${splittedData[1]}.${splittedData[0]}`
}
