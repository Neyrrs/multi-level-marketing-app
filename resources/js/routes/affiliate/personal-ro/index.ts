import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/personal-ro',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::index
 * @see app/Http/Controllers/Affiliate/PersonalController.php:13
 * @route '/affiliate/personal-ro'
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
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/personal-ro/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::create
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/create'
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
* @see \App\Http\Controllers\Affiliate\PersonalController::store
 * @see app/Http/Controllers/Affiliate/PersonalController.php:79
 * @route '/affiliate/personal-ro'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/personal-ro',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::store
 * @see app/Http/Controllers/Affiliate/PersonalController.php:79
 * @route '/affiliate/personal-ro'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::store
 * @see app/Http/Controllers/Affiliate/PersonalController.php:79
 * @route '/affiliate/personal-ro'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::store
 * @see app/Http/Controllers/Affiliate/PersonalController.php:79
 * @route '/affiliate/personal-ro'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::store
 * @see app/Http/Controllers/Affiliate/PersonalController.php:79
 * @route '/affiliate/personal-ro'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
export const show = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/personal-ro/{personal_ro}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
show.url = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { personal_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    personal_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        personal_ro: args.personal_ro,
                }

    return show.definition.url
            .replace('{personal_ro}', parsedArgs.personal_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
show.get = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
show.head = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
    const showForm = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
        showForm.get = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::show
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
        showForm.head = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
export const edit = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/personal-ro/{personal_ro}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
edit.url = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { personal_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    personal_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        personal_ro: args.personal_ro,
                }

    return edit.definition.url
            .replace('{personal_ro}', parsedArgs.personal_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
edit.get = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
edit.head = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
    const editForm = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
        editForm.get = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::edit
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}/edit'
 */
        editForm.head = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
export const update = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/personal-ro/{personal_ro}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
update.url = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { personal_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    personal_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        personal_ro: args.personal_ro,
                }

    return update.definition.url
            .replace('{personal_ro}', parsedArgs.personal_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
update.put = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
update.patch = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
    const updateForm = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
        updateForm.put = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::update
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
        updateForm.patch = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\PersonalController::destroy
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
export const destroy = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/personal-ro/{personal_ro}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::destroy
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
destroy.url = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { personal_ro: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    personal_ro: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        personal_ro: args.personal_ro,
                }

    return destroy.definition.url
            .replace('{personal_ro}', parsedArgs.personal_ro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::destroy
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
destroy.delete = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::destroy
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
    const destroyForm = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::destroy
 * @see app/Http/Controllers/Affiliate/PersonalController.php:0
 * @route '/affiliate/personal-ro/{personal_ro}'
 */
        destroyForm.delete = (args: { personal_ro: string | number } | [personal_ro: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const personalRo = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default personalRo