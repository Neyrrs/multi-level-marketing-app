import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/Orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::index
 * @see app/Http/Controllers/Admin/OrderController.php:14
 * @route '/admin/Orders'
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
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/Orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::create
 * @see app/Http/Controllers/Admin/OrderController.php:22
 * @route '/admin/Orders/create'
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
* @see \App\Http\Controllers\Admin\OrderController::store
 * @see app/Http/Controllers/Admin/OrderController.php:30
 * @route '/admin/Orders'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/Orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::store
 * @see app/Http/Controllers/Admin/OrderController.php:30
 * @route '/admin/Orders'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::store
 * @see app/Http/Controllers/Admin/OrderController.php:30
 * @route '/admin/Orders'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::store
 * @see app/Http/Controllers/Admin/OrderController.php:30
 * @route '/admin/Orders'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::store
 * @see app/Http/Controllers/Admin/OrderController.php:30
 * @route '/admin/Orders'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
export const show = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/Orders/{Order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
show.url = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Order: args.Order,
                }

    return show.definition.url
            .replace('{Order}', parsedArgs.Order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
show.get = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
show.head = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
    const showForm = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
        showForm.get = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::show
 * @see app/Http/Controllers/Admin/OrderController.php:38
 * @route '/admin/Orders/{Order}'
 */
        showForm.head = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
export const edit = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/Orders/{Order}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
edit.url = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Order: args.Order,
                }

    return edit.definition.url
            .replace('{Order}', parsedArgs.Order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
edit.get = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
edit.head = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
    const editForm = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
        editForm.get = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::edit
 * @see app/Http/Controllers/Admin/OrderController.php:46
 * @route '/admin/Orders/{Order}/edit'
 */
        editForm.head = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
export const update = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/Orders/{Order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
update.url = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Order: args.Order,
                }

    return update.definition.url
            .replace('{Order}', parsedArgs.Order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
update.put = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
update.patch = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
    const updateForm = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
        updateForm.put = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::update
 * @see app/Http/Controllers/Admin/OrderController.php:54
 * @route '/admin/Orders/{Order}'
 */
        updateForm.patch = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\OrderController::destroy
 * @see app/Http/Controllers/Admin/OrderController.php:62
 * @route '/admin/Orders/{Order}'
 */
export const destroy = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/Orders/{Order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::destroy
 * @see app/Http/Controllers/Admin/OrderController.php:62
 * @route '/admin/Orders/{Order}'
 */
destroy.url = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Order: args.Order,
                }

    return destroy.definition.url
            .replace('{Order}', parsedArgs.Order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::destroy
 * @see app/Http/Controllers/Admin/OrderController.php:62
 * @route '/admin/Orders/{Order}'
 */
destroy.delete = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::destroy
 * @see app/Http/Controllers/Admin/OrderController.php:62
 * @route '/admin/Orders/{Order}'
 */
    const destroyForm = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::destroy
 * @see app/Http/Controllers/Admin/OrderController.php:62
 * @route '/admin/Orders/{Order}'
 */
        destroyForm.delete = (args: { Order: string | number } | [Order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const Orders = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default Orders