// --- 72 soal RIASEC (12 item × 6 kategori) ---
// id 0–11: R, 12–23: I, 24–35: A, 36–47: S, 48–59: E, 60–71: C

const quizQuestions = [
  // === REALISTIC (0–11) ===
  { id: 0, category: "R", text: "Memperbaiki peralatan rumah tangga" },
  { id: 1, category: "R", text: "Membuat atau merakit sesuatu dengan tangan" },
  {
    id: 2,
    category: "R",
    text: "Menggunakan alat kerja seperti obeng, bor, atau peralatan bengkel",
  },
  { id: 3, category: "R", text: "Mempelajari mesin kendaraan atau peralatan teknik" },
  { id: 4, category: "R", text: "Merakit komponen elektronik" },
  {
    id: 5,
    category: "R",
    text: "Menikmati kegiatan yang melibatkan kekuatan fisik atau keterampilan tangan",
  },
  { id: 6, category: "R", text: "Merakit furnitur kayu seperti lemari dan meja" },
  { id: 7, category: "R", text: "Memasang ubin atau menyusun batu bata untuk lantai dan dinding" },
  { id: 8, category: "R", text: "Bekerja di luar ruangan dalam waktu lama" },
  { id: 9, category: "R", text: "Instalasi listrik atau perbaikan teknis sederhana" },
  { id: 10, category: "R", text: "Memperbaiki keran air yang rusak" },
  { id: 11, category: "R", text: "Memperbaiki motor, sepeda, atau kendaraan sendiri" },

  // === INVESTIGATIVE (12–23) ===
  { id: 12, category: "I", text: "Mempelajari struktur tubuh manusia" },
  { id: 13, category: "I", text: "Mempelajari perilaku hewan" },
  { id: 14, category: "I", text: "Menikmati bekerja di laboratorium biologi" },
  { id: 15, category: "I", text: "Mempelajari pergerakan planet" },
  { id: 16, category: "I", text: "Mendiagnosis dan mengobati hewan sakit" },
  { id: 17, category: "I", text: "Mencari tahu penyebab suatu masalah secara mendalam" },
  { id: 18, category: "I", text: "Melakukan statistik dan analisis data" },
  { id: 19, category: "I", text: "Mengamati bagaimana sesuatu bekerja" },
  { id: 20, category: "I", text: "Kegiatan eksperimen atau uji coba" },
  { id: 21, category: "I", text: "Mempelajari genetika" },
  { id: 22, category: "I", text: "Melakukan observasi untuk memahami suatu fenomena" },
  { id: 23, category: "I", text: "Penelitian dan pengembangan ilmu pengetahuan" },

  // === ARTISTIC (24–35) ===
  { id: 24, category: "A", text: "Memimpin paduan suara musik" },
  { id: 25, category: "A", text: "Menyutradarai pertunjukan drama" },
  { id: 26, category: "A", text: "Membuat konten kreatif seperti poster atau video" },
  { id: 27, category: "A", text: "Menulis lagu" },
  { id: 28, category: "A", text: "Menulis buku atau lakon drama" },
  { id: 29, category: "A", text: "Memainkan alat musik" },
  { id: 30, category: "A", text: "Menulis puisi" },
  { id: 31, category: "A", text: "Memadukan warna, bentuk, dan tampilan visual" },
  { id: 32, category: "A", text: "Bermain peran atau akting dalam film" },
  { id: 33, category: "A", text: "Menggubah atau mengaransemen musik" },
  { id: 34, category: "A", text: "Mendesain tata panggung drama" },
  { id: 35, category: "A", text: "Menggambar gambar atau ilustrasi" },

  // === SOCIAL (36–47) ===
  { id: 36, category: "S", text: "Memberikan bimbingan karier kepada orang-orang" },
  { id: 37, category: "S", text: "Melakukan kerja sukarela" },
  { id: 38, category: "S", text: "Membantu orang yang memiliki masalah kecanduan" },
  { id: 39, category: "S", text: "Membantu orang yang memiliki masalah keluarga" },
  { id: 40, category: "S", text: "Mengajar anak-anak membaca" },
  { id: 41, category: "S", text: "Membantu lansia dalam aktivitas sehari-hari" },
  { id: 42, category: "S", text: "Merawat anak-anak" },
  { id: 43, category: "S", text: "Mengajar kelas sekolah dasar" },
  {
    id: 44,
    category: "S",
    text: "Bekerja dengan anak-anak berkebutuhan khusus (disabilitas mental)",
  },
  {
    id: 45,
    category: "S",
    text: "Mengajarkan keterampilan kerja dan hidup kepada penyandang disabilitas",
  },
  { id: 46, category: "S", text: "Mengajar sebagai guru" },
  { id: 47, category: "S", text: "Menjadi pemandu dalam kegiatan kelompok" },

  // === ENTERPRISING (48–59) ===
  { id: 48, category: "E", text: "Memulai bisnis sendiri" },
  { id: 49, category: "E", text: "Mengelola operasional hotel" },
  { id: 50, category: "E", text: "Mengelola departemen di perusahaan besar" },
  { id: 51, category: "E", text: "Mengelola toko" },
  { id: 52, category: "E", text: "Melakukan negosiasi untuk membeli produk" },
  { id: 53, category: "E", text: "Menjadi kepala divisi atau manajer tim" },
  { id: 54, category: "E", text: "Menyampaikan ide di depan orang banyak" },
  { id: 55, category: "E", text: "Memberikan presentasi tentang produk yang dijual" },
  { id: 56, category: "E", text: "Koordinator atau penanggung jawab kegiatan" },
  { id: 57, category: "E", text: "Meyakinkan orang terhadap ide yang saya sampaikan" },
  { id: 58, category: "E", text: "Memimpin kelompok atau mengarahkan kegiatan" },
  { id: 59, category: "E", text: "Membuat strategi pemasaran untuk meluncurkan produk baru" },

  // === CONVENTIONAL (60–71) ===
  { id: 60, category: "C", text: "Membuat jadwal atau menyusun daftar kegiatan" },
  { id: 61, category: "C", text: "Merapikan barang-barang" },
  { id: 62, category: "C", text: "Mengikuti aturan atau prosedur yang jelas" },
  { id: 63, category: "C", text: "Mengerjakan tugas atau mengolah data dengan detail" },
  { id: 64, category: "C", text: "Merapikan kamar" },
  { id: 65, category: "C", text: "Membuat catatan agar pekerjaan lebih terorganisir" },
  { id: 66, category: "C", text: "Menjaga catatan inventaris" },
  { id: 67, category: "C", text: "Memastikan pekerjaan selesai sesuai prosedur" },
  { id: 68, category: "C", text: "Mengatur file atau dokumen dengan rapi" },
  { id: 69, category: "C", text: "Memasukkan informasi ke dalam catatan" },
  {
    id: 70,
    category: "C",
    text: "Membuat lembar kerja (spreadsheet) menggunakan perangkat lunak komputer",
  },
  { id: 71, category: "C", text: "Menjaga catatan transaksi keuangan" },
];

const TOTAL_QUESTIONS = 72;

// helper: ambil kategori berdasarkan id soal
// id terurut per kategori: 0-11 R, 12-23 I, 24-35 A, 36-47 S, 48-59 E, 60-71 C
function getCategoryById(id) {
  if (id < 0 || id >= TOTAL_QUESTIONS) return null;
  const kategori = ["R", "I", "A", "S", "E", "C"];
  return kategori[Math.floor(id / 12)];
}

module.exports = { quizQuestions, TOTAL_QUESTIONS, getCategoryById };
