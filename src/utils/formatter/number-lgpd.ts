export function formatNumber(number: string): string {
  // Check if the length of the string is greater than or equal to 4
  if (number.length >= 4) {
    // Get the last 4 digits
    const lastFourDigits: string = number.slice(-4)

    // Create a new string with asterisks and the last 4 digits
    const formattedNumber: string =
      '*'.repeat(number.length - 4) + '-' + lastFourDigits
    return formattedNumber
  } else {
    // If the number has less than 4 digits, return it as is
    return number
  }
}
