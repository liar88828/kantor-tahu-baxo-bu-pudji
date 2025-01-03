export function toAccounting(number: string): string {
    if (typeof number !== "string" || !number) {
        return 'please input number'
    }
    // Convert the number to a string and split it into groups of 4 characters
    return number.replace(/(\d{4})(?=\d)/g, "$1 ");
}
