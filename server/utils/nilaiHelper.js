// helper agregasi 9 mapel ---> 5 kategori akademik (sesuai input model AI)

// rata-rata, dibulatkan 2 desimal
function avg(...nilai) {
  const total = nilai.reduce((sum, n) => sum + n, 0);
  return Math.round((total / nilai.length) * 100) / 100;
}

// input: { bahasaIndonesia, bahasaInggris, matematika, informatika, ipa, ips, ppkn, penjas, seni }
// output: { logika, bahasa, sains, sosial, praktik }
function agregasiNilai(nilai) {
  return {
    bahasa: avg(nilai.bahasaIndonesia, nilai.bahasaInggris),
    logika: avg(nilai.matematika, nilai.informatika),
    sains: avg(nilai.ipa),
    sosial: avg(nilai.ips, nilai.ppkn),
    praktik: avg(nilai.penjas, nilai.seni),
  };
}

module.exports = { agregasiNilai };
