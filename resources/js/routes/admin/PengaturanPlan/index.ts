import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanPlan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PlanController::index
 * @see app/Http/Controllers/Admin/PlanController.php:17
 * @route '/admin/PengaturanPlan'
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
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanPlan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PlanController::create
 * @see app/Http/Controllers/Admin/PlanController.php:65
 * @route '/admin/PengaturanPlan/create'
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
* @see \App\Http\Controllers\Admin\PlanController::store
 * @see app/Http/Controllers/Admin/PlanController.php:73
 * @route '/admin/PengaturanPlan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/PengaturanPlan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::store
 * @see app/Http/Controllers/Admin/PlanController.php:73
 * @route '/admin/PengaturanPlan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::store
 * @see app/Http/Controllers/Admin/PlanController.php:73
 * @route '/admin/PengaturanPlan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::store
 * @see app/Http/Controllers/Admin/PlanController.php:73
 * @route '/admin/PengaturanPlan'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::store
 * @see app/Http/Controllers/Admin/PlanController.php:73
 * @route '/admin/PengaturanPlan'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
export const show = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanPlan/{PengaturanPlan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
show.url = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanPlan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanPlan: args.PengaturanPlan,
                }

    return show.definition.url
            .replace('{PengaturanPlan}', parsedArgs.PengaturanPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
show.get = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
show.head = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
    const showForm = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
        showForm.get = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PlanController::show
 * @see app/Http/Controllers/Admin/PlanController.php:115
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
        showForm.head = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
export const edit = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/PengaturanPlan/{PengaturanPlan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
edit.url = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanPlan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanPlan: args.PengaturanPlan,
                }

    return edit.definition.url
            .replace('{PengaturanPlan}', parsedArgs.PengaturanPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
edit.get = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
edit.head = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
    const editForm = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
        editForm.get = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PlanController::edit
 * @see app/Http/Controllers/Admin/PlanController.php:123
 * @route '/admin/PengaturanPlan/{PengaturanPlan}/edit'
 */
        editForm.head = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
export const update = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/PengaturanPlan/{PengaturanPlan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
update.url = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanPlan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanPlan: args.PengaturanPlan,
                }

    return update.definition.url
            .replace('{PengaturanPlan}', parsedArgs.PengaturanPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
update.put = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
update.patch = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
    const updateForm = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
        updateForm.put = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\PlanController::update
 * @see app/Http/Controllers/Admin/PlanController.php:131
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
        updateForm.patch = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PlanController::destroy
 * @see app/Http/Controllers/Admin/PlanController.php:154
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
export const destroy = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/PengaturanPlan/{PengaturanPlan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::destroy
 * @see app/Http/Controllers/Admin/PlanController.php:154
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
destroy.url = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { PengaturanPlan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    PengaturanPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        PengaturanPlan: args.PengaturanPlan,
                }

    return destroy.definition.url
            .replace('{PengaturanPlan}', parsedArgs.PengaturanPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::destroy
 * @see app/Http/Controllers/Admin/PlanController.php:154
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
destroy.delete = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::destroy
 * @see app/Http/Controllers/Admin/PlanController.php:154
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
    const destroyForm = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::destroy
 * @see app/Http/Controllers/Admin/PlanController.php:154
 * @route '/admin/PengaturanPlan/{PengaturanPlan}'
 */
        destroyForm.delete = (args: { PengaturanPlan: string | number } | [PengaturanPlan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PengaturanPlan = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default PengaturanPlan