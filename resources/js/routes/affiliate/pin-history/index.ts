import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::index
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:11
 * @route '/affiliate/pin-history'
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
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-history/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::create
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::store
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/pin-history',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::store
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::store
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::store
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::store
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
export const show = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-history/{pin_history}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
show.url = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_history: args.pin_history,
                }

    return show.definition.url
            .replace('{pin_history}', parsedArgs.pin_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
show.get = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
show.head = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
    const showForm = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
        showForm.get = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::show
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
        showForm.head = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
export const edit = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-history/{pin_history}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
edit.url = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_history: args.pin_history,
                }

    return edit.definition.url
            .replace('{pin_history}', parsedArgs.pin_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
edit.get = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
edit.head = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
    const editForm = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
        editForm.get = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::edit
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}/edit'
 */
        editForm.head = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
export const update = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/pin-history/{pin_history}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
update.url = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_history: args.pin_history,
                }

    return update.definition.url
            .replace('{pin_history}', parsedArgs.pin_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
update.put = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
update.patch = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
    const updateForm = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
        updateForm.put = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::update
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
        updateForm.patch = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\PinHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
export const destroy = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/pin-history/{pin_history}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
destroy.url = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_history: args.pin_history,
                }

    return destroy.definition.url
            .replace('{pin_history}', parsedArgs.pin_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
destroy.delete = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
    const destroyForm = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:0
 * @route '/affiliate/pin-history/{pin_history}'
 */
        destroyForm.delete = (args: { pin_history: string | number } | [pin_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const pinHistory = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default pinHistory