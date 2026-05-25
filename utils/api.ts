// --- konfigurasi base url ---
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// --- manajemen token anonymous ---
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("kk_token");
}

function saveToken(token: string): void {
  localStorage.setItem("kk_token", token);
}

// minta token baru dari server
async function requestToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/sessions`, { method: "POST" });
  if (!res.ok) throw new Error("Gagal membuat session");
  const data = await res.json();
  saveToken(data.token);
  return data.token;
}

// ambil token yang ada, atau buat baru
async function ensureToken(): Promise<string> {
  const existing = getToken();
  if (existing) return existing;
  return await requestToken();
}

// --- helper fetch dengan auth ---
async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await ensureToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  // kalau token expired, minta baru dan retry sekali
  if (res.status === 403) {
    const newToken = await requestToken();
    return fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...options.headers,
      },
    });
  }

  return res;
}

// --- api functions ---

// kirim jawaban quiz + nilai ---> hasil prediksi
export async function submitPrediction(
  answers: Record<number, number>,
  nilai: Record<string, number>,
) {
  const res = await authFetch("/api/predictions", {
    method: "POST",
    body: JSON.stringify({ answers, nilai }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal mengirim prediksi");
  }

  return res.json();
}

// ambil hasil prediksi by id
export async function getPrediction(id: string) {
  const res = await authFetch(`/api/predictions/${id}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal mengambil hasil prediksi");
  }

  return res.json();
}

// ambil semua ulasan (publik, tanpa auth)
export async function getReviews() {
  const res = await fetch(`${BASE_URL}/api/reviews`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal mengambil ulasan");
  }

  return res.json();
}

// kirim ulasan baru
export async function submitReview(nama: string, rating: number, text: string) {
  const res = await authFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify({ nama, rating, text }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal mengirim ulasan");
  }

  return res.json();
}

// cek apakah user sudah pernah submit review
export async function checkMyReview(): Promise<boolean> {
  const res = await authFetch("/api/reviews/me");
  if (res.status === 404) return false;
  if (!res.ok) return false;
  return true;
}
