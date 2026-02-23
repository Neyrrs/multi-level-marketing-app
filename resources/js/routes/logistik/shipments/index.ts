import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/logistik/shipments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::index
 * @see app/Http/Controllers/Logistik/ShipmentController.php:17
 * @route '/logistik/shipments'
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
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/logistik/shipments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::create
 * @see app/Http/Controllers/Logistik/ShipmentController.php:61
 * @route '/logistik/shipments/create'
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
* @see \App\Http\Controllers\Logistik\ShipmentController::store
 * @see app/Http/Controllers/Logistik/ShipmentController.php:75
 * @route '/logistik/shipments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/logistik/shipments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::store
 * @see app/Http/Controllers/Logistik/ShipmentController.php:75
 * @route '/logistik/shipments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::store
 * @see app/Http/Controllers/Logistik/ShipmentController.php:75
 * @route '/logistik/shipments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::store
 * @see app/Http/Controllers/Logistik/ShipmentController.php:75
 * @route '/logistik/shipments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::store
 * @see app/Http/Controllers/Logistik/ShipmentController.php:75
 * @route '/logistik/shipments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
export const show = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/logistik/shipments/{shipment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
show.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return show.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
show.get = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
show.head = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
    const showForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
        showForm.get = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::show
 * @see app/Http/Controllers/Logistik/ShipmentController.php:113
 * @route '/logistik/shipments/{shipment}'
 */
        showForm.head = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
export const edit = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/logistik/shipments/{shipment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
edit.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return edit.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
edit.get = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
edit.head = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
    const editForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
        editForm.get = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::edit
 * @see app/Http/Controllers/Logistik/ShipmentController.php:162
 * @route '/logistik/shipments/{shipment}/edit'
 */
        editForm.head = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
export const update = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/logistik/shipments/{shipment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
update.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return update.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
update.put = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
update.patch = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
    const updateForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
        updateForm.put = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::update
 * @see app/Http/Controllers/Logistik/ShipmentController.php:175
 * @route '/logistik/shipments/{shipment}'
 */
        updateForm.patch = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Logistik\ShipmentController::destroy
 * @see app/Http/Controllers/Logistik/ShipmentController.php:298
 * @route '/logistik/shipments/{shipment}'
 */
export const destroy = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/logistik/shipments/{shipment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::destroy
 * @see app/Http/Controllers/Logistik/ShipmentController.php:298
 * @route '/logistik/shipments/{shipment}'
 */
destroy.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return destroy.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::destroy
 * @see app/Http/Controllers/Logistik/ShipmentController.php:298
 * @route '/logistik/shipments/{shipment}'
 */
destroy.delete = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::destroy
 * @see app/Http/Controllers/Logistik/ShipmentController.php:298
 * @route '/logistik/shipments/{shipment}'
 */
    const destroyForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::destroy
 * @see app/Http/Controllers/Logistik/ShipmentController.php:298
 * @route '/logistik/shipments/{shipment}'
 */
        destroyForm.delete = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Logistik\ShipmentController::markShipped
 * @see app/Http/Controllers/Logistik/ShipmentController.php:205
 * @route '/logistik/shipments/{shipment}/mark-shipped'
 */
export const markShipped = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markShipped.url(args, options),
    method: 'post',
})

markShipped.definition = {
    methods: ["post"],
    url: '/logistik/shipments/{shipment}/mark-shipped',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::markShipped
 * @see app/Http/Controllers/Logistik/ShipmentController.php:205
 * @route '/logistik/shipments/{shipment}/mark-shipped'
 */
markShipped.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return markShipped.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::markShipped
 * @see app/Http/Controllers/Logistik/ShipmentController.php:205
 * @route '/logistik/shipments/{shipment}/mark-shipped'
 */
markShipped.post = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markShipped.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::markShipped
 * @see app/Http/Controllers/Logistik/ShipmentController.php:205
 * @route '/logistik/shipments/{shipment}/mark-shipped'
 */
    const markShippedForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markShipped.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::markShipped
 * @see app/Http/Controllers/Logistik/ShipmentController.php:205
 * @route '/logistik/shipments/{shipment}/mark-shipped'
 */
        markShippedForm.post = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markShipped.url(args, options),
            method: 'post',
        })
    
    markShipped.form = markShippedForm
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::markDelivered
 * @see app/Http/Controllers/Logistik/ShipmentController.php:236
 * @route '/logistik/shipments/{shipment}/mark-delivered'
 */
export const markDelivered = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markDelivered.url(args, options),
    method: 'post',
})

markDelivered.definition = {
    methods: ["post"],
    url: '/logistik/shipments/{shipment}/mark-delivered',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::markDelivered
 * @see app/Http/Controllers/Logistik/ShipmentController.php:236
 * @route '/logistik/shipments/{shipment}/mark-delivered'
 */
markDelivered.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return markDelivered.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::markDelivered
 * @see app/Http/Controllers/Logistik/ShipmentController.php:236
 * @route '/logistik/shipments/{shipment}/mark-delivered'
 */
markDelivered.post = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markDelivered.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::markDelivered
 * @see app/Http/Controllers/Logistik/ShipmentController.php:236
 * @route '/logistik/shipments/{shipment}/mark-delivered'
 */
    const markDeliveredForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markDelivered.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::markDelivered
 * @see app/Http/Controllers/Logistik/ShipmentController.php:236
 * @route '/logistik/shipments/{shipment}/mark-delivered'
 */
        markDeliveredForm.post = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markDelivered.url(args, options),
            method: 'post',
        })
    
    markDelivered.form = markDeliveredForm
/**
* @see \App\Http\Controllers\Logistik\ShipmentController::addTracking
 * @see app/Http/Controllers/Logistik/ShipmentController.php:267
 * @route '/logistik/shipments/{shipment}/add-tracking'
 */
export const addTracking = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTracking.url(args, options),
    method: 'post',
})

addTracking.definition = {
    methods: ["post"],
    url: '/logistik/shipments/{shipment}/add-tracking',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::addTracking
 * @see app/Http/Controllers/Logistik/ShipmentController.php:267
 * @route '/logistik/shipments/{shipment}/add-tracking'
 */
addTracking.url = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shipment: typeof args.shipment === 'object'
                ? args.shipment.id
                : args.shipment,
                }

    return addTracking.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ShipmentController::addTracking
 * @see app/Http/Controllers/Logistik/ShipmentController.php:267
 * @route '/logistik/shipments/{shipment}/add-tracking'
 */
addTracking.post = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTracking.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\ShipmentController::addTracking
 * @see app/Http/Controllers/Logistik/ShipmentController.php:267
 * @route '/logistik/shipments/{shipment}/add-tracking'
 */
    const addTrackingForm = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addTracking.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ShipmentController::addTracking
 * @see app/Http/Controllers/Logistik/ShipmentController.php:267
 * @route '/logistik/shipments/{shipment}/add-tracking'
 */
        addTrackingForm.post = (args: { shipment: number | { id: number } } | [shipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addTracking.url(args, options),
            method: 'post',
        })
    
    addTracking.form = addTrackingForm
const shipments = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
markShipped: Object.assign(markShipped, markShipped),
markDelivered: Object.assign(markDelivered, markDelivered),
addTracking: Object.assign(addTracking, addTracking),
}

export default shipments