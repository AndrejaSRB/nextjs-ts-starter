/**
 * Truncates a blockchain address string to a specified length, adding ellipsis in the middle.
 *
 * @param {unknown} address - The address string to be truncated. If not a string, the function returns undefined.
 * @param {number} [length=4] - The number of characters to keep at the start and end of the string.
 * @returns {string | undefined} - The truncated string with ellipsis or undefined if input is not a string.
 */
export default function ellipsis(address: unknown, length = 4) {
  if (typeof address !== 'string') return;

  // For Ethereum-style addresses (starting with 0x)
  if (address.startsWith('0x')) {
    return address.replace(new RegExp(`^(0x.{${length}}).*(.{${length}})$`), '$1...$2');
  }

  // For other addresses (like Solana)
  return address.replace(new RegExp(`^(.{${length}}).*(.{${length}})$`), '$1...$2');
}
