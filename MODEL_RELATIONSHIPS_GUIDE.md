# 📚 MODEL RELATIONSHIPS GUIDE - LARAVEL TINKER TESTING

**Project**: ALUS - Affiliate Loyalty User System  
**Date**: 2026-01-20  
**Database**: PostgreSQL  

---

## 🚀 QUICK START - TESTING DI TINKER

### 1. Buka Tinker
```bash
php artisan tinker
```

### 2. Test Relasi Dasar (One-to-One/HasMany)
```php
// Test User dengan UserProfile
$user = User::with('profile')->first();
$user->profile->phone;  // Akses profile

// Test User dengan ActivationCodes
$user = User::with('activationCodes')->first();
$user->activationCodes->count();  // Jumlah kode

// Test User dengan Orders
$user = User::with('orders')->first();
$user->orders->sum('total_amount');  // Total belanja
```

### 3. Test Relasi Complex (Nested)
```php
// User → Affiliate → Orders → Commissions
$user = User::with('affiliate.orders.commissions')->first();
$user->affiliate->orders;
$user->affiliate->orders->first()->commissions;

// Affiliate → BankAccounts → Withdrawals
$affiliate = Affiliate::with('bankAccounts.withdrawals')->first();
$affiliate->bankAccounts->first()->withdrawals;
```

---

## 📊 COMPLETE RELATIONSHIP MAP

### USER MODEL
**Namespace**: `App\Models\User`

#### Relationships Definition
```php
// One-to-One
hasOne('UserProfile')           // User punya 1 profile
hasOne('Affiliate')             // User punya 1 affiliate

// One-to-Many
hasMany('ActivationCode', 'owner_id')      // User punya banyak kode (sebagai owner)
hasMany('ActivationCode', 'used_by')       // User punya banyak kode (yg dipakai)
hasMany('ActivationCode', 'generated_by')  // User punya banyak kode (yg dibuat)
hasMany('Order')                           // User punya banyak orders
hasMany('Cart')                            // User punya banyak carts
hasMany('NotificationLog')                 // User punya banyak notifikasi

// Has-Many-Through
hasManyThrough('Order', 'Affiliate')       // Via affiliate
```

#### Tinker Examples
```php
# 1. Get User dengan Profile-nya
$user = User::with('profile')->first();
echo $user->profile->phone;

# 2. Get User dengan semua Activation Codes (owned)
$user = User::with('activationCodes')->first();
$user->activationCodes->where('status', 'available')->count();

# 3. Get User dengan Orders
$user = User::with('orders')->first();
$user->orders->sum('total_amount');

# 4. Get User dengan Affiliate
$user = User::with('affiliate')->first();
$user->affiliate->left_volume + $user->affiliate->right_volume;

# 5. Get User dengan Notifications
$user = User::first();
$user->notificationLogs()->latest()->limit(5)->get();

# 6. Total orders via affiliate (HasManyThrough)
$user = User::with('ordersThroughAffiliate')->first();
$user->ordersThroughAffiliate->count();
```

---

### USER PROFILE MODEL
**Namespace**: `App\Models\UserProfile`

#### Relationships
```php
belongsTo('User')                  // Belongs to 1 user
```

#### Tinker Examples
```php
# 1. Get Profile dengan User-nya
$profile = UserProfile::with('user')->first();
echo $profile->user->email;

# 2. Get Profiles dengan filter
$profiles = UserProfile::where('verified', true)
    ->with('user')
    ->get();

# 3. Update profile via user
$user = User::first();
$user->profile->update(['phone' => '08123456789']);
```

---

### ACTIVATION CODE MODEL
**Namespace**: `App\Models\ActivationCode`

#### Relationships
```php
belongsTo('User', 'owner_id')              # Owner (pembeli)
belongsTo('User', 'used_by')               # Pengguna (yg pakai)
belongsTo('User', 'generated_by')          # Pembuat
belongsTo('Product')                       # Product (nullable)
belongsTo('Package')                       # Package (nullable)
hasMany('OrderActivationCode')             # Used in orders
hasMany('Affiliate')                       # Affiliates yg dibuat dari kode ini
```

