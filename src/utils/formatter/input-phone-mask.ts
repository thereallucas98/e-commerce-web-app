export function fomratInputPhoneMask(value: string) {
  const cleanedValue = value.replace(/\D/g, '')
  return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
