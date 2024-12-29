export function toAccounting(number:string):string {
	// Convert the number to a string and split it into groups of 4 characters
	return number.replace(/(\d{4})(?=\d)/g, "$1 ");
}