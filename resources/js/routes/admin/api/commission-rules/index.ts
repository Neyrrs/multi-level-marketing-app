import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/commission-rules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommissionRuleController::index
 * @see app/Http/Controllers/CommissionRuleController.php:10
 * @route '/admin/api/commission-rules'
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
* @see \App\Http\Controllers\CommissionRuleController::store
 * @see app/Http/Controllers/CommissionRuleController.php:15
 * @route '/admin/api/commission-rules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/commission-rules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommissionRuleController::store
 * @see app/Http/Controllers/CommissionRuleController.php:15
 * @route '/admin/api/commission-rules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionRuleController::store
 * @see app/Http/Controllers/CommissionRuleController.php:15
 * @route '/admin/api/commission-rules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommissionRuleController::store
 * @see app/Http/Controllers/CommissionRuleController.php:15
 * @route '/admin/api/commission-rules'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommissionRuleController::store
 * @see app/Http/Controllers/CommissionRuleController.php:15
 * @route '/admin/api/commission-rules'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
export const show = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/commission-rules/{commission_rule}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
show.url = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commission_rule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commission_rule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commission_rule: args.commission_rule,
                }

    return show.definition.url
            .replace('{commission_rule}', parsedArgs.commission_rule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
show.get = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
show.head = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
    const showForm = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
        showForm.get = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommissionRuleController::show
 * @see app/Http/Controllers/CommissionRuleController.php:0
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
        showForm.head = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
export const update = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/api/commission-rules/{commission_rule}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
update.url = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commission_rule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commission_rule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commission_rule: args.commission_rule,
                }

    return update.definition.url
            .replace('{commission_rule}', parsedArgs.commission_rule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
update.put = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
update.patch = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
    const updateForm = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
        updateForm.put = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CommissionRuleController::update
 * @see app/Http/Controllers/CommissionRuleController.php:32
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
        updateForm.patch = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CommissionRuleController::destroy
 * @see app/Http/Controllers/CommissionRuleController.php:48
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
export const destroy = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/commission-rules/{commission_rule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommissionRuleController::destroy
 * @see app/Http/Controllers/CommissionRuleController.php:48
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
destroy.url = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commission_rule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commission_rule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commission_rule: args.commission_rule,
                }

    return destroy.definition.url
            .replace('{commission_rule}', parsedArgs.commission_rule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommissionRuleController::destroy
 * @see app/Http/Controllers/CommissionRuleController.php:48
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
destroy.delete = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommissionRuleController::destroy
 * @see app/Http/Controllers/CommissionRuleController.php:48
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
    const destroyForm = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommissionRuleController::destroy
 * @see app/Http/Controllers/CommissionRuleController.php:48
 * @route '/admin/api/commission-rules/{commission_rule}'
 */
        destroyForm.delete = (args: { commission_rule: string | number } | [commission_rule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const commissionRules = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default commissionRules