import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/generation-ro',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::index
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:11
 * @route '/affiliate/generation-ro'
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
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/generation-ro/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::create
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/create'
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
* @see \App\Http\Controllers\Affiliate\GeneraionController::store
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/generation-ro',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::store
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::store
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::store
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::store
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
export const show = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/generation-ro/{generation_ro}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
show.url = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generation_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    generation_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generation_ro: args.generation_ro,
                }

    return show.definition.url
            .replace('{generation_ro}', parsedArgs.generation_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
show.get = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
show.head = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
    const showForm = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
        showForm.get = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::show
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
        showForm.head = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
export const edit = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/generation-ro/{generation_ro}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
edit.url = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generation_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    generation_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generation_ro: args.generation_ro,
                }

    return edit.definition.url
            .replace('{generation_ro}', parsedArgs.generation_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
edit.get = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
edit.head = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
    const editForm = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
        editForm.get = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::edit
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}/edit'
 */
        editForm.head = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
export const update = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/generation-ro/{generation_ro}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
update.url = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generation_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    generation_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generation_ro: args.generation_ro,
                }

    return update.definition.url
            .replace('{generation_ro}', parsedArgs.generation_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
update.put = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
update.patch = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
    const updateForm = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
        updateForm.put = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::update
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
        updateForm.patch = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\GeneraionController::destroy
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
export const destroy = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/generation-ro/{generation_ro}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::destroy
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
destroy.url = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generation_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    generation_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generation_ro: args.generation_ro,
                }

    return destroy.definition.url
            .replace('{generation_ro}', parsedArgs.generation_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::destroy
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
destroy.delete = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::destroy
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
    const destroyForm = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::destroy
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:0
 * @route '/affiliate/generation-ro/{generation_ro}'
 */
        destroyForm.delete = (args: { generation_ro: string | number } | [generation_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const generationRo = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default generationRo