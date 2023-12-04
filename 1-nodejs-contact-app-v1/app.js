
import { tulisPertanyaan, simpanContacs } from './contacts.js';

const main = async () => {
  const nama = await tulisPertanyaan('Masukkan nama anda : ');
  const email = await tulisPertanyaan('Masukkan email anda : ');
  const noHp = await tulisPertanyaan('Masukkan noHp anda : ');

  simpanContacs(nama, email, noHp);
};

main();


