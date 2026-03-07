import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/tree',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\TreeController::index
 * @see app/Http/Controllers/Affiliate/TreeController.php:12
 * @route '/affiliate/tree'
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
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/tree/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\TreeController::create
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/create'
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
* @see \App\Http\Controllers\Affiliate\TreeController::store
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/tree',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::store
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::store
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::store
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::store
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
export const show = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/tree/{tree}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
show.url = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tree: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tree: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tree: args.tree,
                }

    return show.definition.url
            .replace('{tree}', parsedArgs.tree.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
show.get = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
show.head = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
    const showForm = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
        showForm.get = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\TreeController::show
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
        showForm.head = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
export const edit = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/tree/{tree}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
edit.url = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tree: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tree: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tree: args.tree,
                }

    return edit.definition.url
            .replace('{tree}', parsedArgs.tree.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
edit.get = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
edit.head = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
    const editForm = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
        editForm.get = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\TreeController::edit
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}/edit'
 */
        editForm.head = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
export const update = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/tree/{tree}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
update.url = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tree: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tree: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tree: args.tree,
                }

    return update.definition.url
            .replace('{tree}', parsedArgs.tree.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
update.put = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
update.patch = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
    const updateForm = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
        updateForm.put = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\TreeController::update
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
        updateForm.patch = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\TreeController::destroy
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
export const destroy = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/tree/{tree}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\TreeController::destroy
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
destroy.url = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tree: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tree: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tree: args.tree,
                }

    return destroy.definition.url
            .replace('{tree}', parsedArgs.tree.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\TreeController::destroy
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
destroy.delete = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\TreeController::destroy
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
    const destroyForm = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\TreeController::destroy
 * @see app/Http/Controllers/Affiliate/TreeController.php:0
 * @route '/affiliate/tree/{tree}'
 */
        destroyForm.delete = (args: { tree: string | number } | [tree: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const tree = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default tree