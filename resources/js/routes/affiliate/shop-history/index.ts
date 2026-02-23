import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::index
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:11
 * @route '/affiliate/shop-history'
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
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop-history/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::create
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/create'
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
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::store
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/shop-history',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::store
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::store
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::store
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::store
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
export const show = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop-history/{shop_history}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
show.url = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop_history: args.shop_history,
                }

    return show.definition.url
            .replace('{shop_history}', parsedArgs.shop_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
show.get = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
show.head = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
    const showForm = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
        showForm.get = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::show
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
        showForm.head = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
export const edit = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop-history/{shop_history}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
edit.url = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop_history: args.shop_history,
                }

    return edit.definition.url
            .replace('{shop_history}', parsedArgs.shop_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
edit.get = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
edit.head = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
    const editForm = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
        editForm.get = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::edit
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}/edit'
 */
        editForm.head = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
export const update = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/shop-history/{shop_history}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
update.url = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop_history: args.shop_history,
                }

    return update.definition.url
            .replace('{shop_history}', parsedArgs.shop_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
update.put = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
update.patch = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
    const updateForm = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
        updateForm.put = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::update
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
        updateForm.patch = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
export const destroy = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/shop-history/{shop_history}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
destroy.url = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop_history: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shop_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop_history: args.shop_history,
                }

    return destroy.definition.url
            .replace('{shop_history}', parsedArgs.shop_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
destroy.delete = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
    const destroyForm = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::destroy
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:0
 * @route '/affiliate/shop-history/{shop_history}'
 */
        destroyForm.delete = (args: { shop_history: string | number } | [shop_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const shopHistory = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default shopHistory