#### Tinker Examples
```php
# 1. Get Activation Code dengan owner & product
$code = ActivationCode::with('owner', 'product')->first();
echo $code->code;
echo $code->owner->email;
echo $code->product->name;

# 2. Get available codes
$codes = ActivationCode::where('status', 'available')->get();

# 3. Get codes used in specific order
$order = Order::first();
$codes = $order->activationCodes; // Via relation

# 4. Get affiliate created from this code
$code = ActivationCode::first();
$affiliate = $code->affiliate; // Single affiliate

# 5. Mark code as used
$code = ActivationCode::first();
$code->update([
    'status' => 'used',
    'used_at' => now(),
    'used_by' => auth()->id(),
]);
```

---

### AFFILIATE MODEL
**Namespace**: `App\Models\Affiliate`

#### Relationships
```php
belongsTo('User')                           # User (affiliates harus punya user)
belongsTo('User', 'sponsor_id')             # Sponsor (yang refer)
belongsTo('User', 'upline_id')              # Upline (parent di tree)
belongsTo('ActivationCode')                 # Activation code yg digunakan

hasMany('Order')                            # Orders dari affiliate ini
hasMany('Commission')                       # Commissions yg earned
hasMany('CommissionCalculation')            # Calculation records
hasMany('Withdrawal')                       # Withdrawal requests
hasMany('BankAccount')                      # Bank accounts (multiple)
hasMany('MatchingHistory')                  # Volume matching history
hasMany('CommissionLedger')                 # Commission audit trail
hasMany('BinaryPayout')                     # Payout records
hasMany('WithdrawalPolicy')                 # Withdrawal policies

belongsToMany('WithdrawalPolicy')           # Via affiliate_withdrawal_policies
hasManyThrough('Cart', 'User')              # Carts via user
```

#### Tinker Examples
```php
# 1. Get Affiliate dengan User & Sponsor
$affiliate = Affiliate::with('user', 'sponsor')->first();
echo $affiliate->user->email;
echo $affiliate->sponsor->name;

# 2. Get Affiliate dengan Upline (parent di binary tree)
$affiliate = Affiliate::with('upline')->first();
if ($affiliate->upline) {
    echo $affiliate->upline->user->name; // Parent name
}

# 3. Get Affiliate's Orders
$affiliate = Affiliate::with('orders')->first();
$totalSales = $affiliate->orders->sum('total_amount');

# 4. Get Affiliate's Commissions
$affiliate = Affiliate::first();
$commissions = $affiliate->commissions()
    ->where('status', 'approved')
    ->get();
$totalCommission = $commissions->sum('amount_net');

# 5. Get Affiliate's Bank Accounts
$affiliate = Affiliate::with('bankAccounts')->first();
foreach ($affiliate->bankAccounts as $account) {
    echo $account->bank_name . ': ' . $account->account_number;
}

# 6. Get Affiliate's Volume (Left & Right)
$affiliate = Affiliate::first();
echo "Left: " . $affiliate->left_volume;
echo "Right: " . $affiliate->right_volume;

# 7. Get Affiliate's Withdrawal History
$affiliate = Affiliate::first();
$withdrawals = $affiliate->withdrawals()
    ->with('histories')
    ->latest()
    ->get();

# 8. Get Affiliate dengan semua relations (eager loading)
$affiliate = Affiliate::with([
    'user',
    'orders',
    'commissions',
    'bankAccounts',
    'withdrawals'
])->first();

# 9. Get Downline Affiliates (Children dalam tree)
$affiliate = Affiliate::first();
$children = Affiliate::where('upline_id', $affiliate->user_id)->get();

# 10. Get Matching History
$affiliate = Affiliate::first();
$matches = $affiliate->matchingHistories()->latest()->get();
```

---

### PRODUCT MODEL
**Namespace**: `App\Models\Product`

