import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/Transaksi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TransactionController::index
 * @see app/Http/Controllers/Admin/TransactionController.php:14
 * @route '/admin/Transaksi'
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
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/Transaksi/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TransactionController::create
 * @see app/Http/Controllers/Admin/TransactionController.php:22
 * @route '/admin/Transaksi/create'
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
* @see \App\Http\Controllers\Admin\TransactionController::store
 * @see app/Http/Controllers/Admin/TransactionController.php:30
 * @route '/admin/Transaksi'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/Transaksi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::store
 * @see app/Http/Controllers/Admin/TransactionController.php:30
 * @route '/admin/Transaksi'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::store
 * @see app/Http/Controllers/Admin/TransactionController.php:30
 * @route '/admin/Transaksi'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::store
 * @see app/Http/Controllers/Admin/TransactionController.php:30
 * @route '/admin/Transaksi'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::store
 * @see app/Http/Controllers/Admin/TransactionController.php:30
 * @route '/admin/Transaksi'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
export const show = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/Transaksi/{Transaksi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
show.url = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Transaksi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Transaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Transaksi: args.Transaksi,
                }

    return show.definition.url
            .replace('{Transaksi}', parsedArgs.Transaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
show.get = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
show.head = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
    const showForm = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
        showForm.get = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TransactionController::show
 * @see app/Http/Controllers/Admin/TransactionController.php:38
 * @route '/admin/Transaksi/{Transaksi}'
 */
        showForm.head = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
export const edit = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/Transaksi/{Transaksi}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
edit.url = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Transaksi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Transaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Transaksi: args.Transaksi,
                }

    return edit.definition.url
            .replace('{Transaksi}', parsedArgs.Transaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
edit.get = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
edit.head = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
    const editForm = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
        editForm.get = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TransactionController::edit
 * @see app/Http/Controllers/Admin/TransactionController.php:46
 * @route '/admin/Transaksi/{Transaksi}/edit'
 */
        editForm.head = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
export const update = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/Transaksi/{Transaksi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
update.url = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Transaksi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Transaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Transaksi: args.Transaksi,
                }

    return update.definition.url
            .replace('{Transaksi}', parsedArgs.Transaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
update.put = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
update.patch = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
    const updateForm = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
        updateForm.put = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\TransactionController::update
 * @see app/Http/Controllers/Admin/TransactionController.php:54
 * @route '/admin/Transaksi/{Transaksi}'
 */
        updateForm.patch = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TransactionController::destroy
 * @see app/Http/Controllers/Admin/TransactionController.php:62
 * @route '/admin/Transaksi/{Transaksi}'
 */
export const destroy = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/Transaksi/{Transaksi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TransactionController::destroy
 * @see app/Http/Controllers/Admin/TransactionController.php:62
 * @route '/admin/Transaksi/{Transaksi}'
 */
destroy.url = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { Transaksi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    Transaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        Transaksi: args.Transaksi,
                }

    return destroy.definition.url
            .replace('{Transaksi}', parsedArgs.Transaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransactionController::destroy
 * @see app/Http/Controllers/Admin/TransactionController.php:62
 * @route '/admin/Transaksi/{Transaksi}'
 */
destroy.delete = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TransactionController::destroy
 * @see app/Http/Controllers/Admin/TransactionController.php:62
 * @route '/admin/Transaksi/{Transaksi}'
 */
    const destroyForm = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TransactionController::destroy
 * @see app/Http/Controllers/Admin/TransactionController.php:62
 * @route '/admin/Transaksi/{Transaksi}'
 */
        destroyForm.delete = (args: { Transaksi: string | number } | [Transaksi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const Transaksi = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default Transaksi