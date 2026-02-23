import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/ManajemenAffiliate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::index
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:15
 * @route '/admin/ManajemenAffiliate'
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
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/ManajemenAffiliate/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::create
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:44
 * @route '/admin/ManajemenAffiliate/create'
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
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::store
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:52
 * @route '/admin/ManajemenAffiliate'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/ManajemenAffiliate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::store
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:52
 * @route '/admin/ManajemenAffiliate'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::store
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:52
 * @route '/admin/ManajemenAffiliate'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::store
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:52
 * @route '/admin/ManajemenAffiliate'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::store
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:52
 * @route '/admin/ManajemenAffiliate'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
export const show = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/ManajemenAffiliate/{ManajemenAffiliate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
show.url = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ManajemenAffiliate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ManajemenAffiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ManajemenAffiliate: args.ManajemenAffiliate,
                }

    return show.definition.url
            .replace('{ManajemenAffiliate}', parsedArgs.ManajemenAffiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
show.get = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
show.head = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
    const showForm = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
        showForm.get = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::show
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:60
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
        showForm.head = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
export const edit = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
edit.url = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ManajemenAffiliate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ManajemenAffiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ManajemenAffiliate: args.ManajemenAffiliate,
                }

    return edit.definition.url
            .replace('{ManajemenAffiliate}', parsedArgs.ManajemenAffiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
edit.get = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
edit.head = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
    const editForm = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
        editForm.get = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::edit
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:68
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}/edit'
 */
        editForm.head = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
export const update = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/ManajemenAffiliate/{ManajemenAffiliate}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
update.url = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ManajemenAffiliate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ManajemenAffiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ManajemenAffiliate: args.ManajemenAffiliate,
                }

    return update.definition.url
            .replace('{ManajemenAffiliate}', parsedArgs.ManajemenAffiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
update.put = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
update.patch = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
    const updateForm = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
        updateForm.put = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::update
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:76
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
        updateForm.patch = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::destroy
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:84
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
export const destroy = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/ManajemenAffiliate/{ManajemenAffiliate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::destroy
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:84
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
destroy.url = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ManajemenAffiliate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ManajemenAffiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ManajemenAffiliate: args.ManajemenAffiliate,
                }

    return destroy.definition.url
            .replace('{ManajemenAffiliate}', parsedArgs.ManajemenAffiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::destroy
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:84
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
destroy.delete = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::destroy
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:84
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
    const destroyForm = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ManajemenAffiliateController::destroy
 * @see app/Http/Controllers/Admin/ManajemenAffiliateController.php:84
 * @route '/admin/ManajemenAffiliate/{ManajemenAffiliate}'
 */
        destroyForm.delete = (args: { ManajemenAffiliate: string | number } | [ManajemenAffiliate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ManajemenAffiliate = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default ManajemenAffiliate