#### Relationships
```php
hasMany('PackageItem')              # Packages yang include produk ini
hasMany('ActivationCode')           # Activation codes untuk produk ini
hasMany('Order')                    # Orders untuk produk ini
hasMany('OrderItem')                # Order items (detail)
hasMany('CartItem')                 # Items di cart
```

#### Tinker Examples
```php
# 1. Get Product dengan Packages
$product = Product::with('packageItems.package')->first();
foreach ($product->packageItems as $item) {
    echo $item->package->name;
}

# 2. Get Product dengan Orders
$product = Product::with('orders')->first();
$totalSold = $product->orders->count();
$revenue = $product->orders->sum('total_amount');

# 3. Get Product dengan Activation Codes
$product = Product::first();
$availableCodes = $product->activationCodes()
    ->where('status', 'available')
    ->count();

# 4. Get all cart items for product
$product = Product::first();
$cartItems = $product->cartItems()->count();
```

---

### PACKAGE MODEL
**Namespace**: `App\Models\Package`

#### Relationships
```php
hasMany('PackageItem')              # Products dalam package
hasMany('ActivationCode')           # Activation codes
hasMany('OrderItem')                # Order items
hasMany('CartItem')                 # Cart items
```

#### Tinker Examples
```php
# 1. Get Package dengan Products
$package = Package::with('packageItems.product')->first();
foreach ($package->packageItems as $item) {
    echo $item->product->name . ' x' . $item->quantity;
}

# 2. Get total value
$package = Package::first();
$totalValue = $package->packageItems->sum(function($item) {
    return $item->quantity * $item->product->price;
});

# 3. Get Package dengan Orders
$package = Package::with('orders')->first();
$totalOrders = $package->orders->count();
```

---

### ORDER MODEL
**Namespace**: `App\Models\Order`

#### Relationships
```php
belongsTo('User')                   # Customer
belongsTo('Affiliate')              # Affiliate yang sell (nullable)
belongsTo('Product')                # Product (nullable)

hasMany('OrderItem')                # Items dalam order
hasMany('Commission')               # Commissions dari order ini
hasMany('CommissionCalculation')    # Calculation records
hasMany('CommissionLedger')         # Ledger records
hasMany('OrderActivationCode')      # Codes dalam order
```

#### Tinker Examples
```php
# 1. Get Order dengan Customer & Items
$order = Order::with('user', 'items')->first();
echo "Customer: " . $order->user->email;
foreach ($order->items as $item) {
    echo $item->product->name . ' x' . $item->quantity;
}

# 2. Get Order dengan Affiliate (seller)
$order = Order::with('affiliate.user')->first();
if ($order->affiliate) {
    echo "Sold by: " . $order->affiliate->user->name;
}

# 3. Get Order dengan Commissions
$order = Order::with('commissions.affiliate.user')->first();
foreach ($order->commissions as $comm) {
    echo $comm->affiliate->user->name . ': ' . $comm->amount_net;
}

# 4. Get Order dengan total calculation
$order = Order::with('items')->first();
$subtotal = $order->items->sum(function($item) {
    return $item->quantity * $item->unit_price;
});

# 5. Get Activation Codes dalam order
$order = Order::with('activationCodes.code')->first();
foreach ($order->activationCodes as $ac) {
    echo $ac->code;
}
```

---

### ORDER ITEM MODEL
**Namespace**: `App\Models\OrderItem`

#### Relationships
```php
belongsTo('Order')                  # Order yang ini item
belongsTo('Product')                # Product (nullable)
belongsTo('Package')                # Package (nullable)
```

#### Tinker Examples
```php
# 1. Get OrderItem dengan Order & Product
$item = OrderItem::with('order', 'product')->first();
echo $item->order->order_number;
echo $item->product->name;

# 2. Get all items in order
$order = Order::first();
$items = $order->items()->with('product')->get();
```

---

### CART MODEL
**Namespace**: `App\Models\Cart`

