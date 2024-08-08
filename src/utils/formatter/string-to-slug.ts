export function formatStringToSlug(input: string): string {
  const formatted = input.trim().toLowerCase()

  // Replace spaces with hyphens
  const slug = formatted.replace(/\s+/g, '-')

  return slug
}
