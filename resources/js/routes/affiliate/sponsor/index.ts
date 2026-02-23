import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/affiliate/sponsor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::index
 * @see app/Http/Controllers/Affiliate/SponsorController.php:11
 * @route '/affiliate/sponsor'
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
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/affiliate/sponsor/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::create
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/create'
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
* @see \App\Http\Controllers\Affiliate\SponsorController::store
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/sponsor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::store
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::store
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::store
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::store
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
export const show = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/affiliate/sponsor/{sponsor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
show.url = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sponsor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sponsor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sponsor: args.sponsor,
                }

    return show.definition.url
            .replace('{sponsor}', parsedArgs.sponsor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
show.get = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
show.head = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
    const showForm = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
        showForm.get = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::show
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
        showForm.head = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
export const edit = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/affiliate/sponsor/{sponsor}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
edit.url = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sponsor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sponsor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sponsor: args.sponsor,
                }

    return edit.definition.url
            .replace('{sponsor}', parsedArgs.sponsor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
edit.get = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
edit.head = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
    const editForm = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
        editForm.get = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::edit
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}/edit'
 */
        editForm.head = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
export const update = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/affiliate/sponsor/{sponsor}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
update.url = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sponsor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sponsor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sponsor: args.sponsor,
                }

    return update.definition.url
            .replace('{sponsor}', parsedArgs.sponsor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
update.put = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
update.patch = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
    const updateForm = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
        updateForm.put = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::update
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
        updateForm.patch = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Affiliate\SponsorController::destroy
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
export const destroy = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/affiliate/sponsor/{sponsor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::destroy
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
destroy.url = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sponsor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sponsor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sponsor: args.sponsor,
                }

    return destroy.definition.url
            .replace('{sponsor}', parsedArgs.sponsor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::destroy
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
destroy.delete = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::destroy
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
    const destroyForm = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::destroy
 * @see app/Http/Controllers/Affiliate/SponsorController.php:0
 * @route '/affiliate/sponsor/{sponsor}'
 */
        destroyForm.delete = (args: { sponsor: string | number } | [sponsor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const sponsor = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default sponsor