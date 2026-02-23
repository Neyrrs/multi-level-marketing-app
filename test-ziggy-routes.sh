#!/bin/bash

echo "=== ZIGGY ROUTES VERIFICATION ==="
echo ""

echo "1. Checking route name conflicts:"
echo "   Searching for duplicate 'admin.products.index' names..."
php artisan route:list | grep -c "admin.products.index"
echo "   (Should be 1, not 2)"
echo ""

echo "2. Listing key admin routes:"
php artisan route:list --path=admin | grep -E "(dashboard|products|commission|affiliates|withdrawals)" | head -20
echo ""

echo "3. Checking AppServiceProvider has Ziggy share:"
grep -c "new Ziggy()" app/Providers/AppServiceProvider.php && echo "   ✓ Ziggy is shared" || echo "   ✗ Ziggy NOT shared"
echo ""

echo "4. Checking app.tsx initializes window.route:"
grep -c "window.route =" resources/js/app.tsx && echo "   ✓ window.route initialized" || echo "   ✗ window.route NOT initialized"
echo ""

echo "5. All admin pages import route from ziggy-js:"
grep -l "import.*route.*from.*ziggy" resources/js/pages/admin/**/*.tsx 2>/dev/null | wc -l
echo "   (Should be around 7 pages)"
echo ""

echo "=== SUMMARY ==="
echo "If all checks pass above, Ziggy routing should work!"
echo "Try accessing: http://localhost:8000/admin/products"
