const { quizQuestions, TOTAL_QUESTIONS } = require("../data/quizData");

// acakkk
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// GET /api/questions - kirim soal diacak tanpa category
async function getQuestions(req, res, next) {
  try {
    // shuffle urutan soal
    const shuffled = shuffle(quizQuestions);

    // kirim hanya id dan text (sembunyikan category)
    const questions = shuffled.map(({ id, text }) => ({ id, text }));

    res.json({
      total: TOTAL_QUESTIONS,
      questions,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getQuestions };
