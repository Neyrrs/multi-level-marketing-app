import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/mlm-tree',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MlmTreeController::index
 * @see app/Http/Controllers/Admin/MlmTreeController.php:16
 * @route '/admin/mlm-tree'
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
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
export const show = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/mlm-tree/{affiliate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
show.url = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{affiliate}', parsedArgs.affiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
show.get = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
show.head = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
    const showForm = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
        showForm.get = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MlmTreeController::show
 * @see app/Http/Controllers/Admin/MlmTreeController.php:85
 * @route '/admin/mlm-tree/{affiliate}'
 */
        showForm.head = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const mlmTree = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default mlmTree