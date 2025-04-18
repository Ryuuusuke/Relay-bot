# IRC-Discord Relay & Shell Executor Bot

**Relay** adalah bot yang menghubungkan komunikasi antara IRC dan Discord menggunakan [Matterbridge](https://github.com/42wim/matterbridge). Selain itu, bot ini juga mampu menjalankan perintah shell langsung dari Discord melalui bot berbasis Node.js.

## Fitur

- 🔁 **Relay Pesan IRC ⇄ Discord**  
  Menggunakan Matterbridge untuk menyambungkan channel IRC dan Discord secara real-time.

- 💻 **Eksekusi Perintah Shell dari Discord**  
  Perintah shell yang dikirim di Discord akan dijalankan di host Linux dan hasilnya dikirim balik ke Discord.

- 🔒 **Akses Pengguna Terkontrol**  
  Hanya ID Discord tertentu yang memiliki izin untuk menjalankan perintah shell.

- ⚙️ **Modular & Ringan**  
  Relay dan executor terpisah, memudahkan perawatan dan pengembangan.

## Arsitektur
[ IRC ] ←→ [ Matterbridge ] ←→ [ Discord ]
↑
[ Node.js Shell Bot ]

## Prasyarat

- Linux/Windows (tested on Arch Linux & Void)
- Node.js (v18 atau lebih baru)
- Discord bot token
- Matterbridge binary + konfigurasi
- `.env` untuk konfigurasi bot executor (opsional)

## Setup Umum

1. **Siapkan Matterbridge** untuk menyambungkan IRC dan Discord.
2. **Jalankan bot Node.js** untuk menangani perintah shell dari Discord.
3. **Konfigurasi ID pengguna** yang diperbolehkan untuk menjalankan perintah.

## Keamanan

- Perintah shell hanya dijalankan oleh user yang di-whitelist.
- Tidak ada eksekusi perintah dari IRC.
- Jalankan bot sebagai user dengan permission terbatas.
- Disarankan menambahkan logging dan monitoring untuk produksi.

## License

MIT License. Gunakan dengan tanggung jawab dan kehormatan—**karena sigma tidak pernah menyalahgunakan kekuatan.**
