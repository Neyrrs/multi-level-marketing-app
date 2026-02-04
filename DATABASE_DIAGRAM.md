# DATABASE ARCHITECTURE DIAGRAM

## 🏗️ STRUCTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 1: AUTHENTICATION                      │
├─────────────────────────────────────────────────────────────────┤
│  users  ← password_reset_tokens, sessions                        │
│  ├─ id (PK)                                                      │
│  ├─ name, email (UNIQUE), phone (UNIQUE)                         │
│  ├─ password, status (active/inactive/suspended)                 │
│  └─ role_id (FK → roles via pivot)                               │
└─────────────────────────────────────────────────────────────────┘
         │
         ├─ user_profiles (1:1)
         │  ├─ personal_info (JSON)
         │  └─ address (JSON)
         │
         ├─ affiliates (1:1)
         │  ├─ sponsor_id (FK users)
         │  ├─ upline_id (FK users)
         │  └─ position (left/right/none)
         │
         └─ notification_logs (1:N)

┌─────────────────────────────────────────────────────────────────┐
│                LAYER 2: MASTER CONFIGURATION                     │
├─────────────────────────────────────────────────────────────────┤
│  commission_methods                                              │
│  ├─ id (PK)                                                      │
│  ├─ name (UNIQUE)                                                │
│  ├─ calculation_type (percentage/fixed/tier_based)               │
│  └─ is_active                                                    │
│           │                                                      │
│           ├─ commission_rules (1:N)                              │
│           │  ├─ rule_name                                        │
│           │  ├─ condition (JSON)                                 │
│           │  ├─ value (decimal)                                  │
│           │  └─ priority (int)                                   │
│           │                                                      │
│           └─ commissions (1:N)                                   │
│              ├─ affiliate_id (FK)                                │
│              ├─ order_id (FK)                                    │
│              ├─ rule_id (FK)                                     │
│              ├─ amount                                           │
│              ├─ commission_type                                  │
│              └─ status                                           │
│                                                                  │
│  withdrawal_policies                                             │
│  ├─ id (PK)                                                      │
│  ├─ name (UNIQUE)                                                │
│  ├─ minimum_amount, maximum_amount                               │
│  ├─ maximum_frequency_per_month                                  │
│  ├─ fee_type, fee_amount                                         │
│  └─ is_active                                                    │
│           │                                                      │
│           └─ affiliate_withdrawal_policies (N:N)                 │
│              ├─ affiliate_id (FK)                                │
│              ├─ policy_id (FK)                                   │
│              └─ is_active                                        │
│                                                                  │
│  cache_table, jobs_table                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              LAYER 3: PRODUCTS & CATALOG                         │
├─────────────────────────────────────────────────────────────────┤
│  products                                                        │
│  ├─ id (PK)                                                      │
│  ├─ name, slug (UNIQUE)                                          │
│  ├─ type (single/bundle)                                         │
│  ├─ harga_awal, diskon, harga_akhir                              │
│  ├─ stock, weight                                                │
│  ├─ is_affiliate_product                                         │
│  └─ generates_activation_code                                    │
│           │                                                      │
│           ├─ package_items (N:N through packages)                │
│           │                                                      │
│           └─ activation_codes (1:N)                              │
│              ├─ code (UNIQUE)                                    │
│              ├─ owner_id (FK users) ← bought package             │
│              ├─ used_by (FK users) ← used for registration       │
│              ├─ status (available/used/expired/voided)           │
│              ├─ price, value, commission_value                   │
│              ├─ usage_count, remaining_usage                     │
│              └─ generated_by (FK users)                          │
│                     │                                            │
│                     └─ order_activation_codes (N:N)              │
│                        └─ order_id (FK orders)                   │
│                                                                  │
│  packages                                                        │
│  ├─ id (PK)                                                      │
│  ├─ name, slug (UNIQUE)                                          │
│  ├─ price, discount, final_price                                 │
│  ├─ activation_codes_count (default: 1)                          │
│  └─ is_active, is_affiliate_package                              │
│           │                                                      │
│           └─ package_items (N:N)                                 │
│              ├─ product_id (FK)                                  │
│              ├─ quantity                                         │
│              └─ price overrides                                  │
│                                                                  │
│  carts                                                           │
│  ├─ id (PK)                                                      │
│  ├─ user_id (FK users, nullable) ← authenticated atau guest      │
│  ├─ session_id (UNIQUE) ← untuk guest tracking                   │
│  └─ expires_at                                                   │
│           │                                                      │
│           └─ cart_items (1:N)                                    │
│              ├─ product_id or package_id (FK)                    │
│              ├─ quantity                                         │
│              └─ price snapshot                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           LAYER 4: MLM TREE & AFFILIATE STRUCTURE                │
├─────────────────────────────────────────────────────────────────┤
│  affiliates (CORE)                                               │
│  ├─ id (PK)                                                      │
│  ├─ user_id (FK users, UNIQUE) ← 1:1                             │
│  ├─ sponsor_id (FK users) ← who recommended                      │
│  ├─ upline_id (FK users) ← parent in tree                        │
│  ├─ position (left/right/none)                                   │
│  ├─ level (tree depth)                                           │
│  ├─ left_count, right_count, pair_count                          │
│  ├─ left_volume, right_volume, total_volume                      │
│  ├─ is_active, activated_at                                      │
│  └─ activation_code_id (FK)                                      │
│           │                                                      │
│           ├─ mlm_trees (1:N) ← Nested Set Model                  │
│           │  ├─ parent_id (FK affiliates)                        │
│           │  ├─ left_position, right_position                    │
│           │  ├─ depth                                            │
│           │  └─ path, lineage                                    │
│           │                                                      │
│           ├─ affiliate_bank_accounts (1:N)                       │
│           │  ├─ bank_name, bank_code, account_number             │
│           │  ├─ account_holder                                   │
│           │  ├─ is_primary, is_verified                          │
│           │  ├─ minimum_withdrawal, maximum_withdrawal           │
│           │  └─ midtrans_token                                   │
│           │                                                      │
│           ├─ matching_histories (1:N)                            │
│           │  ├─ left_volume, right_volume, pairs_matched         │
│           │  ├─ period_date, period_type                         │
│           │  ├─ commission_generated, commission_amount          │
│           │  └─ unmatched_volume                                 │
│           │                                                      │
│           └─ commission_ledgers (1:N) ← Audit trail              │
│              ├─ type (credit/debit/adjustment)                   │
│              ├─ amount, description                              │
│              ├─ balance_before, balance_after                    │
│              ├─ reference, reference_type                        │
│              └─ status (pending/posted/reversed)                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│            LAYER 5: TRANSACTIONS & ORDERS                        │
├─────────────────────────────────────────────────────────────────┤
│  orders                                                          │
│  ├─ id (PK)                                                      │
│  ├─ order_number (UNIQUE)                                        │
│  ├─ user_id (FK users) ← customer                                │
│  ├─ affiliate_id (FK affiliates, nullable) ← penjual             │
│  ├─ payment_method, midtrans_order_id (UNIQUE)                   │
│  ├─ midtrans_data, shipping_data (JSON)                          │
│  ├─ product_type (single/package/activation_code)                │
│  ├─ product_id, product_name, quantity                           │
│  ├─ price, total_amount, shipping_cost, tax_amount, grand_total  │
│  ├─ payment_status (pending/paid/failed/expired)                 │
│  ├─ paid_at, payment_reference                                   │
│  ├─ status (pending/processing/shipped/completed/cancelled)      │
│  ├─ generates_activation_code, activation_codes_count            │
│  └─ notes                                                        │
│           │                                                      │
│           ├─ order_items (1:N)                                   │
│           │  ├─ product_id or package_id (FK)                    │
│           │  ├─ quantity                                         │
│           │  ├─ harga_awal, diskon, harga_akhir                  │
│           │  └─ gives_activation_code                            │
│           │                                                      │
│           ├─ order_activation_codes (1:N) ← Generated codes       │
│           │  ├─ activation_code_id (FK)                          │
│           │  └─ sequence                                         │
│           │                                                      │
│           ├─ commissions (1:N)                                   │
│           │                                                      │
│           └─ commission_calculations (1:N)                       │
│              ├─ affiliate_id (FK)                                │
│              ├─ method_id, commission_id (FKs)                   │
│              ├─ rule_applied, calculation_detail                 │
│              └─ status, calculated_at, paid_at                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           LAYER 6: COMMISSION & PAYOUT TRACKING                  │
├─────────────────────────────────────────────────────────────────┤
│  commissions (master commission record)                          │
│  ├─ id (PK)                                                      │
│  ├─ affiliate_id (FK affiliates)                                 │
│  ├─ order_id (FK orders, nullable)                               │
│  ├─ method_id (FK commission_methods)                            │
│  ├─ rule_id (FK commission_rules, nullable)                      │
│  ├─ amount, commission_type                                      │
│  ├─ depth_level (for level commission)                           │
│  ├─ calculation_detail (JSON)                                    │
│  ├─ status (pending → calculated → approved → paid)              │
│  ├─ calculated_at, paid_at, approved_at                          │
│  └─ timestamps                                                   │
│           │                                                      │
│           ├─ commission_calculations (referensi detail)          │
│           │                                                      │
│           ├─ commission_ledgers (satu entry kredit)              │
│           │                                                      │
│           └─ binary_payouts (for matching only)                  │
│                                                                  │
│  binary_payouts (batch processing per periode)                   │
│  ├─ id (PK)                                                      │
│  ├─ affiliate_id (FK)                                            │
│  ├─ batch_number, payout_date, payout_period                     │
│  ├─ left_volume, right_volume, pairs_matched                     │
│  ├─ method_id, rule_id (FKs)                                     │
│  ├─ payout_amount, calculation_detail                            │
│  ├─ status (calculated/approved/paid)                            │
│  ├─ approved_by, approved_at (FKs)                               │
│  ├─ commission_id (FK commissions, nullable)                     │
│  └─ notes                                                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│        LAYER 7: WITHDRAWALS & NOTIFICATIONS                      │
├─────────────────────────────────────────────────────────────────┤
│  withdrawals                                                     │
│  ├─ id (PK)                                                      │
│  ├─ withdrawal_number (UNIQUE) ← reference number                │
│  ├─ affiliate_id (FK affiliates)                                 │
│  ├─ bank_account_id (FK affiliate_bank_accounts)                 │
│  ├─ destination_account, destination_bank, destination_name      │
│  ├─ amount, fee, net_amount                                      │
│  ├─ status (pending/approved/processing/completed/rejected)      │
│  ├─ approved_by, approved_at (FKs users)                         │
│  ├─ processed_at                                                 │
│  ├─ midtrans_reference, midtrans_response                        │
│  ├─ rejection_reason, notes                                      │
│  └─ timestamps                                                   │
│           │                                                      │
│           ├─ withdrawal_histories (1:N)                          │
│           │  ├─ old_status, new_status                           │
│           │  ├─ changed_by (FK users)                            │
│           │  └─ notes                                            │
│           │                                                      │
│           └─ commission_ledgers (satu entry debit)               │
│                                                                  │
│  notification_logs (all notifications)                           │
│  ├─ id (PK)                                                      │
│  ├─ user_id (FK users)                                           │
│  ├─ notification_type (whatsapp/email/sms)                       │
│  ├─ template, destination                                        │
│  ├─ status (pending/sent/failed/delivered)                       │
│  ├─ sent_at, attempt_count, last_attempt_at                      │
│  ├─ data (JSON), error_message                                   │
│  └─ timestamps                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW DIAGRAM

