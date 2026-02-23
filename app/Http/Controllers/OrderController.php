<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\OrderService;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'affiliate_id' => 'nullable|exists:affiliates,id',
        ]);

        $service = new OrderService();
        $order = $service->createOrder($validated['user_id'], $validated['product_id'], $validated['affiliate_id'] ?? null);

        return redirect()->back()->with('success', 'Order created: ' . $order->order_number);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('admin/Orders/show', ['order' => $order->load(['user','affiliate','items','commissions'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate(['status' => 'required|string']);
        $order->update($validated);
        return redirect()->back()->with('success', 'Order updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->back()->with('success', 'Order deleted');
    }

    /**
     * Payment callback from Midtrans (public endpoint)
     */
    public function paymentCallback(Request $request)
    {
        $midtransId = $request->input('order_id');
        $status = $request->input('transaction_status');

        $order = Order::where('midtrans_order_id', $midtransId)->first();
        if (!$order) return response()->json(['ok']);

        if ($status === 'settlement') {
            $service = new OrderService();
            $service->processPayment($order->id);
        }

        return response()->json(['ok']);
    }

    public function history($userId)
    {
        $orders = Order::where('user_id', $userId)->latest()->paginate(20);
        return Inertia::render('orders/history', ['orders' => $orders]);
    }
}
