import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/commission-methods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommissionMethodController::index
 * @see app/Http/Controllers/CommissionMethodController.php:10
 * @route '/admin/api/commission-methods'
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
* @see \App\Http\Controllers\CommissionMethodController::store
 * @see app/Http/Controllers/CommissionMethodController.php:15
 * @route '/admin/api/commission-methods'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/commission-methods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommissionMethodController::store
 * @see app/Http/Controllers/CommissionMethodController.php:15
 * @route '/admin/api/commission-methods'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionMethodController::store
 * @see app/Http/Controllers/CommissionMethodController.php:15
 * @route '/admin/api/commission-methods'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommissionMethodController::store
 * @see app/Http/Controllers/CommissionMethodController.php:15
 * @route '/admin/api/commission-methods'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommissionMethodController::store
 * @see app/Http/Controllers/CommissionMethodController.php:15
 * @route '/admin/api/commission-methods'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
export const show = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/commission-methods/{commission_method}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
show.url = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commission_method: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commission_method: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commission_method: args.commission_method,
                }

    return show.definition.url
            .replace('{commission_method}', parsedArgs.commission_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
show.get = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
show.head = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
    const showForm = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
        showForm.get = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommissionMethodController::show
 * @see app/Http/Controllers/CommissionMethodController.php:0
 * @route '/admin/api/commission-methods/{commission_method}'
 */
        showForm.head = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
export const update = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/api/commission-methods/{commission_method}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
update.url = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commission_method: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commission_method: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commission_method: args.commission_method,
                }

    return update.definition.url
            .replace('{commission_method}', parsedArgs.commission_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
update.put = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
update.patch = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
    const updateForm = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
        updateForm.put = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CommissionMethodController::update
 * @see app/Http/Controllers/CommissionMethodController.php:26
 * @route '/admin/api/commission-methods/{commission_method}'
 */
        updateForm.patch = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CommissionMethodController::destroy
 * @see app/Http/Controllers/CommissionMethodController.php:37
 * @route '/admin/api/commission-methods/{commission_method}'
 */
export const destroy = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/commission-methods/{commission_method}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommissionMethodController::destroy
 * @see app/Http/Controllers/CommissionMethodController.php:37
 * @route '/admin/api/commission-methods/{commission_method}'
 */
destroy.url = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commission_method: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commission_method: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commission_method: args.commission_method,
                }

    return destroy.definition.url
            .replace('{commission_method}', parsedArgs.commission_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionMethodController::destroy
 * @see app/Http/Controllers/CommissionMethodController.php:37
 * @route '/admin/api/commission-methods/{commission_method}'
 */
destroy.delete = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommissionMethodController::destroy
 * @see app/Http/Controllers/CommissionMethodController.php:37
 * @route '/admin/api/commission-methods/{commission_method}'
 */
    const destroyForm = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommissionMethodController::destroy
 * @see app/Http/Controllers/CommissionMethodController.php:37
 * @route '/admin/api/commission-methods/{commission_method}'
 */
        destroyForm.delete = (args: { commission_method: string | number } | [commission_method: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const commissionMethods = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default commissionMethods