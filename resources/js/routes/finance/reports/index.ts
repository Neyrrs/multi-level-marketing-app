import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/finance/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Finance\FinanceReportController::index
 * @see app/Http/Controllers/Finance/FinanceReportController.php:15
 * @route '/finance/reports'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const reports = {
    index: Object.assign(index, index),
}

export default reports