import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/logistik/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\OrderController::index
 * @see app/Http/Controllers/Logistik/OrderController.php:16
 * @route '/logistik/orders'
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
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/logistik/orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\OrderController::create
 * @see app/Http/Controllers/Logistik/OrderController.php:85
 * @route '/logistik/orders/create'
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
* @see \App\Http\Controllers\Logistik\OrderController::store
 * @see app/Http/Controllers/Logistik/OrderController.php:93
 * @route '/logistik/orders'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/logistik/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::store
 * @see app/Http/Controllers/Logistik/OrderController.php:93
 * @route '/logistik/orders'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::store
 * @see app/Http/Controllers/Logistik/OrderController.php:93
 * @route '/logistik/orders'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::store
 * @see app/Http/Controllers/Logistik/OrderController.php:93
 * @route '/logistik/orders'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::store
 * @see app/Http/Controllers/Logistik/OrderController.php:93
 * @route '/logistik/orders'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
export const show = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/logistik/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
show.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
show.get = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
show.head = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
    const showForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
        showForm.get = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\OrderController::show
 * @see app/Http/Controllers/Logistik/OrderController.php:101
 * @route '/logistik/orders/{order}'
 */
        showForm.head = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
export const edit = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/logistik/orders/{order}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
edit.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return edit.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
edit.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
edit.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
    const editForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
        editForm.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\OrderController::edit
 * @see app/Http/Controllers/Logistik/OrderController.php:154
 * @route '/logistik/orders/{order}/edit'
 */
        editForm.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
export const update = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/logistik/orders/{order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
update.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return update.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
update.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
update.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
    const updateForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
        updateForm.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Logistik\OrderController::update
 * @see app/Http/Controllers/Logistik/OrderController.php:162
 * @route '/logistik/orders/{order}'
 */
        updateForm.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Logistik\OrderController::destroy
 * @see app/Http/Controllers/Logistik/OrderController.php:180
 * @route '/logistik/orders/{order}'
 */
export const destroy = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/logistik/orders/{order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::destroy
 * @see app/Http/Controllers/Logistik/OrderController.php:180
 * @route '/logistik/orders/{order}'
 */
destroy.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return destroy.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::destroy
 * @see app/Http/Controllers/Logistik/OrderController.php:180
 * @route '/logistik/orders/{order}'
 */
destroy.delete = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::destroy
 * @see app/Http/Controllers/Logistik/OrderController.php:180
 * @route '/logistik/orders/{order}'
 */
    const destroyForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::destroy
 * @see app/Http/Controllers/Logistik/OrderController.php:180
 * @route '/logistik/orders/{order}'
 */
        destroyForm.delete = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Logistik\OrderController::markReadyToShip
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/{order}/mark-ready-to-ship'
 */
export const markReadyToShip = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReadyToShip.url(args, options),
    method: 'post',
})

markReadyToShip.definition = {
    methods: ["post"],
    url: '/logistik/orders/{order}/mark-ready-to-ship',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::markReadyToShip
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/{order}/mark-ready-to-ship'
 */
markReadyToShip.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return markReadyToShip.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::markReadyToShip
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/{order}/mark-ready-to-ship'
 */
markReadyToShip.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReadyToShip.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::markReadyToShip
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/{order}/mark-ready-to-ship'
 */
    const markReadyToShipForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markReadyToShip.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::markReadyToShip
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/{order}/mark-ready-to-ship'
 */
        markReadyToShipForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markReadyToShip.url(args, options),
            method: 'post',
        })
    
    markReadyToShip.form = markReadyToShipForm
/**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
export const awaitingShipment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: awaitingShipment.url(options),
    method: 'get',
})

awaitingShipment.definition = {
    methods: ["get","head"],
    url: '/logistik/orders/awaiting-shipment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
awaitingShipment.url = (options?: RouteQueryOptions) => {
    return awaitingShipment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
awaitingShipment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: awaitingShipment.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
awaitingShipment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: awaitingShipment.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
    const awaitingShipmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: awaitingShipment.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
        awaitingShipmentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: awaitingShipment.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\OrderController::awaitingShipment
 * @see app/Http/Controllers/Logistik/OrderController.php:0
 * @route '/logistik/orders/awaiting-shipment'
 */
        awaitingShipmentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: awaitingShipment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    awaitingShipment.form = awaitingShipmentForm
const orders = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
markReadyToShip: Object.assign(markReadyToShip, markReadyToShip),
awaitingShipment: Object.assign(awaitingShipment, awaitingShipment),
}

export default orders