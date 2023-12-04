const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

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

const loadContact = () => {
  const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts
}


const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  // const fileBuffer = fs.readFileSync(dataPath, 'utf-8');
  // const contacts = JSON.parse(fileBuffer);
  const contacts = loadContact()

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama)
  if(duplikat) {
    console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'))
    return false;
  }

  // cek email
  if(email) {
    if(!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold('Email tidak valid'))
      return false;
    }
  }

 // cek noHP
  if(!validator.isMobilePhone(noHP, 'id-ID')) {
      console.log(chalk.red.inverse.bold('Nomor Handphone tidak valid'))
      return false;
    }
  

  contacts.push(contact);

 

  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts)) // bisa juga menggunakan dataPath

  console.log(chalk.green.inverse.bold('terimakasih sudah memasukan data.'));
}


const listContact = () => {
 const contacts = loadContact()
 console.log(chalk.cyan.inverse.bold('Daftar Kontact : '));
 contacts.forEach((contact, i) => {
  console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)
 });
}

const detailContact = (nama) => {
  const contacts = loadContact()
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

  if(!contact) {
    console.log(chalk.red.inverse.bold('Nama tidak ditemukan'))
    return false;
  }

  console.log(chalk.cyan.inverse.bold(`Kontak : ${contact.nama}`));
  console.log(contact.noHP);
  if(contact.email) {
    console.log(contact.email);
  }
}

const deleteContact = (nama) => {
  const contacts = loadContact()
  // caranya dengan membuat array baru agar nama yg dihapus != undefined (index ttp ada)
 const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

 // kl namanya ngga ada maka ngga ada di hapus = 2 array isinya sama
 if(contacts.length === newContacts.length) {
  console.log(chalk.red.inverse.bold('Nama tidak ditemukan'))
  return false;
}

fs.writeFileSync(dataPath, JSON.stringify(newContacts)) // alamat jgn tulis manual

  console.log(chalk.green.inverse.bold(`data ${nama} berhasil dihapus!`));
}

module.exports = { simpanContact, listContact, detailContact, deleteContact, }