#### Relationships
```php
belongsTo('User')                   # User's cart
hasMany('CartItem')                 # Items dalam cart
```

#### Tinker Examples
```php
# 1. Get Cart dengan Items & Products
$cart = Cart::with('items.product', 'items.package')->first();
foreach ($cart->items as $item) {
    echo $item->product->name . ' x' . $item->quantity;
}

# 2. Calculate cart total
$cart = Cart::first();
$total = $cart->items->sum(function($item) {
    return $item->quantity * ($item->product->price ?? $item->package->price);
});

# 3. Get carts yang abandoned
$carts = Cart::whereNull('checked_out_at')
    ->where('updated_at', '<', now()->subDays(7))
    ->get();
```

---

### CART ITEM MODEL
**Namespace**: `App\Models\CartItem`

#### Relationships
```php
belongsTo('Cart')                   # Cart yang ini item
belongsTo('Product')                # Product (nullable)
belongsTo('Package')                # Package (nullable)
```

#### Tinker Examples
```php
# 1. Get CartItem dengan semua relations
$item = CartItem::with('cart.user', 'product')->first();
echo $item->cart->user->email . ": " . $item->product->name;

# 2. Get products dalam specific cart
$cart = Cart::first();
$products = $cart->items()->with('product')->get();
```

---

### COMMISSION METHOD MODEL
**Namespace**: `App\Models\CommissionMethod`

#### Relationships
```php
hasMany('CommissionRule')           # Rules untuk method ini
hasMany('Commission')               # Commissions dengan method ini
hasMany('CommissionCalculation')    # Calculations
hasMany('BinaryPayout')             # Payouts
```

#### Tinker Examples
```php
# 1. Get Method dengan Rules
$method = CommissionMethod::with('rules')->first();
foreach ($method->rules as $rule) {
    echo $rule->description;
}

# 2. Get Commissions untuk method
$method = CommissionMethod::first();
$totalCommissions = $method->commissions()->sum('amount_gross');

# 3. Get semua methods
$methods = CommissionMethod::all();
foreach ($methods as $method) {
    echo $method->name . ': ' . $method->description;
}
```

---

### COMMISSION RULE MODEL
**Namespace**: `App\Models\CommissionRule`

#### Relationships
```php
belongsTo('CommissionMethod')       # Method untuk rule ini
hasMany('Commission')               # Commissions pakai rule ini
hasMany('BinaryPayout')             # Payouts pakai rule ini
```

#### Tinker Examples
```php
# 1. Get Rule dengan Method
$rule = CommissionRule::with('method')->first();
echo $rule->method->name . ": " . $rule->description;

# 2. Get Commissions untuk rule
$rule = CommissionRule::first();
$commissions = $rule->commissions()->get();
```

---

### COMMISSION MODEL
**Namespace**: `App\Models\Commission` (or `Commision`)

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate yg earned
belongsTo('Order')                  # Order yang generate commission
belongsTo('CommissionMethod')       # Method calculation
belongsTo('CommissionRule')         # Rule yang dipakai

hasMany('CommissionCalculation')    # Calculations
hasMany('CommissionLedger')         # Ledger records
hasMany('BinaryPayout')             # Payouts
```

#### Tinker Examples
```php
# 1. Get Commission dengan Affiliate & Order
$comm = Commission::with('affiliate.user', 'order')->first();
echo $comm->affiliate->user->name . ": Rp " . $comm->amount_net;
echo "Order: " . $comm->order->order_number;

# 2. Get Approved Commissions
$commissions = Commission::where('status', 'approved')
    ->with('affiliate')
    ->get();
$totalApproved = $commissions->sum('amount_net');

# 3. Get Commissions by Affiliate
$affiliate = Affiliate::first();
$commissions = $affiliate->commissions()
    ->where('status', '!=', 'rejected')
    ->get();

# 4. Get Commission dengan Ledger
$comm = Commission::with('ledgers')->first();
foreach ($comm->ledgers as $ledger) {
    echo $ledger->action . ': ' . $ledger->description;
}

