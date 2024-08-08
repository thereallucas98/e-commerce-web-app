export function calculatePoints(
  quantity: number,
  isFirstFoodPurchase = false,
): number {
  if (quantity === 1) {
    return getRandomNumber(50, 300) + (isFirstFoodPurchase ? 50 : 0) + 25
  } else if (quantity >= 3 && quantity <= 5) {
    return getRandomNumber(50, 150) + (isFirstFoodPurchase ? 50 : 0) + 25
  } else if (quantity > 5) {
    return getRandomNumber(50, 300) + (isFirstFoodPurchase ? 50 : 0) + 25
  }

  return 0
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
