import type { User } from "../types/User";

interface JwtPayload {
  exp?: number;
}

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload;

    // JEŚLI backend nie ustawił exp → uznajemy token za ważny
    if (!payload.exp) return true;

    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch {
    return false;
  }
};

export const fetchMe = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      return null;
    }

    if (!res.ok) {
      throw new Error("Błąd /auth/me");
    }

    return await res.json(); // ⬅ TU JEST login
  } catch (err) {
    console.error(err);
    return null;
  }
};
