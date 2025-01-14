export default function numbify(n: string | number): number {
  if (typeof n == 'string') {
    return smartParseFloat(n);
  }
  return n;
}
