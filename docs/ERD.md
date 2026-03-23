# Database, Relasi Model, dan Alur Sistem

## 1) Struktur Database (Tabel)

### A. User & Auth
- `users`
- `user_profiles`
- `password_reset_tokens`
- `sessions`
- `permissions`, `roles`, `model_has_permissions`, `model_has_roles`, `role_has_permissions`

### B. Katalog & Keranjang
- `products`
- `packages`
- `package_items`
- `carts`
- `cart_items`

### C. Affiliate & MLM
- `affiliates`
- `activation_codes`
- `mlm_trees`
- `matching_histories`

### D. Order & Fulfillment
- `orders`
- `order_items`
- `order_activation_codes`
- `shipments`
- `shipment_trackings`

### E. Commission Engine
- `commission_methods`
- `commission_rules`
- `commission_plans`
- `commission_plan_rule`
- `commissions`
- `commission_calculations`
- `commission_ledgers`
- `binary_payouts`

### F. Withdrawal
- `affiliate_bank_accounts`
- `withdrawal_policies`
- `affiliate_withdrawal_policies`
- `withdrawals`
- `withdrawal_histories`

### G. Notification & System
- `notification_logs`
- `cache`, `cache_locks`
- `jobs`, `job_batches`, `failed_jobs`

## 2) Relasi Antar Model (Eloquent)

### A. User Side
- `User hasOne UserProfile`
- `User hasOne Affiliate`
- `User hasMany Order`
- `User hasMany Cart`
- `User hasMany NotificationLog`
- `User hasMany ActivationCode` sebagai owner (`owner_id`)
- `User hasMany ActivationCode` sebagai user pemakai (`used_by`)
- `User hasMany ActivationCode` sebagai generator (`generated_by`)

### B. Affiliate Side
- `Affiliate belongsTo User`
- `Affiliate belongsTo User` sebagai sponsor (`sponsor_id`)
- `Affiliate belongsTo User` sebagai upline (`upline_id`)
- `Affiliate belongsTo ActivationCode`
- `Affiliate belongsTo CommissionMethod`
- `Affiliate belongsTo CommissionPlan`
- `Affiliate hasMany Order`
- `Affiliate hasMany Commission`
- `Affiliate hasMany CommissionCalculation`
- `Affiliate hasMany Withdrawal`
- `Affiliate hasMany AffiliateBankAccount`
- `Affiliate hasMany MatchingHistory`
- `Affiliate hasMany CommissionLedger`
- `Affiliate hasMany BinaryPayout`
- `Affiliate hasOne MlmTree`
- `Affiliate belongsToMany WithdrawalPolicy` via `affiliate_withdrawal_policies`

### C. Product/Package/Cart Side
- `Product hasMany PackageItem`
- `Product hasMany ActivationCode`
- `Product hasMany Order`
- `Product hasMany OrderItem`
- `Product hasMany CartItem`

- `Package hasMany PackageItem`
- `Package hasMany ActivationCode`
- `Package hasMany OrderItem`
- `Package hasMany CartItem`

- `PackageItem belongsTo Package`
- `PackageItem belongsTo Product`

- `Cart belongsTo User`
- `Cart hasMany CartItem`
- `CartItem belongsTo Cart`
- `CartItem belongsTo Product`
- `CartItem belongsTo Package`

### D. Order & Shipment Side
- `Order belongsTo User`
- `Order belongsTo Affiliate`
- `Order belongsTo Product`
- `Order hasMany OrderItem`
- `Order hasMany Commission`
- `Order hasMany CommissionCalculation`
- `Order hasMany CommissionLedger`
- `Order belongsToMany ActivationCode` via `order_activation_codes`
- `Order hasMany Shipment`
- `Order hasOne Shipment` (latest)

- `OrderItem belongsTo Order`
- `OrderItem belongsTo Product`
- `OrderItem belongsTo Package`

- `OrderActivationCode belongsTo Order`
- `OrderActivationCode belongsTo ActivationCode`

- `Shipment belongsTo Order`
- `Shipment belongsTo User`
- `Shipment belongsTo Affiliate`
- `Shipment hasMany ShipmentTracking`
- `ShipmentTracking belongsTo Shipment`

### E. Commission Side
- `CommissionMethod hasMany CommissionRule`
- `CommissionMethod hasMany Commission`
- `CommissionMethod hasMany CommissionCalculation`
- `CommissionMethod hasMany BinaryPayout`

- `CommissionRule belongsTo CommissionMethod`
- `CommissionRule hasMany Commission`
- `CommissionRule hasMany BinaryPayout`
- `CommissionRule belongsToMany CommissionPlan` via `commission_plan_rule`

