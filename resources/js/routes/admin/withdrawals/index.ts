import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/withdrawals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:12
 * @route '/admin/withdrawals'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::approve
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:38
 * @route '/admin/withdrawals/{withdrawal}/approve'
 */
export const approve = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/withdrawals/{withdrawal}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::approve
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:38
 * @route '/admin/withdrawals/{withdrawal}/approve'
 */
approve.url = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { withdrawal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    withdrawal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        withdrawal: typeof args.withdrawal === 'object'
                ? args.withdrawal.id
                : args.withdrawal,
                }

    return approve.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::approve
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:38
 * @route '/admin/withdrawals/{withdrawal}/approve'
 */
approve.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::approve
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:38
 * @route '/admin/withdrawals/{withdrawal}/approve'
 */
    const approveForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::approve
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:38
 * @route '/admin/withdrawals/{withdrawal}/approve'
 */
        approveForm.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::reject
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:53
 * @route '/admin/withdrawals/{withdrawal}/reject'
 */
export const reject = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/withdrawals/{withdrawal}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::reject
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:53
 * @route '/admin/withdrawals/{withdrawal}/reject'
 */
reject.url = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { withdrawal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    withdrawal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        withdrawal: typeof args.withdrawal === 'object'
                ? args.withdrawal.id
                : args.withdrawal,
                }

    return reject.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::reject
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:53
 * @route '/admin/withdrawals/{withdrawal}/reject'
 */
reject.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::reject
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:53
 * @route '/admin/withdrawals/{withdrawal}/reject'
 */
    const rejectForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WithdrawalsController::reject
 * @see app/Http/Controllers/Admin/WithdrawalsController.php:53
 * @route '/admin/withdrawals/{withdrawal}/reject'
 */
        rejectForm.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const withdrawals = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default withdrawals