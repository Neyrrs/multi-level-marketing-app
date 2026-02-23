import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinListController::index
 * @see app/Http/Controllers/Affiliate/PinListController.php:12
 * @route '/affiliate/pin-list'
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
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-list/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinListController::create
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/create'
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
* @see \App\Http\Controllers\Affiliate\PinListController::store
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/pin-list',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::store
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::store
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::store
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::store
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
export const show = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-list/{pin_list}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
show.url = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_list: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_list: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_list: args.pin_list,
                }

    return show.definition.url
            .replace('{pin_list}', parsedArgs.pin_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
show.get = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
show.head = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
    const showForm = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
        showForm.get = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinListController::show
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
        showForm.head = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
export const edit = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-list/{pin_list}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
edit.url = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_list: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_list: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_list: args.pin_list,
                }

    return edit.definition.url
            .replace('{pin_list}', parsedArgs.pin_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
edit.get = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
edit.head = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
    const editForm = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
        editForm.get = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinListController::edit
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}/edit'
 */
        editForm.head = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
export const update = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/pin-list/{pin_list}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
update.url = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_list: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_list: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_list: args.pin_list,
                }

    return update.definition.url
            .replace('{pin_list}', parsedArgs.pin_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
update.put = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
update.patch = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
    const updateForm = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
        updateForm.put = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinListController::update
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
        updateForm.patch = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\PinListController::destroy
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
export const destroy = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/pin-list/{pin_list}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\PinListController::destroy
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
destroy.url = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pin_list: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pin_list: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pin_list: args.pin_list,
                }

    return destroy.definition.url
            .replace('{pin_list}', parsedArgs.pin_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinListController::destroy
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
destroy.delete = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinListController::destroy
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
    const destroyForm = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinListController::destroy
 * @see app/Http/Controllers/Affiliate/PinListController.php:0
 * @route '/affiliate/pin-list/{pin_list}'
 */
        destroyForm.delete = (args: { pin_list: string | number } | [pin_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const pinList = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default pinList