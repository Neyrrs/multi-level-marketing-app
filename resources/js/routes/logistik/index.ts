import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import orders from './orders'
import shipments from './shipments'
import inventory from './inventory'
import reports from './reports'
/**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/logistik/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\DashboardController::dashboard
 * @see app/Http/Controllers/Logistik/DashboardController.php:13
 * @route '/logistik/dashboard'
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
const logistik = {
    dashboard: Object.assign(dashboard, dashboard),
orders: Object.assign(orders, orders),
shipments: Object.assign(shipments, shipments),
inventory: Object.assign(inventory, inventory),
reports: Object.assign(reports, reports),
}

export default logistik