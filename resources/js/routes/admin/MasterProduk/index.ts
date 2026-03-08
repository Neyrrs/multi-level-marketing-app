import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/MasterProduk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::index
 * @see app/Http/Controllers/Admin/MasterProdukController.php:16
 * @route '/admin/MasterProduk'
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
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/MasterProduk/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::create
 * @see app/Http/Controllers/Admin/MasterProdukController.php:61
 * @route '/admin/MasterProduk/create'
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
* @see \App\Http\Controllers\Admin\MasterProdukController::store
 * @see app/Http/Controllers/Admin/MasterProdukController.php:69
 * @route '/admin/MasterProduk'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/MasterProduk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::store
 * @see app/Http/Controllers/Admin/MasterProdukController.php:69
 * @route '/admin/MasterProduk'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::store
 * @see app/Http/Controllers/Admin/MasterProdukController.php:69
 * @route '/admin/MasterProduk'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::store
 * @see app/Http/Controllers/Admin/MasterProdukController.php:69
 * @route '/admin/MasterProduk'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::store
 * @see app/Http/Controllers/Admin/MasterProdukController.php:69
 * @route '/admin/MasterProduk'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
export const show = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/MasterProduk/{MasterProduk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
show.url = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { MasterProduk: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    MasterProduk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        MasterProduk: args.MasterProduk,
                }

    return show.definition.url
            .replace('{MasterProduk}', parsedArgs.MasterProduk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
show.get = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
show.head = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
    const showForm = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
        showForm.get = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::show
 * @see app/Http/Controllers/Admin/MasterProdukController.php:77
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
        showForm.head = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
export const edit = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/MasterProduk/{MasterProduk}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
edit.url = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { MasterProduk: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    MasterProduk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        MasterProduk: args.MasterProduk,
                }

    return edit.definition.url
            .replace('{MasterProduk}', parsedArgs.MasterProduk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
edit.get = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
edit.head = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
    const editForm = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
        editForm.get = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::edit
 * @see app/Http/Controllers/Admin/MasterProdukController.php:85
 * @route '/admin/MasterProduk/{MasterProduk}/edit'
 */
        editForm.head = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
export const update = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/MasterProduk/{MasterProduk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
update.url = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { MasterProduk: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    MasterProduk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        MasterProduk: args.MasterProduk,
                }

    return update.definition.url
            .replace('{MasterProduk}', parsedArgs.MasterProduk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
update.put = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
update.patch = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
    const updateForm = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
        updateForm.put = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::update
 * @see app/Http/Controllers/Admin/MasterProdukController.php:93
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
        updateForm.patch = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\MasterProdukController::destroy
 * @see app/Http/Controllers/Admin/MasterProdukController.php:101
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
export const destroy = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/MasterProduk/{MasterProduk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::destroy
 * @see app/Http/Controllers/Admin/MasterProdukController.php:101
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
destroy.url = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { MasterProduk: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    MasterProduk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        MasterProduk: args.MasterProduk,
                }

    return destroy.definition.url
            .replace('{MasterProduk}', parsedArgs.MasterProduk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MasterProdukController::destroy
 * @see app/Http/Controllers/Admin/MasterProdukController.php:101
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
destroy.delete = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\MasterProdukController::destroy
 * @see app/Http/Controllers/Admin/MasterProdukController.php:101
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
    const destroyForm = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MasterProdukController::destroy
 * @see app/Http/Controllers/Admin/MasterProdukController.php:101
 * @route '/admin/MasterProduk/{MasterProduk}'
 */
        destroyForm.delete = (args: { MasterProduk: string | number } | [MasterProduk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MasterProduk = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default MasterProduk