# 5. Get pending commissions
$pending = Commission::where('status', 'pending')->get();
```

---

### COMMISSION CALCULATION MODEL
**Namespace**: `App\Models\CommisionCalculation`

#### Relationships
```php
belongsTo('Order')                  # Order yang dihitung
belongsTo('Affiliate')              # Affiliate target
belongsTo('CommissionMethod')       # Method yg dipakai
belongsTo('Commission')             # Commission record (nullable)
```

#### Tinker Examples
```php
# 1. Get Calculation dengan Order & Affiliate
$calc = CommissionCalculation::with('order', 'affiliate.user')->first();
echo $calc->order->order_number . " for " . $calc->affiliate->user->name;

# 2. Get calculations for specific affiliate
$affiliate = Affiliate::first();
$calculations = CommissionCalculation::where('affiliate_id', $affiliate->id)->get();

# 3. Get pending calculations (not yet approved)
$pending = CommissionCalculation::whereNull('commission_id')->get();
```

---

### COMMISSION LEDGER MODEL
**Namespace**: `App\Models\CommissionLedger`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate
belongsTo('Commission')             # Commission record (nullable)
belongsTo('Order')                  # Order reference (nullable)
```

#### Tinker Examples
```php
# 1. Get Ledger dengan Affiliate
$ledger = CommissionLedger::with('affiliate.user')->first();
echo $ledger->affiliate->user->name . ": " . $ledger->action;

# 2. Get audit trail untuk affiliate
$affiliate = Affiliate::first();
$ledgers = $affiliate->commissionLedgers()
    ->latest()
    ->limit(10)
    ->get();

# 3. Get specific action ledgers
$ledgers = CommissionLedger::where('action', 'approved')->get();
```

---

### BINARY PAYOUT MODEL
**Namespace**: `App\Models\BinaryPayout`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate recipient
belongsTo('CommissionMethod')       # Method used
belongsTo('CommissionRule')         # Rule applied
belongsTo('User', 'approved_by')    # Approver
belongsTo('Commission')             # Associated commission (nullable)
```

#### Tinker Examples
```php
# 1. Get Payout dengan Affiliate & Commission
$payout = BinaryPayout::with('affiliate.user', 'commission')->first();
echo $payout->affiliate->user->name . ": Rp " . $payout->amount_total;

# 2. Get pending payouts
$pending = BinaryPayout::where('status', 'pending')->get();

# 3. Get paid payouts
$paid = BinaryPayout::where('status', 'paid')
    ->with('affiliate.user')
    ->get();

# 4. Calculate total paid
$totalPaid = BinaryPayout::where('status', 'paid')->sum('amount_total');
```

---

### MLM TREE MODEL
**Namespace**: `App\Models\MlmTree`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate dalam tree
belongsTo('Affiliate', 'parent_id') # Parent (upline)
hasMany('MlmTree', 'parent_id')    # Children (downline)
```

#### Tinker Examples
```php
# 1. Get Tree dengan Parent
$tree = MlmTree::with('affiliate.user', 'parent.affiliate.user')->first();
echo $tree->affiliate->user->name;
if ($tree->parent) {
    echo " -> Parent: " . $tree->parent->affiliate->user->name;
}

# 2. Get Children
$affiliate = Affiliate::first();
$tree = $affiliate->mlmTree;
$children = $tree->children()->with('affiliate.user')->get();

# 3. Build whole downline
$affiliate = Affiliate::first();
function getDownline($affiliate) {
    $tree = $affiliate->mlmTree;
    $children = $tree->children()->with('affiliate.user')->get();
    foreach ($children as $child) {
        echo $child->affiliate->user->name . "\n";
        getDownline($child->affiliate);
    }
}
getDownline($affiliate);
```

---