### Commission Calculation Flow
```
┌──────────────┐
│ Order Paid   │
│ (payment=ok) │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────┐
│ Trigger: ProcessCommissionsJob  │
└──────┬────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│ CommissionService                        │
│ - Get active commission_methods          │
│ - For each method:                       │
│   - Check commission_rules (by priority) │
│   - If condition met → Calculate         │
└──────┬───────────────────────────────────┘
       │
       ├─────────────────────────┬──────────────────────┐
       ▼                         ▼                      ▼
  ┌────────────┐         ┌──────────────┐      ┌──────────────┐
  │ Direct     │         │ Matching     │      │ Level        │
  │ Commission │         │ Commission   │      │ Commission   │
  └────┬───────┘         └──────┬───────┘      └──────┬───────┘
       │                        │                     │
       └────────────┬───────────┴────────────┬────────┘
                    ▼
       ┌─────────────────────────┐
       │ Create commissions      │
       │ (status=calculated)     │
       └──────┬──────────────────┘
              │
              ▼
       ┌──────────────────────────┐
       │ commission_calculations  │
       │ (store detail)           │
       └──────┬───────────────────┘
              │
              ▼
       ┌──────────────────────────┐
       │ commission_ledgers       │
       │ (credit posted)          │
       │ balance_after updated    │
       └──────────────────────────┘
```

