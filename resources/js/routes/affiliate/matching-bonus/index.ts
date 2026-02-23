import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/matching-bonus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::index
 * @see app/Http/Controllers/Affiliate/MatchingController.php:11
 * @route '/affiliate/matching-bonus'
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
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/matching-bonus/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::create
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/create'
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
* @see \App\Http\Controllers\Affiliate\MatchingController::store
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/matching-bonus',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::store
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::store
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::store
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::store
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
export const show = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/matching-bonus/{matching_bonu}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
show.url = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { matching_bonu: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    matching_bonu: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        matching_bonu: args.matching_bonu,
                }

    return show.definition.url
            .replace('{matching_bonu}', parsedArgs.matching_bonu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
show.get = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
show.head = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
    const showForm = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
        showForm.get = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::show
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
        showForm.head = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
export const edit = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/matching-bonus/{matching_bonu}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
edit.url = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { matching_bonu: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    matching_bonu: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        matching_bonu: args.matching_bonu,
                }

    return edit.definition.url
            .replace('{matching_bonu}', parsedArgs.matching_bonu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
edit.get = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
edit.head = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
    const editForm = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
        editForm.get = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::edit
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}/edit'
 */
        editForm.head = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
export const update = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/matching-bonus/{matching_bonu}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
update.url = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { matching_bonu: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    matching_bonu: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        matching_bonu: args.matching_bonu,
                }

    return update.definition.url
            .replace('{matching_bonu}', parsedArgs.matching_bonu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
update.put = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
update.patch = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
    const updateForm = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
        updateForm.put = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::update
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
        updateForm.patch = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\MatchingController::destroy
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
export const destroy = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/matching-bonus/{matching_bonu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::destroy
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
destroy.url = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { matching_bonu: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    matching_bonu: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        matching_bonu: args.matching_bonu,
                }

    return destroy.definition.url
            .replace('{matching_bonu}', parsedArgs.matching_bonu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::destroy
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
destroy.delete = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::destroy
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
    const destroyForm = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::destroy
 * @see app/Http/Controllers/Affiliate/MatchingController.php:0
 * @route '/affiliate/matching-bonus/{matching_bonu}'
 */
        destroyForm.delete = (args: { matching_bonu: string | number } | [matching_bonu: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const matchingBonus = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default matchingBonus