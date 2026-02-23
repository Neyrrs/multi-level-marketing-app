import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/withdrawals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WithdrawalController::index
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
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
* @see \App\Http\Controllers\WithdrawalController::store
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/withdrawals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WithdrawalController::store
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WithdrawalController::store
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WithdrawalController::store
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WithdrawalController::store
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
export const show = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
show.url = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    withdrawal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        withdrawal: args.withdrawal,
                }

    return show.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
show.get = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
show.head = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
    const showForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
        showForm.get = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WithdrawalController::show
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
        showForm.head = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
export const update = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/api/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
update.url = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    withdrawal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        withdrawal: args.withdrawal,
                }

    return update.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
update.put = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
update.patch = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
    const updateForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
        updateForm.put = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\WithdrawalController::update
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
        updateForm.patch = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\WithdrawalController::destroy
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
export const destroy = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WithdrawalController::destroy
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
destroy.url = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    withdrawal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        withdrawal: args.withdrawal,
                }

    return destroy.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WithdrawalController::destroy
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
destroy.delete = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\WithdrawalController::destroy
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
    const destroyForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WithdrawalController::destroy
 * @see app/Http/Controllers/WithdrawalController.php:0
 * @route '/admin/api/withdrawals/{withdrawal}'
 */
        destroyForm.delete = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const withdrawals = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default withdrawals