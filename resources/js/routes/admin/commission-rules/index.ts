import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/commission-rules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::index
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:13
 * @route '/admin/commission-rules'
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
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/commission-rules/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::create
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:38
 * @route '/admin/commission-rules/create'
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
* @see \App\Http\Controllers\Admin\CommissionRuleController::store
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:57
 * @route '/admin/commission-rules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/commission-rules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::store
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:57
 * @route '/admin/commission-rules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::store
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:57
 * @route '/admin/commission-rules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::store
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:57
 * @route '/admin/commission-rules'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::store
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:57
 * @route '/admin/commission-rules'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
export const edit = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/commission-rules/{commissionRule}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
edit.url = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commissionRule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { commissionRule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commissionRule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commissionRule: typeof args.commissionRule === 'object'
                ? args.commissionRule.id
                : args.commissionRule,
                }

    return edit.definition.url
            .replace('{commissionRule}', parsedArgs.commissionRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
edit.get = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
edit.head = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
    const editForm = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
        editForm.get = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::edit
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:47
 * @route '/admin/commission-rules/{commissionRule}/edit'
 */
        editForm.head = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CommissionRuleController::update
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:80
 * @route '/admin/commission-rules/{commissionRule}'
 */
export const update = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/commission-rules/{commissionRule}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::update
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:80
 * @route '/admin/commission-rules/{commissionRule}'
 */
update.url = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commissionRule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { commissionRule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commissionRule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commissionRule: typeof args.commissionRule === 'object'
                ? args.commissionRule.id
                : args.commissionRule,
                }

    return update.definition.url
            .replace('{commissionRule}', parsedArgs.commissionRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::update
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:80
 * @route '/admin/commission-rules/{commissionRule}'
 */
update.put = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::update
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:80
 * @route '/admin/commission-rules/{commissionRule}'
 */
    const updateForm = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::update
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:80
 * @route '/admin/commission-rules/{commissionRule}'
 */
        updateForm.put = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CommissionRuleController::destroy
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:103
 * @route '/admin/commission-rules/{commissionRule}'
 */
export const destroy = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/commission-rules/{commissionRule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::destroy
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:103
 * @route '/admin/commission-rules/{commissionRule}'
 */
destroy.url = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commissionRule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { commissionRule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commissionRule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commissionRule: typeof args.commissionRule === 'object'
                ? args.commissionRule.id
                : args.commissionRule,
                }

    return destroy.definition.url
            .replace('{commissionRule}', parsedArgs.commissionRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommissionRuleController::destroy
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:103
 * @route '/admin/commission-rules/{commissionRule}'
 */
destroy.delete = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::destroy
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:103
 * @route '/admin/commission-rules/{commissionRule}'
 */
    const destroyForm = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommissionRuleController::destroy
 * @see app/Http/Controllers/Admin/CommissionRuleController.php:103
 * @route '/admin/commission-rules/{commissionRule}'
 */
        destroyForm.delete = (args: { commissionRule: number | { id: number } } | [commissionRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const commissionRules = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default commissionRules