### MATCHING HISTORY MODEL
**Namespace**: `App\Models\MatchingHistory`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate yg di-match
```

#### Tinker Examples
```php
# 1. Get Matching History untuk Affiliate
$affiliate = Affiliate::first();
$history = $affiliate->matchingHistories()->latest()->get();

# 2. Get recent matching
$recent = MatchingHistory::latest()->limit(10)->get();
foreach ($recent as $match) {
    echo $match->affiliate->user->name . ": ";
    echo "Left: " . $match->left_volume . ", Right: " . $match->right_volume;
}

# 3. Get today's matching
$today = MatchingHistory::whereDate('created_at', today())->get();
```

---

### AFFILIATE BANK ACCOUNT MODEL
**Namespace**: `App\Models\AffiliateBankAccount`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate punya account
hasMany('Withdrawal')               # Withdrawals via account ini
```

#### Tinker Examples
```php
# 1. Get Bank Account dengan Affiliate
$account = AffiliateBankAccount::with('affiliate.user')->first();
echo $account->affiliate->user->name . ": " . $account->account_number;

# 2. Get all accounts untuk affiliate
$affiliate = Affiliate::first();
$accounts = $affiliate->bankAccounts()->get();

# 3. Get account dengan Withdrawals
$account = AffiliateBankAccount::with('withdrawals')->first();
$totalWithdrawn = $account->withdrawals->sum('amount');

# 4. Get verified accounts
$verified = AffiliateBankAccount::where('is_verified', true)->get();
```

---

### WITHDRAWAL MODEL
**Namespace**: `App\Models\withdrawals`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate yang withdraw
belongsTo('AffiliateBankAccount')   # Bank account tujuan
belongsTo('User', 'approved_by')    # Approver

hasMany('WithdrawalHistory')        # Status change history
```

#### Tinker Examples
```php
# 1. Get Withdrawal dengan Affiliate & Bank Account
$wd = Withdrawal::with('affiliate.user', 'bankAccount')->first();
echo $wd->affiliate->user->name . " -> " . $wd->bankAccount->account_number;
echo "Amount: Rp " . $wd->amount;

# 2. Get pending withdrawals
$pending = Withdrawal::where('status', 'pending')
    ->with('affiliate.user')
    ->get();

# 3. Get withdrawal history
$wd = Withdrawal::first();
$history = $wd->histories()->latest()->get();
foreach ($history as $h) {
    echo $h->status . " at " . $h->created_at;
}

# 4. Get approved withdrawals
$approved = Withdrawal::where('status', 'approved')->get();
$totalApproved = $approved->sum('amount');

# 5. Get recent withdrawals
$recent = Withdrawal::latest()->limit(10)->get();
```

---

### WITHDRAWAL HISTORY MODEL
**Namespace**: `App\Models\withdrawalsHistory`

#### Relationships
```php
belongsTo('Withdrawal')             # Withdrawal record
belongsTo('User', 'changed_by')     # User yang ubah status
```

#### Tinker Examples
```php
# 1. Get History dengan Withdrawal & User
$history = WithdrawalHistory::with('withdrawal', 'changedBy')->first();
echo $history->withdrawal->amount . " -> " . $history->status;
echo " by " . $history->changedBy->name;

# 2. Get withdrawal audit trail
$wd = Withdrawal::first();
$trail = $wd->histories()->latest()->get();

# 3. Track status changes
$histories = WithdrawalHistory::where('withdrawal_id', $withdrawalId)
    ->latest()
    ->get();
```

---

### NOTIFICATION LOG MODEL
**Namespace**: `App\Models\NotificationLog`

#### Relationships
```php
belongsTo('User')                   # User yang menerima notification
```

#### Tinker Examples
```php
# 1. Get Notifications untuk User
$user = User::first();
$notifications = $user->notificationLogs()
    ->latest()
    ->limit(10)
    ->get();

# 2. Get unread notifications
$unread = NotificationLog::where('is_read', false)
    ->where('user_id', $user->id)
    ->get();

# 3. Get specific type notifications
$whatsapp = NotificationLog::where('type', 'whatsapp')
    ->where('status', 'sent')
    ->get();

