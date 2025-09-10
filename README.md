# Backend API Test - Reza

Ini adalah proyek REST API yang dibuat sebagai bagian dari tes seleksi Fullstack Developer. API ini mencakup fitur autentikasi pengguna (Register & Login) dan manajemen konten (CRUD).

---

## Dokumentasi API 
Dokumentasi lengkap untuk semua *endpoint* yang tersedia dapat diakses melalui link Postman berikut:

**[Lihat Dokumentasi API](https://documenter.getpostman.com/view/40579254/2sB3HnLfom)**

---

## Teknologi yang Digunakan
- **Framework:** Node.js, Express.js
- **Database:** MySQL
- **Keamanan:** JWT (JSON Web Tokens) & bcrypt

---

## Cara Menjalankan Proyek Secara Lokal

1.  **Clone repository ini:**
    ```sh
    git clone [https://github.com/username-anda/nama-repo-anda.git](https://github.com/username-anda/nama-repo-anda.git)
    cd nama-repo-anda
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Setup Environment Variables:**
    Buat file `.env` di root folder dan isi sesuai dengan contoh di bawah ini:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password_database_anda
    DB_NAME=nama_database_anda
    JWT_SECRET=kunci_rahasia_anda_yang_unik
    ```

4.  **Jalankan server:**
    ```sh
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.
