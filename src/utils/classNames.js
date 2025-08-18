/**
 * Utility function to conditionally join CSS class names
 * @param {...string} classes - Class names to join
 * @returns {string} Joined class names
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
