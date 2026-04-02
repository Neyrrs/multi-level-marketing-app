## b. Backend

Pengembangan backend pada sistem ini menggunakan Laravel dan PostgreSQL. Fokus implementasi dimulai dari alur pengguna umum (guest), proses belanja, pembayaran Midtrans, lalu dilanjutkan ke proses aktivasi affiliate.

### 1) Konfigurasi Lingkungan dan Database

Langkah pertama adalah menyiapkan konfigurasi koneksi database pada file `.env`.

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nama_database
DB_USERNAME=postgres
DB_PASSWORD=rahasia
```

Setelah koneksi benar, struktur tabel dibuat dengan migrasi:

```bash
php artisan migrate
```

### 2) Penyusunan Entitas dan Migrasi Inti

Agar alur bisnis tercakup end-to-end, entitas dibagi menjadi beberapa kelompok:

1. Entitas akun dan profil:
- `users`
- `user_profiles`

2. Entitas katalog dan transaksi belanja:
- `products`
- `carts`
- `cart_items`
- `orders`
- `order_items`

3. Entitas aktivasi affiliate:
- `activation_codes`
- `order_activation_codes`
- `affiliates`
- `mlm_trees`

4. Entitas komisi:
- `commission_methods`
- `commission_rules`
- `commission_plans`
- `commission_plan_rule`
- `commissions`
- `commission_ledgers`

### 3) Pembuatan Model

Setiap tabel utama dibuat model agar dapat diproses melalui Eloquent ORM.

```bash
php artisan make:model Product
php artisan make:model Cart
php artisan make:model CartItem
php artisan make:model Order
php artisan make:model OrderItem
php artisan make:model ActivationCode
php artisan make:model Affiliate
php artisan make:model MlmTree
php artisan make:model Commission
php artisan make:model CommissionLedger
```

### 4) Perancangan Routing

Routing disusun untuk menghubungkan request pengguna dengan controller:

1. Halaman publik:
- `/` (home)
- `/product`
- `/cart`

2. Proses checkout publik:
- `POST /cart/checkout`
- `POST /cart/cancel`

3. Integrasi payment gateway:
- `POST /webhooks/midtrans`

4. Area affiliate:
- `/affiliate/dashboard`
- `/affiliate/redeem`
- `/affiliate/kode`
- `/affiliate/tree`

### 5) Implementasi Registrasi dan Login

Pada tahap ini, sistem mengelola proses autentikasi pengguna mulai dari pendaftaran hingga login. Ketika pengguna melakukan registrasi, data akun akan disimpan ke dalam tabel users dengan role default sebagai guest. Sistem juga memastikan bahwa setiap pengguna memiliki kredensial yang valid untuk proses login.

Setelah berhasil login, sistem akan melakukan pengecekan role pengguna untuk menentukan halaman tujuan. Pengguna dengan role guest akan diarahkan ke halaman publik, sedangkan pengguna yang telah menjadi affiliate akan diarahkan ke dashboard affiliate. Mekanisme ini memastikan pengalaman pengguna yang sesuai dengan hak akses masing-masing.

### 6) Implementasi Alur Belanja Guest

Sistem menyediakan fitur belanja bagi pengguna umum (guest) yang telah login. Produk yang ditampilkan berasal dari data pada tabel products yang berstatus aktif. Pengguna dapat menambahkan produk ke dalam keranjang (cart) sebelum melakukan checkout.

Saat proses checkout dilakukan, sistem akan melakukan validasi terhadap beberapa hal penting, seperti status login pengguna, kelengkapan profil (nama, email, nomor HP, dan alamat), serta ketersediaan stok produk. Jika semua validasi terpenuhi, sistem akan membuat data transaksi berupa orders sebagai header dan order_items sebagai detail item yang dibeli. Selain itu, stok produk akan otomatis dikurangi sesuai jumlah pembelian.

### 7) Integrasi Midtrans

Setelah transaksi berhasil dibuat, sistem akan terhubung dengan payment gateway Midtrans untuk memproses pembayaran. Backend akan menghasilkan token transaksi menggunakan layanan Snap dari Midtrans yang kemudian dikirim ke frontend.

Pengguna akan menyelesaikan pembayaran melalui antarmuka yang disediakan Midtrans. Setelah pembayaran dilakukan, Midtrans akan mengirimkan notifikasi melalui webhook ke backend. Sistem kemudian memverifikasi keaslian data menggunakan signature key sebelum memperbarui status pembayaran pada order, seperti menjadi paid, failed, atau expired.

### 8) Aktivasi Kode dan Pembentukan Affiliate

Untuk produk tertentu yang bersifat aktivasi, sistem akan menghasilkan kode aktivasi setelah transaksi berhasil dibayar. Kode tersebut disimpan dalam tabel activation_codes dan dihubungkan dengan transaksi melalui order_activation_codes.

Ketika kode digunakan (redeem), sistem akan melakukan validasi keabsahan kode tersebut. Jika valid, sistem akan membuat atau mengaktifkan akun affiliate pada tabel affiliates. Selain itu, struktur jaringan akan dibentuk dan disimpan dalam tabel mlm_trees, yang mencatat hubungan antar anggota seperti parent, posisi (kiri/kanan), dan kedalaman jaringan.

### 9) Penerapan Plan, Method, dan Rule Komisi

Setelah pengguna menjadi affiliate, sistem akan menetapkan plan komisi yang berlaku. Plan ini berisi kumpulan aturan yang menentukan bagaimana komisi dihitung. Setiap plan terhubung dengan rule melalui tabel relasi commission_plan_rule.

Ketika terjadi transaksi dengan status paid, sistem akan secara otomatis menghitung komisi berdasarkan metode yang digunakan, seperti sponsor, level, atau matching bonus. Perhitungan ini mengikuti aturan yang telah ditentukan dalam plan affiliate masing-masing.

### 10) Ringkasan Hasil Implementasi Backend

Secara keseluruhan, backend sistem telah berhasil mengintegrasikan seluruh alur utama bisnis secara end-to-end. Dimulai dari proses registrasi dan login pengguna, dilanjutkan dengan aktivitas belanja dan pembayaran yang terintegrasi dengan Midtrans, hingga proses aktivasi affiliate dan pembentukan jaringan.

Selain itu, sistem juga mampu melakukan perhitungan komisi secara otomatis berdasarkan plan dan aturan yang telah ditentukan. Dengan demikian, backend yang dibangun telah mendukung operasional sistem secara menyeluruh, mulai dari pengguna umum hingga pengelolaan affiliate dan distribusi komisi.