# 4. Get by date
$today = NotificationLog::whereDate('created_at', today())->get();
```

---

### WITHDRAWAL POLICY MODEL
**Namespace**: `App\Models\WithdrawalPolicy`

#### Relationships
```php
belongsToMany('Affiliate', 'affiliate_withdrawal_policies')  # Affiliates using this
```

#### Tinker Examples
```php
# 1. Get Policy dengan Affiliates
$policy = WithdrawalPolicy::with('affiliates')->first();

# 2. Get all policies
$policies = WithdrawalPolicy::all();
foreach ($policies as $policy) {
    echo $policy->name . ": Min " . $policy->min_amount . " - Max " . $policy->max_amount;
}
```

---

### AFFILIATE WITHDRAWAL POLICY (Junction)
**Namespace**: `App\Models\AffiliateWithdrawalPolicy`

#### Relationships
```php
belongsTo('Affiliate')              # Affiliate
belongsTo('WithdrawalPolicy')       # Policy
```

---

## 🧪 COMPLETE TESTING WORKFLOW IN TINKER

### Skenario 1: Test Salah Satu User
```php
# Step 1: Get user
$user = User::first();

# Step 2: Check profile
echo $user->profile->phone;

# Step 3: Check affiliate
$affiliate = $user->affiliate;
echo $affiliate->left_volume + $affiliate->right_volume;

# Step 4: Check orders
$orders = $user->orders()->with('items')->get();
echo "Total orders: " . $orders->count();

# Step 5: Check affiliate orders (as seller)
$affiliateOrders = Order::where('affiliate_id', $affiliate->id)
    ->with('items', 'commissions')
    ->get();
echo "Orders sold: " . $affiliateOrders->count();

# Step 6: Check commissions
$commissions = $affiliate->commissions()
    ->where('status', 'approved')
    ->get();
echo "Total commission: Rp " . $commissions->sum('amount_net');

# Step 7: Check withdrawals
$withdrawals = $affiliate->withdrawals()
    ->with('histories')
    ->latest()
    ->get();

# Step 8: Check bank accounts
$accounts = $affiliate->bankAccounts()->get();
```

### Skenario 2: Test Order dengan Commissions
```php
# Step 1: Get order
$order = Order::with('user', 'affiliate.user', 'items')->first();

# Step 2: Display order info
echo "Order: " . $order->order_number;
echo "Customer: " . $order->user->email;
echo "Seller: " . ($order->affiliate ? $order->affiliate->user->name : "Direct");

# Step 3: Display items
foreach ($order->items as $item) {
    echo $item->product->name . " x" . $item->quantity . " = Rp " . ($item->quantity * $item->unit_price);
}

# Step 4: Get commissions
$commissions = $order->commissions()->with('affiliate.user')->get();
echo "Total commissions: ";
foreach ($commissions as $comm) {
    echo $comm->affiliate->user->name . ": Rp " . $comm->amount_net;
}

# Step 5: Get activation codes
$codes = $order->activationCodes()->get();
echo "Codes in order: " . $codes->count();
```

### Skenario 3: Test Commission Flow
```php
# Step 1: Get pending commissions
$pending = Commission::where('status', 'pending')->with('affiliate.user', 'order')->first();

# Step 2: Check calculations
$calculations = CommissionCalculation::where('commission_id', $pending->id)->get();

# Step 3: Check ledger
$ledgers = CommissionLedger::where('commission_id', $pending->id)
    ->latest()
    ->get();

