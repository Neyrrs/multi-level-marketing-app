import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import products from './products'
import commissionMethods from './commission-methods'
import commissionRules from './commission-rules'
import affiliates from './affiliates'
import mlmTree from './mlm-tree'
import withdrawals from './withdrawals'
import notifications from './notifications'
import api from './api'
import UsersRole from './UsersRole'
import MasterProduk from './MasterProduk'
import ManajemenAffiliate from './ManajemenAffiliate'
import PengaturanPlan from './PengaturanPlan'
import PengaturanKomisi from './PengaturanKomisi'
import Orders from './Orders'
import Transaksi from './Transaksi'
import reports from './reports'
/**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:61
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
export const payoutReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payoutReport.url(options),
    method: 'get',
})

payoutReport.definition = {
    methods: ["get","head"],
    url: '/admin/payout-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
payoutReport.url = (options?: RouteQueryOptions) => {
    return payoutReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
payoutReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payoutReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
payoutReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payoutReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
    const payoutReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: payoutReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
        payoutReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payoutReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PayoutReportController::payoutReport
 * @see app/Http/Controllers/Admin/PayoutReportController.php:13
 * @route '/admin/payout-report'
 */
        payoutReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payoutReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    payoutReport.form = payoutReportForm
/**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
export const productManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productManagement.url(options),
    method: 'get',
})

productManagement.definition = {
    methods: ["get","head"],
    url: '/admin/product-management',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
productManagement.url = (options?: RouteQueryOptions) => {
    return productManagement.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
productManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productManagement.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
productManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: productManagement.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
    const productManagementForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: productManagement.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
        productManagementForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: productManagement.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:106
 * @route '/admin/product-management'
 */
        productManagementForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: productManagement.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    productManagement.form = productManagementForm
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
export const affiliateManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: affiliateManagement.url(options),
    method: 'get',
})

affiliateManagement.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
affiliateManagement.url = (options?: RouteQueryOptions) => {
    return affiliateManagement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
affiliateManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: affiliateManagement.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
affiliateManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: affiliateManagement.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
    const affiliateManagementForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: affiliateManagement.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
        affiliateManagementForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: affiliateManagement.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::affiliateManagement
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/affiliate-management'
 */
        affiliateManagementForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: affiliateManagement.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    affiliateManagement.form = affiliateManagementForm
/**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
export const commissionSetting = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: commissionSetting.url(options),
    method: 'get',
})

commissionSetting.definition = {
    methods: ["get","head"],
    url: '/admin/commission-setting',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
commissionSetting.url = (options?: RouteQueryOptions) => {
    return commissionSetting.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
commissionSetting.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: commissionSetting.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
commissionSetting.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: commissionSetting.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
    const commissionSettingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: commissionSetting.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
        commissionSettingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: commissionSetting.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:110
 * @route '/admin/commission-setting'
 */
        commissionSettingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: commissionSetting.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    commissionSetting.form = commissionSettingForm
/**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
export const planSetting = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: planSetting.url(options),
    method: 'get',
})

planSetting.definition = {
    methods: ["get","head"],
    url: '/admin/plan-setting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
planSetting.url = (options?: RouteQueryOptions) => {
    return planSetting.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
planSetting.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: planSetting.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
planSetting.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: planSetting.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
    const planSettingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: planSetting.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
        planSettingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: planSetting.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PlanController::planSetting
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/plan-setting'
 */
        planSettingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: planSetting.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    planSetting.form = planSettingForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
products: Object.assign(products, products),
commissionMethods: Object.assign(commissionMethods, commissionMethods),
commissionRules: Object.assign(commissionRules, commissionRules),
affiliates: Object.assign(affiliates, affiliates),
mlmTree: Object.assign(mlmTree, mlmTree),
withdrawals: Object.assign(withdrawals, withdrawals),
payoutReport: Object.assign(payoutReport, payoutReport),
notifications: Object.assign(notifications, notifications),
productManagement: Object.assign(productManagement, productManagement),
affiliateManagement: Object.assign(affiliateManagement, affiliateManagement),
commissionSetting: Object.assign(commissionSetting, commissionSetting),
planSetting: Object.assign(planSetting, planSetting),
api: Object.assign(api, api),
UsersRole: Object.assign(UsersRole, UsersRole),
MasterProduk: Object.assign(MasterProduk, MasterProduk),
ManajemenAffiliate: Object.assign(ManajemenAffiliate, ManajemenAffiliate),
PengaturanPlan: Object.assign(PengaturanPlan, PengaturanPlan),
PengaturanKomisi: Object.assign(PengaturanKomisi, PengaturanKomisi),
Orders: Object.assign(Orders, Orders),
Transaksi: Object.assign(Transaksi, Transaksi),
reports: Object.assign(reports, reports),
}

export default admin