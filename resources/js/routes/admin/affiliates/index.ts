import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/affiliates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AffiliatesController::index
 * @see app/Http/Controllers/Admin/AffiliatesController.php:20
 * @route '/admin/affiliates'
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
* @see \App\Http\Controllers\Admin\AffiliatesController::approve
 * @see app/Http/Controllers/Admin/AffiliatesController.php:46
 * @route '/admin/affiliates/{affiliate}/approve'
 */
export const approve = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/affiliates/{affiliate}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::approve
 * @see app/Http/Controllers/Admin/AffiliatesController.php:46
 * @route '/admin/affiliates/{affiliate}/approve'
 */
approve.url = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { affiliate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { affiliate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    affiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        affiliate: typeof args.affiliate === 'object'
                ? args.affiliate.id
                : args.affiliate,
                }

    return approve.definition.url
            .replace('{affiliate}', parsedArgs.affiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::approve
 * @see app/Http/Controllers/Admin/AffiliatesController.php:46
 * @route '/admin/affiliates/{affiliate}/approve'
 */
approve.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliatesController::approve
 * @see app/Http/Controllers/Admin/AffiliatesController.php:46
 * @route '/admin/affiliates/{affiliate}/approve'
 */
    const approveForm = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliatesController::approve
 * @see app/Http/Controllers/Admin/AffiliatesController.php:46
 * @route '/admin/affiliates/{affiliate}/approve'
 */
        approveForm.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Admin\AffiliatesController::setSponsor
 * @see app/Http/Controllers/Admin/AffiliatesController.php:57
 * @route '/admin/affiliates/{affiliate}/set-sponsor'
 */
export const setSponsor = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setSponsor.url(args, options),
    method: 'post',
})

setSponsor.definition = {
    methods: ["post"],
    url: '/admin/affiliates/{affiliate}/set-sponsor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::setSponsor
 * @see app/Http/Controllers/Admin/AffiliatesController.php:57
 * @route '/admin/affiliates/{affiliate}/set-sponsor'
 */
setSponsor.url = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { affiliate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { affiliate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    affiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        affiliate: typeof args.affiliate === 'object'
                ? args.affiliate.id
                : args.affiliate,
                }

    return setSponsor.definition.url
            .replace('{affiliate}', parsedArgs.affiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::setSponsor
 * @see app/Http/Controllers/Admin/AffiliatesController.php:57
 * @route '/admin/affiliates/{affiliate}/set-sponsor'
 */
setSponsor.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setSponsor.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliatesController::setSponsor
 * @see app/Http/Controllers/Admin/AffiliatesController.php:57
 * @route '/admin/affiliates/{affiliate}/set-sponsor'
 */
    const setSponsorForm = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setSponsor.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliatesController::setSponsor
 * @see app/Http/Controllers/Admin/AffiliatesController.php:57
 * @route '/admin/affiliates/{affiliate}/set-sponsor'
 */
        setSponsorForm.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setSponsor.url(args, options),
            method: 'post',
        })
    
    setSponsor.form = setSponsorForm
/**
* @see \App\Http\Controllers\Admin\AffiliatesController::setPosition
 * @see app/Http/Controllers/Admin/AffiliatesController.php:68
 * @route '/admin/affiliates/{affiliate}/set-position'
 */
export const setPosition = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setPosition.url(args, options),
    method: 'post',
})

setPosition.definition = {
    methods: ["post"],
    url: '/admin/affiliates/{affiliate}/set-position',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::setPosition
 * @see app/Http/Controllers/Admin/AffiliatesController.php:68
 * @route '/admin/affiliates/{affiliate}/set-position'
 */
setPosition.url = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { affiliate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { affiliate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    affiliate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        affiliate: typeof args.affiliate === 'object'
                ? args.affiliate.id
                : args.affiliate,
                }

    return setPosition.definition.url
            .replace('{affiliate}', parsedArgs.affiliate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliatesController::setPosition
 * @see app/Http/Controllers/Admin/AffiliatesController.php:68
 * @route '/admin/affiliates/{affiliate}/set-position'
 */
setPosition.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setPosition.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliatesController::setPosition
 * @see app/Http/Controllers/Admin/AffiliatesController.php:68
 * @route '/admin/affiliates/{affiliate}/set-position'
 */
    const setPositionForm = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setPosition.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliatesController::setPosition
 * @see app/Http/Controllers/Admin/AffiliatesController.php:68
 * @route '/admin/affiliates/{affiliate}/set-position'
 */
        setPositionForm.post = (args: { affiliate: number | { id: number } } | [affiliate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setPosition.url(args, options),
            method: 'post',
        })
    
    setPosition.form = setPositionForm
const affiliates = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
setSponsor: Object.assign(setSponsor, setSponsor),
setPosition: Object.assign(setPosition, setPosition),
}

export default affiliates