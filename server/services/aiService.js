// service untuk komunikasi dengan model AI (hosting FastAPI di huggingface)

const AI_API_URL = process.env.AI_API_URL;
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

// timeout request ke AI (ms)
const AI_TIMEOUT = 60000;

// parse SSE stream ---> ambil event prediction & narasi
function parseSSE(rawText) {
  const result = { prediction: null, narasi: null };

  // pisah per blok event (dipisah baris kosong)
  const blocks = rawText.split("\n\n");

  let currentEvent = null;
  for (const block of blocks) {
    const lines = block.split("\n");
    for (const line of lines) {
      if (line.startsWith("event:")) {
        currentEvent = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        const data = line.slice(5).trim();
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          if (currentEvent === "prediction") {
            result.prediction = parsed;
          } else if (currentEvent === "narasi") {
            result.narasi = parsed;
          }
        } catch {
          // abaikan baris data yang bukan json valid
        }
      }
    }
  }

  return result;
}

// panggil endpoint /api/analyze dan kembalikan hasil prediksi + narasi
async function analyzeRiasec(riasec, akademik, topK = 3) {
  if (!AI_API_URL || !INTERNAL_API_KEY) {
    throw new Error("Konfigurasi AI belum lengkap (AI_API_URL / INTERNAL_API_KEY)");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT);

  try {
    const res = await fetch(`${AI_API_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-API-Key": INTERNAL_API_KEY,
      },
      body: JSON.stringify({ riasec, akademik, top_k: topK }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`AI merespons ${res.status}: ${text.slice(0, 200)}`);
    }

    // baca seluruh SSE stream sebagai teks
    const rawText = await res.text();
    const { prediction, narasi } = parseSSE(rawText);

    if (!prediction) {
      throw new Error("AI tidak mengembalikan hasil prediksi");
    }

    return { prediction, narasi };
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Permintaan ke AI timeout. Coba lagi beberapa saat.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { analyzeRiasec };
