import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
export const LaporanPenjualan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanPenjualan.url(options),
    method: 'get',
})

LaporanPenjualan.definition = {
    methods: ["get","head"],
    url: '/admin/reports/LaporanPenjualan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
LaporanPenjualan.url = (options?: RouteQueryOptions) => {
    return LaporanPenjualan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
LaporanPenjualan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanPenjualan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
LaporanPenjualan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LaporanPenjualan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
    const LaporanPenjualanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LaporanPenjualan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
        LaporanPenjualanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanPenjualan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Report\SalesReportController::LaporanPenjualan
 * @see app/Http/Controllers/Admin/Report/SalesReportController.php:15
 * @route '/admin/reports/LaporanPenjualan'
 */
        LaporanPenjualanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanPenjualan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LaporanPenjualan.form = LaporanPenjualanForm
/**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
export const LaporanAffiliate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanAffiliate.url(options),
    method: 'get',
})

LaporanAffiliate.definition = {
    methods: ["get","head"],
    url: '/admin/reports/LaporanAffiliate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
LaporanAffiliate.url = (options?: RouteQueryOptions) => {
    return LaporanAffiliate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
LaporanAffiliate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanAffiliate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
LaporanAffiliate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LaporanAffiliate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
    const LaporanAffiliateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LaporanAffiliate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
        LaporanAffiliateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanAffiliate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Report\AffiliateReportController::LaporanAffiliate
 * @see app/Http/Controllers/Admin/Report/AffiliateReportController.php:16
 * @route '/admin/reports/LaporanAffiliate'
 */
        LaporanAffiliateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanAffiliate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LaporanAffiliate.form = LaporanAffiliateForm
/**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
export const LaporanKeuangan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanKeuangan.url(options),
    method: 'get',
})

LaporanKeuangan.definition = {
    methods: ["get","head"],
    url: '/admin/reports/LaporanKeuangan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
LaporanKeuangan.url = (options?: RouteQueryOptions) => {
    return LaporanKeuangan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
LaporanKeuangan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanKeuangan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
LaporanKeuangan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LaporanKeuangan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
    const LaporanKeuanganForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LaporanKeuangan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
        LaporanKeuanganForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanKeuangan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Report\FinanceReportController::LaporanKeuangan
 * @see app/Http/Controllers/Admin/Report/FinanceReportController.php:17
 * @route '/admin/reports/LaporanKeuangan'
 */
        LaporanKeuanganForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanKeuangan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LaporanKeuangan.form = LaporanKeuanganForm
/**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
export const LaporanKomisi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanKomisi.url(options),
    method: 'get',
})

LaporanKomisi.definition = {
    methods: ["get","head"],
    url: '/admin/reports/LaporanKomisi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
LaporanKomisi.url = (options?: RouteQueryOptions) => {
    return LaporanKomisi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
LaporanKomisi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanKomisi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
LaporanKomisi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LaporanKomisi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
    const LaporanKomisiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LaporanKomisi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
        LaporanKomisiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanKomisi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Report\KomisiReportController::LaporanKomisi
 * @see app/Http/Controllers/Admin/Report/KomisiReportController.php:15
 * @route '/admin/reports/LaporanKomisi'
 */
        LaporanKomisiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanKomisi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LaporanKomisi.form = LaporanKomisiForm
/**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
export const LaporanProduk = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanProduk.url(options),
    method: 'get',
})

LaporanProduk.definition = {
    methods: ["get","head"],
    url: '/admin/reports/LaporanProduk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
LaporanProduk.url = (options?: RouteQueryOptions) => {
    return LaporanProduk.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
LaporanProduk.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LaporanProduk.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
LaporanProduk.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LaporanProduk.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
    const LaporanProdukForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LaporanProduk.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
        LaporanProdukForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanProduk.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Report\ProductReportController::LaporanProduk
 * @see app/Http/Controllers/Admin/Report/ProductReportController.php:16
 * @route '/admin/reports/LaporanProduk'
 */
        LaporanProdukForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LaporanProduk.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LaporanProduk.form = LaporanProdukForm
const reports = {
    LaporanPenjualan: Object.assign(LaporanPenjualan, LaporanPenjualan),
LaporanAffiliate: Object.assign(LaporanAffiliate, LaporanAffiliate),
LaporanKeuangan: Object.assign(LaporanKeuangan, LaporanKeuangan),
LaporanKomisi: Object.assign(LaporanKomisi, LaporanKomisi),
LaporanProduk: Object.assign(LaporanProduk, LaporanProduk),
}

export default reports