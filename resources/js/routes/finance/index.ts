import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import transactions from './transactions'
import withdrawals from './withdrawals'
import reports from './reports'
/**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/finance/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Finance\DashboardController::dashboard
 * @see app/Http/Controllers/Finance/DashboardController.php:17
 * @route '/finance/dashboard'
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
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
export const network = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: network.url(options),
    method: 'get',
})

network.definition = {
    methods: ["get","head"],
    url: '/finance/network',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
network.url = (options?: RouteQueryOptions) => {
    return network.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
network.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: network.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
network.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: network.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
    const networkForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: network.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
        networkForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: network.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Finance\NetworkController::network
 * @see app/Http/Controllers/Finance/NetworkController.php:15
 * @route '/finance/network'
 */
        networkForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: network.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    network.form = networkForm
const finance = {
    dashboard: Object.assign(dashboard, dashboard),
transactions: Object.assign(transactions, transactions),
withdrawals: Object.assign(withdrawals, withdrawals),
reports: Object.assign(reports, reports),
network: Object.assign(network, network),
}

export default finance