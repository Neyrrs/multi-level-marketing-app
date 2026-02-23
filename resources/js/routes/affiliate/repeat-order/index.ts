import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/repeat-order',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::index
 * @see app/Http/Controllers/Affiliate/CommissionController.php:11
 * @route '/affiliate/repeat-order'
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
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/repeat-order/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::create
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/create'
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
* @see \App\Http\Controllers\Affiliate\CommissionController::store
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/repeat-order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::store
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::store
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::store
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::store
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
export const show = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/repeat-order/{repeat_order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
show.url = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repeat_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    repeat_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repeat_order: args.repeat_order,
                }

    return show.definition.url
            .replace('{repeat_order}', parsedArgs.repeat_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
show.get = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
show.head = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
    const showForm = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
        showForm.get = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::show
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
        showForm.head = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
export const edit = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/repeat-order/{repeat_order}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
edit.url = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repeat_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    repeat_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repeat_order: args.repeat_order,
                }

    return edit.definition.url
            .replace('{repeat_order}', parsedArgs.repeat_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
edit.get = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
edit.head = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
    const editForm = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
        editForm.get = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::edit
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}/edit'
 */
        editForm.head = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
export const update = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/repeat-order/{repeat_order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
update.url = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repeat_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    repeat_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repeat_order: args.repeat_order,
                }

    return update.definition.url
            .replace('{repeat_order}', parsedArgs.repeat_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
update.put = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
update.patch = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
    const updateForm = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
        updateForm.put = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::update
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
        updateForm.patch = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\CommissionController::destroy
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
export const destroy = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/repeat-order/{repeat_order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::destroy
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
destroy.url = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repeat_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    repeat_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repeat_order: args.repeat_order,
                }

    return destroy.definition.url
            .replace('{repeat_order}', parsedArgs.repeat_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\CommissionController::destroy
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
destroy.delete = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\CommissionController::destroy
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
    const destroyForm = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\CommissionController::destroy
 * @see app/Http/Controllers/Affiliate/CommissionController.php:0
 * @route '/affiliate/repeat-order/{repeat_order}'
 */
        destroyForm.delete = (args: { repeat_order: string | number } | [repeat_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const repeatOrder = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default repeatOrder