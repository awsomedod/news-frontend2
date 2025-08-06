const BASE_URL = "https://news-auth-802693362877.us-west2.run.app";

async function request(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  let data = null;
  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      const text = await res.text();
      data = text ? { error: text } : null;
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const errMsg = (data && (data.error || data.message)) || `Request failed with ${res.status}`;
    const error = new Error(errMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function register({ email, username, password }) {
  // Backend expects: email, username, password
  return request("/register", {
    method: "POST",
    body: { email, username, password },
  });
}

export async function login({ identifier, password }) {
  // Backend expects: identifier (email or username), password
  return request("/login", {
    method: "POST",
    body: { identifier, password },
  });
}

/**
 * Username availability check
 * GET /check-username/:username
 * Returns: { available: boolean, message: string }
 */
export async function checkUsername(username) {
  if (!username) throw new Error("Username is required");
  return request(`/check-username/${encodeURIComponent(username)}`, {
    method: "GET",
  });
}

/**
 * Google signup: POST /signup/google
 * Body: { id_token, username }
 * Returns: { token, user }
 */
export async function signupWithGoogle({ id_token, username }) {
  if (!id_token) throw new Error("id_token is required");
  if (!username) throw new Error("username is required");
  return request("/signup/google", {
    method: "POST",
    body: { id_token, username },
  });
}

/**
 * Google login: POST /login/google
 * Body: { id_token }
 * Returns: { token, user }
 */
export async function loginWithGoogle({ id_token }) {
  if (!id_token) throw new Error("id_token is required");
  return request("/login/google", {
    method: "POST",
    body: { id_token },
  });
}
