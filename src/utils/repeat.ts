export function repeat(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1)
}
