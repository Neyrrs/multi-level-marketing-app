/**
 * UI Constants - Single Source of Truth
 * 
 * Digunakan di seluruh aplikasi untuk konsistensi visual dan styling
 */

/**
 * STATUS_COLORS - Pemetaan color untuk semua status badge
 * Format: 'bg-color text-color dark:bg-dark-color dark:text-dark-color'
 */
export const STATUS_COLORS = {
    // Commission & Finance statuses
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    
    // Logistics statuses
    processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    ready_to_ship: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    in_transit: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    returned: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    lost: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    
    // General statuses
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
} as const;

/**
 * SPACING - Standard spacing scale untuk konsistensi layout
 */
export const SPACING = {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
} as const;

/**
 * GAP - Standard gap/gutter untuk spacing antar elemen
 */
export const GAP = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
} as const;

/**
 * GRID_COLS - Pre-defined responsive grid templates
 */
export const GRID_COLS = {
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    twoCol: 'grid-cols-1 md:grid-cols-2 gap-4',
    threeCol: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    fourCol: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
    sixCol: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4',
} as const;

/**
 * Utility function untuk get status color - untuk backward compatibility
 */
export const getStatusColor = (status: string | undefined): string => {
    if (!status) return STATUS_COLORS.draft;
    
    const key = status.toLowerCase().replace(/\s+/g, '_') as keyof typeof STATUS_COLORS;
    return STATUS_COLORS[key] || STATUS_COLORS.draft;
};
