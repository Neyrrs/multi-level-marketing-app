import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/reward',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ProductController::index
 * @see app/Http/Controllers/Affiliate/ProductController.php:15
 * @route '/affiliate/reward'
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
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/reward/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ProductController::create
 * @see app/Http/Controllers/Affiliate/ProductController.php:56
 * @route '/affiliate/reward/create'
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
* @see \App\Http\Controllers\Affiliate\ProductController::store
 * @see app/Http/Controllers/Affiliate/ProductController.php:64
 * @route '/affiliate/reward'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/reward',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::store
 * @see app/Http/Controllers/Affiliate/ProductController.php:64
 * @route '/affiliate/reward'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::store
 * @see app/Http/Controllers/Affiliate/ProductController.php:64
 * @route '/affiliate/reward'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::store
 * @see app/Http/Controllers/Affiliate/ProductController.php:64
 * @route '/affiliate/reward'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::store
 * @see app/Http/Controllers/Affiliate/ProductController.php:64
 * @route '/affiliate/reward'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
export const show = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/reward/{reward}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
show.url = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reward: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    reward: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reward: args.reward,
                }

    return show.definition.url
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
show.get = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
show.head = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
    const showForm = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
        showForm.get = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ProductController::show
 * @see app/Http/Controllers/Affiliate/ProductController.php:72
 * @route '/affiliate/reward/{reward}'
 */
        showForm.head = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
export const edit = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/reward/{reward}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
edit.url = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reward: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    reward: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reward: args.reward,
                }

    return edit.definition.url
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
edit.get = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
edit.head = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
    const editForm = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
        editForm.get = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ProductController::edit
 * @see app/Http/Controllers/Affiliate/ProductController.php:80
 * @route '/affiliate/reward/{reward}/edit'
 */
        editForm.head = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
export const update = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/reward/{reward}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
update.url = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reward: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    reward: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reward: args.reward,
                }

    return update.definition.url
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
update.put = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
update.patch = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
    const updateForm = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
        updateForm.put = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ProductController::update
 * @see app/Http/Controllers/Affiliate/ProductController.php:88
 * @route '/affiliate/reward/{reward}'
 */
        updateForm.patch = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\ProductController::destroy
 * @see app/Http/Controllers/Affiliate/ProductController.php:96
 * @route '/affiliate/reward/{reward}'
 */
export const destroy = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/reward/{reward}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\ProductController::destroy
 * @see app/Http/Controllers/Affiliate/ProductController.php:96
 * @route '/affiliate/reward/{reward}'
 */
destroy.url = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reward: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    reward: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reward: args.reward,
                }

    return destroy.definition.url
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ProductController::destroy
 * @see app/Http/Controllers/Affiliate/ProductController.php:96
 * @route '/affiliate/reward/{reward}'
 */
destroy.delete = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\ProductController::destroy
 * @see app/Http/Controllers/Affiliate/ProductController.php:96
 * @route '/affiliate/reward/{reward}'
 */
    const destroyForm = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ProductController::destroy
 * @see app/Http/Controllers/Affiliate/ProductController.php:96
 * @route '/affiliate/reward/{reward}'
 */
        destroyForm.delete = (args: { reward: string | number } | [reward: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const reward = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default reward