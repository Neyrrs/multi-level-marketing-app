import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/commission-methods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::index
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:12
 * @route '/admin/commission-methods'
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
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/commission-methods/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::create
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:37
 * @route '/admin/commission-methods/create'
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
* @see \App\Http\Controllers\Admin\CommissionMethodController::store
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:49
 * @route '/admin/commission-methods'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/commission-methods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::store
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:49
 * @route '/admin/commission-methods'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::store
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:49
 * @route '/admin/commission-methods'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::store
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:49
 * @route '/admin/commission-methods'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::store
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:49
 * @route '/admin/commission-methods'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
export const edit = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/commission-methods/{commissionMethod}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
edit.url = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commissionMethod: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { commissionMethod: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commissionMethod: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commissionMethod: typeof args.commissionMethod === 'object'
                ? args.commissionMethod.id
                : args.commissionMethod,
                }

    return edit.definition.url
            .replace('{commissionMethod}', parsedArgs.commissionMethod.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
edit.get = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
edit.head = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
    const editForm = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
        editForm.get = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::edit
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:42
 * @route '/admin/commission-methods/{commissionMethod}/edit'
 */
        editForm.head = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CommissionMethodController::update
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:61
 * @route '/admin/commission-methods/{commissionMethod}'
 */
export const update = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/commission-methods/{commissionMethod}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::update
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:61
 * @route '/admin/commission-methods/{commissionMethod}'
 */
update.url = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commissionMethod: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { commissionMethod: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commissionMethod: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commissionMethod: typeof args.commissionMethod === 'object'
                ? args.commissionMethod.id
                : args.commissionMethod,
                }

    return update.definition.url
            .replace('{commissionMethod}', parsedArgs.commissionMethod.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::update
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:61
 * @route '/admin/commission-methods/{commissionMethod}'
 */
update.put = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::update
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:61
 * @route '/admin/commission-methods/{commissionMethod}'
 */
    const updateForm = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::update
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:61
 * @route '/admin/commission-methods/{commissionMethod}'
 */
        updateForm.put = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::destroy
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:73
 * @route '/admin/commission-methods/{commissionMethod}'
 */
export const destroy = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/commission-methods/{commissionMethod}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::destroy
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:73
 * @route '/admin/commission-methods/{commissionMethod}'
 */
destroy.url = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commissionMethod: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { commissionMethod: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commissionMethod: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commissionMethod: typeof args.commissionMethod === 'object'
                ? args.commissionMethod.id
                : args.commissionMethod,
                }

    return destroy.definition.url
            .replace('{commissionMethod}', parsedArgs.commissionMethod.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionMethodController::destroy
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:73
 * @route '/admin/commission-methods/{commissionMethod}'
 */
destroy.delete = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::destroy
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:73
 * @route '/admin/commission-methods/{commissionMethod}'
 */
    const destroyForm = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionMethodController::destroy
 * @see app/Http/Controllers/Admin/CommissionMethodController.php:73
 * @route '/admin/commission-methods/{commissionMethod}'
 */
        destroyForm.delete = (args: { commissionMethod: number | { id: number } } | [commissionMethod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const commissionMethods = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default commissionMethods