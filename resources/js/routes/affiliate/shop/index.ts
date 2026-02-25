import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\ShopController::checkout
 * @see app/Http/Controllers/Affiliate/ShopController.php:140
 * @route '/affiliate/shop/checkout'
 */
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/affiliate/shop/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::checkout
 * @see app/Http/Controllers/Affiliate/ShopController.php:140
 * @route '/affiliate/shop/checkout'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::checkout
 * @see app/Http/Controllers/Affiliate/ShopController.php:140
 * @route '/affiliate/shop/checkout'
 */
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::checkout
 * @see app/Http/Controllers/Affiliate/ShopController.php:140
 * @route '/affiliate/shop/checkout'
 */
    const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::checkout
 * @see app/Http/Controllers/Affiliate/ShopController.php:140
 * @route '/affiliate/shop/checkout'
 */
        checkoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkout.url(options),
            method: 'post',
        })
    
    checkout.form = checkoutForm
/**
* @see \App\Http\Controllers\Affiliate\ShopController::cancel
 * @see app/Http/Controllers/Affiliate/ShopController.php:258
 * @route '/affiliate/shop/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/affiliate/shop/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::cancel
 * @see app/Http/Controllers/Affiliate/ShopController.php:258
 * @route '/affiliate/shop/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::cancel
 * @see app/Http/Controllers/Affiliate/ShopController.php:258
 * @route '/affiliate/shop/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::cancel
 * @see app/Http/Controllers/Affiliate/ShopController.php:258
 * @route '/affiliate/shop/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::cancel
 * @see app/Http/Controllers/Affiliate/ShopController.php:258
 * @route '/affiliate/shop/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopController::index
 * @see app/Http/Controllers/Affiliate/ShopController.php:23
 * @route '/affiliate/shop'
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
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopController::create
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/create'
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
* @see \App\Http\Controllers\Affiliate\ShopController::store
 * @see app/Http/Controllers/Affiliate/ShopController.php:88
 * @route '/affiliate/shop'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/shop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::store
 * @see app/Http/Controllers/Affiliate/ShopController.php:88
 * @route '/affiliate/shop'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::store
 * @see app/Http/Controllers/Affiliate/ShopController.php:88
 * @route '/affiliate/shop'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::store
 * @see app/Http/Controllers/Affiliate/ShopController.php:88
 * @route '/affiliate/shop'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::store
 * @see app/Http/Controllers/Affiliate/ShopController.php:88
 * @route '/affiliate/shop'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
export const show = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop/{shop}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
show.url = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: args.shop,
                }

    return show.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
show.get = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
show.head = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
    const showForm = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
        showForm.get = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopController::show
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
        showForm.head = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
export const edit = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop/{shop}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
edit.url = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: args.shop,
                }

    return edit.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
edit.get = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
edit.head = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
    const editForm = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
        editForm.get = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopController::edit
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}/edit'
 */
        editForm.head = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
export const update = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/shop/{shop}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
update.url = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: args.shop,
                }

    return update.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
update.put = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
update.patch = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
    const updateForm = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
        updateForm.put = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopController::update
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
        updateForm.patch = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\ShopController::destroy
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
export const destroy = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/shop/{shop}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopController::destroy
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
destroy.url = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: args.shop,
                }

    return destroy.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopController::destroy
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
destroy.delete = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopController::destroy
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
    const destroyForm = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopController::destroy
 * @see app/Http/Controllers/Affiliate/ShopController.php:0
 * @route '/affiliate/shop/{shop}'
 */
        destroyForm.delete = (args: { shop: string | number } | [shop: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const shop = {
    checkout: Object.assign(checkout, checkout),
cancel: Object.assign(cancel, cancel),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default shop