### Binary Matching Flow (Daily/Weekly)
```
┌─────────────────────────────────┐
│ Cron: ProcessMatchingCommand    │
│ (scheduled daily/weekly)        │
└────────┬────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ BinaryMatchingService          │
│ - Get all active affiliates    │
└────────┬───────────────────────┘
         │
         ▼
    For Each Affiliate:
    ┌──────────────────────────────┐
    │ Get downline orders          │
    │ - Left side volume           │
    │ - Right side volume          │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ Calculate pairs_matched:     │
    │ = min(left_vol, right_vol)   │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ Store matching_histories     │
    │ - left_volume                │
    │ - right_volume               │
    │ - pairs_matched              │
    └────────┬─────────────────────┘
             │
         If pairs > 0:
             ▼
    ┌──────────────────────────────┐
    │ Create commission            │
    │ (matching type)              │
    │ Amount = pairs × rate        │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ Create binary_payouts        │
    │ (for batch processing)       │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ commission_ledgers (credit)  │
    └──────────────────────────────┘
```

### Withdrawal Request Flow
```
┌─────────────────────────┐
│ Affiliate Request       │
│ Withdrawal              │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ WithdrawalService               │
│ - Get active policy             │
│ - Validate constraints:         │
│   • minimum_amount              │
│   • maximum_frequency           │
│   • balance requirement         │
└────────┬────────────────────────┘
         │
    If Valid:     If Invalid:
         │             │
         ▼             ▼
    ┌────────┐    ┌─────────┐
    │ Proceed│    │ Reject  │
    └────┬───┘    └─────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Create withdrawals record        │
│ - amount, fee, net_amount        │
│ - status = pending               │
│ - bank_account_id                │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ commission_ledgers               │
│ - type = debit                   │
│ - status = pending               │
│ - amount = withdrawal amount     │
└────────┬─────────────────────────┘
         │
    (Waiting for admin approval)
         │
         ▼
┌──────────────────────────────────┐
│ Admin approves withdrawal        │
│ - status = approved              │
│ - approved_at = now              │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Job: ProcessWithdrawalPaymentJob │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Midtrans integration             │
│ - Create VA or transfer          │
│ - Get reference                  │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Update withdrawals               │
│ - status = processing            │
│ - midtrans_reference             │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ withdrawal_histories (tracking)  │
└────────┬─────────────────────────┘
         │
    (Wait for confirmation)
         │
         ▼
┌──────────────────────────────────┐
│ Webhook: Payment confirmed       │
│ - status = completed             │
│ - commission_ledger (posted)     │
└──────────────────────────────────┘
```

