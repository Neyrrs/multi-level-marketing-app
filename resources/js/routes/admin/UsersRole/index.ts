import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/UsersRole',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserRole::index
 * @see app/Http/Controllers/Admin/UserRole.php:14
 * @route '/admin/UsersRole'
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
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/UsersRole/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserRole::create
 * @see app/Http/Controllers/Admin/UserRole.php:25
 * @route '/admin/UsersRole/create'
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
* @see \App\Http\Controllers\Admin\UserRole::store
 * @see app/Http/Controllers/Admin/UserRole.php:34
 * @route '/admin/UsersRole'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/UsersRole',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::store
 * @see app/Http/Controllers/Admin/UserRole.php:34
 * @route '/admin/UsersRole'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::store
 * @see app/Http/Controllers/Admin/UserRole.php:34
 * @route '/admin/UsersRole'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::store
 * @see app/Http/Controllers/Admin/UserRole.php:34
 * @route '/admin/UsersRole'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::store
 * @see app/Http/Controllers/Admin/UserRole.php:34
 * @route '/admin/UsersRole'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
export const show = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/UsersRole/{UsersRole}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
show.url = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { UsersRole: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    UsersRole: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        UsersRole: args.UsersRole,
                }

    return show.definition.url
            .replace('{UsersRole}', parsedArgs.UsersRole.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
show.get = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
show.head = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
    const showForm = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
        showForm.get = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserRole::show
 * @see app/Http/Controllers/Admin/UserRole.php:66
 * @route '/admin/UsersRole/{UsersRole}'
 */
        showForm.head = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
export const edit = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/UsersRole/{UsersRole}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
edit.url = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { UsersRole: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    UsersRole: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        UsersRole: args.UsersRole,
                }

    return edit.definition.url
            .replace('{UsersRole}', parsedArgs.UsersRole.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
edit.get = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
edit.head = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
    const editForm = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
        editForm.get = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserRole::edit
 * @see app/Http/Controllers/Admin/UserRole.php:75
 * @route '/admin/UsersRole/{UsersRole}/edit'
 */
        editForm.head = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
export const update = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/UsersRole/{UsersRole}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
update.url = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { UsersRole: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    UsersRole: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        UsersRole: args.UsersRole,
                }

    return update.definition.url
            .replace('{UsersRole}', parsedArgs.UsersRole.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
update.put = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
update.patch = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
    const updateForm = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
        updateForm.put = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\UserRole::update
 * @see app/Http/Controllers/Admin/UserRole.php:90
 * @route '/admin/UsersRole/{UsersRole}'
 */
        updateForm.patch = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\UserRole::destroy
 * @see app/Http/Controllers/Admin/UserRole.php:126
 * @route '/admin/UsersRole/{UsersRole}'
 */
export const destroy = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/UsersRole/{UsersRole}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\UserRole::destroy
 * @see app/Http/Controllers/Admin/UserRole.php:126
 * @route '/admin/UsersRole/{UsersRole}'
 */
destroy.url = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { UsersRole: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    UsersRole: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        UsersRole: args.UsersRole,
                }

    return destroy.definition.url
            .replace('{UsersRole}', parsedArgs.UsersRole.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserRole::destroy
 * @see app/Http/Controllers/Admin/UserRole.php:126
 * @route '/admin/UsersRole/{UsersRole}'
 */
destroy.delete = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\UserRole::destroy
 * @see app/Http/Controllers/Admin/UserRole.php:126
 * @route '/admin/UsersRole/{UsersRole}'
 */
    const destroyForm = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserRole::destroy
 * @see app/Http/Controllers/Admin/UserRole.php:126
 * @route '/admin/UsersRole/{UsersRole}'
 */
        destroyForm.delete = (args: { UsersRole: string | number } | [UsersRole: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const UsersRole = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default UsersRole