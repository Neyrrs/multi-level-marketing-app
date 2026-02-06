<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     // Manage Orders
    public function index()
    {
        // return Inertia::render('logistik/manage-orders/index');
    }

    public function ManageOrders()
    {
        return Inertia::render('logistik/manage-orders/index');
    }

    public function shippingStatus()
    {
        return Inertia::render('logistik/shipping-status/index');
    }

    public function ProductStockManagement()
    {
        return Inertia::render('logistik/product-stock-management/index');
    }

    public function StockMovement()
    {
        return Inertia::render('logistik/stock-movement/index');
    }

    public function ProductReturns()
    {
        return Inertia::render('logistik/product-returns/index');
    }

    public function ReturnHistory()
    {
        return Inertia::render('logistik/return-history/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
