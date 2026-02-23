import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
export const soldRecord = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: soldRecord.url(options),
    method: 'get',
})

soldRecord.definition = {
    methods: ["get","head"],
    url: '/manager/reports/sold-record',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
soldRecord.url = (options?: RouteQueryOptions) => {
    return soldRecord.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
soldRecord.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: soldRecord.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
soldRecord.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: soldRecord.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
    const soldRecordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: soldRecord.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
        soldRecordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: soldRecord.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\Report\SalesReportController::soldRecord
 * @see app/Http/Controllers/Manager/Report/SalesReportController.php:14
 * @route '/manager/reports/sold-record'
 */
        soldRecordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: soldRecord.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    soldRecord.form = soldRecordForm
/**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
export const financeRecord = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: financeRecord.url(options),
    method: 'get',
})

financeRecord.definition = {
    methods: ["get","head"],
    url: '/manager/reports/finance-record',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
financeRecord.url = (options?: RouteQueryOptions) => {
    return financeRecord.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
financeRecord.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: financeRecord.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
financeRecord.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: financeRecord.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
    const financeRecordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: financeRecord.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
        financeRecordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: financeRecord.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\Report\FinanceReportController::financeRecord
 * @see app/Http/Controllers/Manager/Report/FinanceReportController.php:14
 * @route '/manager/reports/finance-record'
 */
        financeRecordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: financeRecord.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    financeRecord.form = financeRecordForm
/**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
export const productRecord = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productRecord.url(options),
    method: 'get',
})

productRecord.definition = {
    methods: ["get","head"],
    url: '/manager/reports/product-record',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
productRecord.url = (options?: RouteQueryOptions) => {
    return productRecord.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
productRecord.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productRecord.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
productRecord.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: productRecord.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
    const productRecordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: productRecord.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
        productRecordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: productRecord.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\Report\ProductReportController::productRecord
 * @see app/Http/Controllers/Manager/Report/ProductReportController.php:14
 * @route '/manager/reports/product-record'
 */
        productRecordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: productRecord.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    productRecord.form = productRecordForm
/**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
export const commissionRecord = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: commissionRecord.url(options),
    method: 'get',
})

commissionRecord.definition = {
    methods: ["get","head"],
    url: '/manager/reports/commission-record',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
commissionRecord.url = (options?: RouteQueryOptions) => {
    return commissionRecord.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
commissionRecord.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: commissionRecord.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
commissionRecord.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: commissionRecord.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
    const commissionRecordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: commissionRecord.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
        commissionRecordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: commissionRecord.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\Report\CommissionReportController::commissionRecord
 * @see app/Http/Controllers/Manager/Report/CommissionReportController.php:14
 * @route '/manager/reports/commission-record'
 */
        commissionRecordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: commissionRecord.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    commissionRecord.form = commissionRecordForm
/**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
export const affiliateRecord = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: affiliateRecord.url(options),
    method: 'get',
})

affiliateRecord.definition = {
    methods: ["get","head"],
    url: '/manager/reports/affiliate-record',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
affiliateRecord.url = (options?: RouteQueryOptions) => {
    return affiliateRecord.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
affiliateRecord.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: affiliateRecord.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
affiliateRecord.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: affiliateRecord.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
    const affiliateRecordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: affiliateRecord.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
        affiliateRecordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: affiliateRecord.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\Report\AffiliateReportController::affiliateRecord
 * @see app/Http/Controllers/Manager/Report/AffiliateReportController.php:14
 * @route '/manager/reports/affiliate-record'
 */
        affiliateRecordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: affiliateRecord.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    affiliateRecord.form = affiliateRecordForm
const reports = {
    soldRecord: Object.assign(soldRecord, soldRecord),
financeRecord: Object.assign(financeRecord, financeRecord),
productRecord: Object.assign(productRecord, productRecord),
commissionRecord: Object.assign(commissionRecord, commissionRecord),
affiliateRecord: Object.assign(affiliateRecord, affiliateRecord),
}

export default reports