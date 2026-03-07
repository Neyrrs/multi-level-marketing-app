import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/redeem',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::index
 * @see app/Http/Controllers/Affiliate/ReedemController.php:20
 * @route '/affiliate/redeem'
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
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/redeem/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::create
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/create'
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
* @see \App\Http\Controllers\Affiliate\ReedemController::store
 * @see app/Http/Controllers/Affiliate/ReedemController.php:65
 * @route '/affiliate/redeem'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/redeem',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::store
 * @see app/Http/Controllers/Affiliate/ReedemController.php:65
 * @route '/affiliate/redeem'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::store
 * @see app/Http/Controllers/Affiliate/ReedemController.php:65
 * @route '/affiliate/redeem'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::store
 * @see app/Http/Controllers/Affiliate/ReedemController.php:65
 * @route '/affiliate/redeem'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::store
 * @see app/Http/Controllers/Affiliate/ReedemController.php:65
 * @route '/affiliate/redeem'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
export const show = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/redeem/{redeem}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
show.url = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redeem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    redeem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        redeem: args.redeem,
                }

    return show.definition.url
            .replace('{redeem}', parsedArgs.redeem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
show.get = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
show.head = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
    const showForm = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
        showForm.get = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::show
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
        showForm.head = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
export const edit = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/redeem/{redeem}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
edit.url = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redeem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    redeem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        redeem: args.redeem,
                }

    return edit.definition.url
            .replace('{redeem}', parsedArgs.redeem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
edit.get = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
edit.head = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
    const editForm = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
        editForm.get = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::edit
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}/edit'
 */
        editForm.head = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
export const update = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/redeem/{redeem}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
update.url = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redeem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    redeem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        redeem: args.redeem,
                }

    return update.definition.url
            .replace('{redeem}', parsedArgs.redeem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
update.put = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
update.patch = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
    const updateForm = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
        updateForm.put = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::update
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
        updateForm.patch = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\ReedemController::destroy
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
export const destroy = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/redeem/{redeem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::destroy
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
destroy.url = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redeem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    redeem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        redeem: args.redeem,
                }

    return destroy.definition.url
            .replace('{redeem}', parsedArgs.redeem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ReedemController::destroy
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
destroy.delete = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\ReedemController::destroy
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
    const destroyForm = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ReedemController::destroy
 * @see app/Http/Controllers/Affiliate/ReedemController.php:0
 * @route '/affiliate/redeem/{redeem}'
 */
        destroyForm.delete = (args: { redeem: string | number } | [redeem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const redeem = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default redeem