---

## 📐 KEY RELATIONSHIPS

### One-to-Many (1:N)
- users → affiliates
- users → user_profiles
- users → notification_logs
- users → orders (as customer)
- commission_methods → commission_rules
- commission_methods → commissions
- commission_rules → commissions
- affiliates → commissions
- affiliates → commission_ledgers
- affiliates → withdrawals
- affiliates → affiliate_bank_accounts
- affiliates → matching_histories
- affiliates → mlm_trees
- orders → order_items
- orders → order_activation_codes
- orders → commissions
- orders → commission_calculations
- packages → package_items
- products → package_items
- products → activation_codes
- carts → cart_items
- withdrawals → withdrawal_histories
- commissions → commission_calculations
- commissions → binary_payouts

### Many-to-Many (N:N) with Junction
- affiliates ←→ withdrawal_policies (via affiliate_withdrawal_policies)

### One-to-One (1:1)
- users ← affiliate (user_id unique in affiliates)
- users ← user_profiles (user_id unique in user_profiles)

---

## 🎯 OPTIMIZATION NOTES

### Indexes for Common Queries
```sql
-- Find affiliate commissions for period
SELECT * FROM commissions 
WHERE affiliate_id = ? 
  AND created_at BETWEEN ? AND ? 
  AND status IN ('pending', 'calculated')
-- Index: (affiliate_id, created_at, status)

-- Find pending withdrawals for admin
SELECT * FROM withdrawals 
WHERE status = 'pending' 
ORDER BY created_at ASC
-- Index: (status, created_at)

-- Find affiliate's downline tree
SELECT * FROM affiliates 
WHERE upline_id = ? 
  AND is_active = true
-- Index: (upline_id, is_active)

-- Affiliate matching history
SELECT * FROM matching_histories 
WHERE affiliate_id = ? 
  AND period_date BETWEEN ? AND ?
-- Index: (affiliate_id, period_date)
```

### Query Performance Considerations
1. ✅ All FKs indexed
2. ✅ Status columns indexed
3. ✅ Date range queries optimized
4. ✅ Composite indexes for common joins
5. ✅ JSONB fields for flexible data
6. ✅ Ledger tables for audit trails
7. ✅ Batch operations for volume processing

---

**Generated**: 2026-01-20  
**Diagram Version**: 1.0  
**Status**: ✅ FINALIZED
