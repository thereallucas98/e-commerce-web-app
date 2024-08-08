export function generateDefaultPassword(length: number = 12): string {
  if (length < 6) {
    throw new Error('Password length should be at least 6 characters')
  }

  // Characters to use in the password
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?'

  // Helper function to get a random character from a given string
  function getRandomChar(chars: string): string {
    const randomIndex = Math.floor(Math.random() * chars.length)
    return chars[randomIndex]
  }

  // Ensure the password has at least one character from each category
  const password: string[] = [
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(digits),
    getRandomChar(specialChars),
  ]

  // Combine all character sets
  const allCharacters = uppercase + lowercase + digits + specialChars

  // Fill the rest of the password length with random choices from all characters
  for (let i = 4; i < length; i++) {
    password.push(getRandomChar(allCharacters))
  }

  // Shuffle the password array to ensure randomness
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[password[i], password[j]] = [password[j], password[i]]
  }

  return password.join('')
}
