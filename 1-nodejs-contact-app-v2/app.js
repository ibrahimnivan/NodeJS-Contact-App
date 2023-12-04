const yargs = require('yargs')
const contacts = require('./contacts.js')

yargs.command({
  command: 'add',

  describe: 'Menambah contact baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      types: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      types: 'string'
    },
    noHP: {
      describe: 'Nomor Handphone',
      demandOption: true,
      types: 'string'
    }
  },
  handler(argv) {
    contacts.simpanContact(argv.nama, argv.email, argv.noHP)
  },
}).demandCommand()


// menampilkan daftar nama semua contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no HP contact',
  handler() {
    contacts.listContact()
  }

})


//menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contacts.detailContact(argv.nama)
  }
})


// menghapus kontak berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contacts.deleteContact(argv.nama)
  }
})

yargs.parse()


