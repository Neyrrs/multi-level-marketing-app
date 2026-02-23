import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanKomisi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KomisiController::index
 * @see app/Http/Controllers/Admin/KomisiController.php:14
 * @route '/admin/PengaturanKomisi'
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
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanKomisi/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KomisiController::create
 * @see app/Http/Controllers/Admin/KomisiController.php:22
 * @route '/admin/PengaturanKomisi/create'
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
* @see \App\Http\Controllers\Admin\KomisiController::store
 * @see app/Http/Controllers/Admin/KomisiController.php:30
 * @route '/admin/PengaturanKomisi'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/PengaturanKomisi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::store
 * @see app/Http/Controllers/Admin/KomisiController.php:30
 * @route '/admin/PengaturanKomisi'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::store
 * @see app/Http/Controllers/Admin/KomisiController.php:30
 * @route '/admin/PengaturanKomisi'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::store
 * @see app/Http/Controllers/Admin/KomisiController.php:30
 * @route '/admin/PengaturanKomisi'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::store
 * @see app/Http/Controllers/Admin/KomisiController.php:30
 * @route '/admin/PengaturanKomisi'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
export const show = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanKomisi/{PengaturanKomisi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
show.url = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanKomisi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanKomisi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanKomisi: args.PengaturanKomisi,
                }

    return show.definition.url
            .replace('{PengaturanKomisi}', parsedArgs.PengaturanKomisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
show.get = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
show.head = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
    const showForm = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
        showForm.get = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KomisiController::show
 * @see app/Http/Controllers/Admin/KomisiController.php:38
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
        showForm.head = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
export const edit = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanKomisi/{PengaturanKomisi}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
edit.url = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanKomisi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanKomisi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanKomisi: args.PengaturanKomisi,
                }

    return edit.definition.url
            .replace('{PengaturanKomisi}', parsedArgs.PengaturanKomisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
edit.get = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
edit.head = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
    const editForm = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
        editForm.get = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KomisiController::edit
 * @see app/Http/Controllers/Admin/KomisiController.php:46
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}/edit'
 */
        editForm.head = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
export const update = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/PengaturanKomisi/{PengaturanKomisi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
update.url = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanKomisi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanKomisi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanKomisi: args.PengaturanKomisi,
                }

    return update.definition.url
            .replace('{PengaturanKomisi}', parsedArgs.PengaturanKomisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
update.put = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
update.patch = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
    const updateForm = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
        updateForm.put = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\KomisiController::update
 * @see app/Http/Controllers/Admin/KomisiController.php:54
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
        updateForm.patch = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\KomisiController::destroy
 * @see app/Http/Controllers/Admin/KomisiController.php:62
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
export const destroy = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/PengaturanKomisi/{PengaturanKomisi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\KomisiController::destroy
 * @see app/Http/Controllers/Admin/KomisiController.php:62
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
destroy.url = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanKomisi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanKomisi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanKomisi: args.PengaturanKomisi,
                }

    return destroy.definition.url
            .replace('{PengaturanKomisi}', parsedArgs.PengaturanKomisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KomisiController::destroy
 * @see app/Http/Controllers/Admin/KomisiController.php:62
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
destroy.delete = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\KomisiController::destroy
 * @see app/Http/Controllers/Admin/KomisiController.php:62
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
    const destroyForm = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KomisiController::destroy
 * @see app/Http/Controllers/Admin/KomisiController.php:62
 * @route '/admin/PengaturanKomisi/{PengaturanKomisi}'
 */
        destroyForm.delete = (args: { PengaturanKomisi: string | number } | [PengaturanKomisi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PengaturanKomisi = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default PengaturanKomisi