# Step 4: Approve commission (example)
$pending->update(['status' => 'approved']);
CommissionLedger::create([
    'affiliate_id' => $pending->affiliate_id,
    'commission_id' => $pending->id,
    'action' => 'approved',
    'description' => 'Commission approved'
]);
```

---

## 📋 QUICK RELATIONSHIP SUMMARY TABLE

| Model | belongsTo | hasOne | hasMany | belongsToMany |
|-------|-----------|--------|---------|---------------|
| **User** | - | UserProfile, Affiliate | ActivationCode, Order, Cart, NotificationLog | - |
| **UserProfile** | User | - | - | - |
| **ActivationCode** | User(owner), User(used_by), User(generated_by), Product, Package | - | OrderActivationCode, Affiliate | - |
| **Affiliate** | User, User(sponsor), User(upline), ActivationCode | - | Order, Commission, Withdrawal, BankAccount, MlmTree, MatchingHistory, CommissionLedger, BinaryPayout | WithdrawalPolicy |
| **Product** | - | - | PackageItem, ActivationCode, Order, OrderItem, CartItem | - |
| **Package** | - | - | PackageItem, ActivationCode, OrderItem, CartItem | - |
| **Order** | User, Affiliate, Product | - | OrderItem, Commission, OrderActivationCode, CommissionCalculation, CommissionLedger | - |
| **OrderItem** | Order, Product, Package | - | - | - |
| **Cart** | User | - | CartItem | - |
| **CartItem** | Cart, Product, Package | - | - | - |
| **CommissionMethod** | - | - | CommissionRule, Commission, CommissionCalculation, BinaryPayout | - |
| **CommissionRule** | CommissionMethod | - | Commission, BinaryPayout | - |
| **Commission** | Affiliate, Order, CommissionMethod, CommissionRule | - | CommissionCalculation, CommissionLedger, BinaryPayout | - |
| **CommissionCalculation** | Order, Affiliate, CommissionMethod, Commission | - | - | - |
| **CommissionLedger** | Affiliate, Commission, Order | - | - | - |
| **BinaryPayout** | Affiliate, CommissionMethod, CommissionRule, User(approved), Commission | - | - | - |
| **Withdrawal** | Affiliate, AffiliateBankAccount, User(approved) | - | WithdrawalHistory | - |
| **WithdrawalHistory** | Withdrawal, User(changed_by) | - | - | - |
| **MlmTree** | Affiliate, Affiliate(parent) | - | MlmTree(children) | - |
| **MatchingHistory** | Affiliate | - | - | - |
| **AffiliateBankAccount** | Affiliate | - | Withdrawal | - |
| **NotificationLog** | User | - | - | - |
| **WithdrawalPolicy** | - | - | - | Affiliate |

---

## 🎯 COMMON OPERATIONS

### Get Data dengan Eager Loading
```php
# Get affiliates dengan semua relations
$affiliates = Affiliate::with([
    'user',
    'orders',
    'commissions',
    'bankAccounts',
    'withdrawals',
    'mlmTree.affiliate.user'
])->get();

# Get orders dengan detail lengkap
$orders = Order::with([
    'user',
    'affiliate.user',
    'items.product',
    'commissions.affiliate.user',
    'activationCodes'
])->get();
```

### Relationship Count
```php
$affiliates = Affiliate::withCount([
    'orders',
    'commissions',
    'withdrawals',
    'bankAccounts'
])->get();

foreach ($affiliates as $aff) {
    echo $aff->user->name . ": ";
    echo "Orders: " . $aff->orders_count;
    echo ", Commissions: " . $aff->commissions_count;
}
```

### Relationship Filtering
```php
# Get affiliates dengan orders lebih dari 5
$topAffiliates = Affiliate::has('orders', '>=', 5)
    ->with('user')
    ->get();

# Get orders dari affiliate tertentu
$order = Order::whereHas('affiliate', function($q) {
    $q->where('user_id', 1);
})->get();
```

---

## ✅ READY TO TEST!

Sekarang Anda sudah punya:
1. ✅ Semua relationships didefinisikan
2. ✅ Contoh penggunaan untuk setiap relasi
3. ✅ Skenario testing lengkap
4. ✅ Quick commands untuk tinker

**Next Step**: Jalankan examples di tinker sebelum ke API/UI!

---

**Last Updated**: 2026-01-20  
**Status**: Ready for Testing ✅
