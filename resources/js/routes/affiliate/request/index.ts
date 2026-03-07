import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/request',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\AffiliateRequestController::index
 * @see app/Http/Controllers/Affiliate/AffiliateRequestController.php:11
 * @route '/affiliate/request'
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
const request = {
    index: Object.assign(index, index),
}

export default request