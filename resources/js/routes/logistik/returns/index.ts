import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/logistik/returns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReturnController::index
 * @see app/Http/Controllers/Logistik/ReturnController.php:16
 * @route '/logistik/returns'
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
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/logistik/returns/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReturnController::create
 * @see app/Http/Controllers/Logistik/ReturnController.php:75
 * @route '/logistik/returns/create'
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
* @see \App\Http\Controllers\Logistik\ReturnController::store
 * @see app/Http/Controllers/Logistik/ReturnController.php:83
 * @route '/logistik/returns'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/logistik/returns',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::store
 * @see app/Http/Controllers/Logistik/ReturnController.php:83
 * @route '/logistik/returns'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::store
 * @see app/Http/Controllers/Logistik/ReturnController.php:83
 * @route '/logistik/returns'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::store
 * @see app/Http/Controllers/Logistik/ReturnController.php:83
 * @route '/logistik/returns'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::store
 * @see app/Http/Controllers/Logistik/ReturnController.php:83
 * @route '/logistik/returns'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
export const show = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/logistik/returns/{return}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
show.url = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { return: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { return: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    return: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        return: typeof args.return === 'object'
                ? args.return.id
                : args.return,
                }

    return show.definition.url
            .replace('{return}', parsedArgs.return.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
show.get = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
show.head = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
    const showForm = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
        showForm.get = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReturnController::show
 * @see app/Http/Controllers/Logistik/ReturnController.php:91
 * @route '/logistik/returns/{return}'
 */
        showForm.head = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
export const edit = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/logistik/returns/{return}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
edit.url = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { return: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { return: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    return: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        return: typeof args.return === 'object'
                ? args.return.id
                : args.return,
                }

    return edit.definition.url
            .replace('{return}', parsedArgs.return.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
edit.get = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
edit.head = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
    const editForm = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
        editForm.get = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReturnController::edit
 * @see app/Http/Controllers/Logistik/ReturnController.php:140
 * @route '/logistik/returns/{return}/edit'
 */
        editForm.head = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
export const update = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/logistik/returns/{return}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
update.url = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { return: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { return: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    return: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        return: typeof args.return === 'object'
                ? args.return.id
                : args.return,
                }

    return update.definition.url
            .replace('{return}', parsedArgs.return.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
update.put = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
update.patch = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
    const updateForm = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
        updateForm.put = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReturnController::update
 * @see app/Http/Controllers/Logistik/ReturnController.php:148
 * @route '/logistik/returns/{return}'
 */
        updateForm.patch = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Logistik\ReturnController::destroy
 * @see app/Http/Controllers/Logistik/ReturnController.php:176
 * @route '/logistik/returns/{return}'
 */
export const destroy = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/logistik/returns/{return}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Logistik\ReturnController::destroy
 * @see app/Http/Controllers/Logistik/ReturnController.php:176
 * @route '/logistik/returns/{return}'
 */
destroy.url = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { return: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { return: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    return: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        return: typeof args.return === 'object'
                ? args.return.id
                : args.return,
                }

    return destroy.definition.url
            .replace('{return}', parsedArgs.return.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReturnController::destroy
 * @see app/Http/Controllers/Logistik/ReturnController.php:176
 * @route '/logistik/returns/{return}'
 */
destroy.delete = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Logistik\ReturnController::destroy
 * @see app/Http/Controllers/Logistik/ReturnController.php:176
 * @route '/logistik/returns/{return}'
 */
    const destroyForm = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReturnController::destroy
 * @see app/Http/Controllers/Logistik/ReturnController.php:176
 * @route '/logistik/returns/{return}'
 */
        destroyForm.delete = (args: { return: number | { id: number } } | [returnParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const returns = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default returns