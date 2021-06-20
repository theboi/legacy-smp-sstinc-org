/**
 * Generates a random number between `min` and `max`
 * @param min Lower bound (*including*)
 * @param max Upper bound (*excluding*)
 * @param allowFloat If true, also returns floating points. Defaults to `false`.
 * @returns A random number between `min` and `max`
 */
export const random = (
  min: number,
  max: number,
  allowFloat: boolean = false
): number => {
  const rand = Math.random() * (max - min);
  if (allowFloat) return rand + min;
  return Math.floor(rand) + min;
};
