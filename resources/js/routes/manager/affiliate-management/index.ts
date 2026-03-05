import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manager/affiliate-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::index
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:17
 * @route '/manager/affiliate-management'
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
/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::approve
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:52
 * @route '/manager/affiliate-management/{affiliate}/approve'
 */
export const approve = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/manager/affiliate-management/{affiliate}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::approve
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:52
 * @route '/manager/affiliate-management/{affiliate}/approve'
 */
approve.url = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { affiliate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { affiliate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    affiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        affiliate: typeof args.affiliate === 'object'
                ? args.affiliate.id
                : args.affiliate,
                }

    return approve.definition.url
            .replace('{affiliate}', parsedArgs.affiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::approve
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:52
 * @route '/manager/affiliate-management/{affiliate}/approve'
 */
approve.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::approve
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:52
 * @route '/manager/affiliate-management/{affiliate}/approve'
 */
    const approveForm = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Manager\AffiliateManagementController::approve
 * @see app/Http/Controllers/Manager/AffiliateManagementController.php:52
 * @route '/manager/affiliate-management/{affiliate}/approve'
 */
        approveForm.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
const affiliateManagement = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
}

export default affiliateManagement