/**
 * Validate email address format
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate username format (3-30 chars, alphanumeric and underscores)
 */
export function validateUsername(username) {
  const re = /^[A-Za-z0-9_]{3,30}$/;
  return re.test(username);
}
