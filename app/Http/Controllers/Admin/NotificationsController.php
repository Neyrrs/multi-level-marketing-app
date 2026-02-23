<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification as Notifier;
use App\Models\User;
use Inertia\Inertia;

class NotificationsController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->input('per_page', 25);
        $search = $request->input('search', '');

        $query = DatabaseNotification::latest('created_at');
        if ($search) {
            $query->where('type', 'like', "%{$search}%");
        }

        $notifications = $query->paginate($perPage);

        return Inertia::render('admin/notifications/index', [
            'notifications' => $notifications->items(),
            'pagination' => [
                'total' => $notifications->total(),
                'currentPage' => $notifications->currentPage(),
                'perPage' => $notifications->perPage(),
                'lastPage' => $notifications->lastPage(),
                'hasMore' => $notifications->hasMorePages(),
            ],
            'search' => $search,
        ]);
    }

    public function resend(string $id)
    {
        $notif = DatabaseNotification::find($id);
        if (!$notif) return response()->json(['error' => 'not found'], 404);

        try {
            $user = User::find($notif->notifiable_id);
            if (!$user) return response()->json(['error' => 'notifiable not found'], 404);

            $type = $notif->type;
            if ($type && class_exists($type)) {
                $data = $notif->data ?? [];
                try {
                    $instance = new $type($data);
                    Notifier::send($user, $instance);
                    return response()->json(['success' => true]);
                } catch (\Throwable $e) {
                    Log::warning('Resend: could not instantiate: ' . $e->getMessage());
                }
            }

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            Log::error('Resend error: ' . $e->getMessage());
            return response()->json(['error' => 'resend failed'], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            DatabaseNotification::find($id)?->delete();
            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'delete failed'], 500);
        }
    }
}
