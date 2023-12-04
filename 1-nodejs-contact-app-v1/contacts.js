import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

export const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama)
    })
  })
}

export const simpanContacs = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const fileBuffer = fs.readFileSync(dataPath, 'utf-8');
  const contacs = JSON.parse(fileBuffer);

  contacs.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacs)) // alamat jgn tulis manual

  console.log('terimakasih sudah memasukan data.');
  rl.close();
}

export default simpanContacs