- `CommissionPlan belongsToMany CommissionRule` via `commission_plan_rule`
- `CommissionPlan hasMany Affiliate`

- `Commission belongsTo Affiliate`
- `Commission belongsTo Order`
- `Commission belongsTo CommissionMethod`
- `Commission belongsTo CommissionRule`
- `Commission hasMany CommissionCalculation`
- `Commission hasMany CommissionLedger`
- `Commission hasMany BinaryPayout`

- `CommissionCalculation belongsTo Order`
- `CommissionCalculation belongsTo Affiliate`
- `CommissionCalculation belongsTo CommissionMethod`
- `CommissionCalculation belongsTo Commission`

- `CommissionLedger belongsTo Affiliate`
- `CommissionLedger belongsTo Commission`
- `CommissionLedger belongsTo Order`

- `BinaryPayout belongsTo Affiliate`
- `BinaryPayout belongsTo CommissionMethod`
- `BinaryPayout belongsTo CommissionRule`
- `BinaryPayout belongsTo User` sebagai approver (`approved_by`)
- `BinaryPayout belongsTo Commission`

### F. Withdrawal Side
- `AffiliateBankAccount belongsTo Affiliate`
- `AffiliateBankAccount hasMany Withdrawal`

- `Withdrawal belongsTo Affiliate`
- `Withdrawal belongsTo AffiliateBankAccount`
- `Withdrawal belongsTo User` sebagai approver (`approved_by`)
- `Withdrawal hasMany WithdrawalHistory`

- `WithdrawalHistory belongsTo Withdrawal`
- `WithdrawalHistory belongsTo User` sebagai changer (`changed_by`)

- `WithdrawalPolicy belongsToMany Affiliate` via `affiliate_withdrawal_policies`

### G. Activation Code Side
- `ActivationCode belongsTo User` sebagai owner (`owner_id`)
- `ActivationCode belongsTo User` sebagai used by (`used_by`)
- `ActivationCode belongsTo User` sebagai generated by (`generated_by`)
- `ActivationCode belongsTo Product`
- `ActivationCode belongsTo Package`
- `ActivationCode hasMany OrderActivationCode`
- `ActivationCode hasMany Affiliate`

## 3) Alur Sistem (Flow Bisnis)

### 1. Registrasi & Aktivasi User
1. User register di `users`.
2. Profil user masuk ke `user_profiles`.
3. Kalau user daftar sebagai affiliate, dibuat record `affiliates` dengan sponsor/upline.
4. Jika pakai kode aktivasi, `activation_codes.used_by` dan status kode di-update.

### 2. Belanja & Checkout
1. User pilih `products/packages`, item masuk `carts` dan `cart_items`.
2. Checkout membentuk `orders` + `order_items`.
3. Kalau order menghasilkan activation code, sistem buat `activation_codes` lalu hubungkan via `order_activation_codes`.
4. Status pembayaran di `orders.payment_status` berubah dari `pending` ke `paid`.

### 3. Pengiriman
1. Setelah order diproses, dibuat `shipments`.
2. Tiap update tracking masuk ke `shipment_trackings`.
3. Status shipment bergerak sampai `delivered`/`returned`.

### 4. Hitung Komisi Affiliate
1. Order paid memicu evaluasi metode dan rule (`commission_methods`, `commission_rules`).
2. Hasil hitung disimpan ke `commission_calculations`.
3. Komisi final dibuat di `commissions`.
4. Saldo pergerakan dicatat ke `commission_ledgers`.
5. Untuk binary bonus periodik, diproses ke `binary_payouts` dan direferensikan ke komisi.

### 5. Withdrawal Komisi
1. Affiliate set rekening di `affiliate_bank_accounts`.
2. Policy withdrawal aktif ditentukan dari `withdrawal_policies` via `affiliate_withdrawal_policies`.
3. Request tarik dana masuk `withdrawals`.
4. Setiap perubahan status dicatat di `withdrawal_histories`.
5. Notifikasi status bisa dikirim dan dicatat di `notification_logs`.

## 4) Catatan Implementasi Penting

- Secara desain saat ini, `sponsor_id` dan `upline_id` di `affiliates` mengarah ke `users`.
- Relasi many-to-many utama:
  - `orders <-> activation_codes` lewat `order_activation_codes`
  - `commission_plans <-> commission_rules` lewat `commission_plan_rule`
  - `affiliates <-> withdrawal_policies` lewat `affiliate_withdrawal_policies`
