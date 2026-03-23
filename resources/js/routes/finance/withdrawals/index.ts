import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/finance/withdrawals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::index
 * @see app/Http/Controllers/Finance/WithdrawalController.php:17
 * @route '/finance/withdrawals'
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
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
export const show = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/finance/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
show.url = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
show.get = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
show.head = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
    const showForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
        showForm.get = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::show
 * @see app/Http/Controllers/Finance/WithdrawalController.php:87
 * @route '/finance/withdrawals/{withdrawal}'
 */
        showForm.head = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Finance\WithdrawalController::approve
 * @see app/Http/Controllers/Finance/WithdrawalController.php:120
 * @route '/finance/withdrawals/{withdrawal}/approve'
 */
export const approve = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/finance/withdrawals/{withdrawal}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::approve
 * @see app/Http/Controllers/Finance/WithdrawalController.php:120
 * @route '/finance/withdrawals/{withdrawal}/approve'
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
* @see \App\Http\Controllers\Finance\WithdrawalController::approve
 * @see app/Http/Controllers/Finance/WithdrawalController.php:120
 * @route '/finance/withdrawals/{withdrawal}/approve'
 */
approve.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Finance\WithdrawalController::approve
 * @see app/Http/Controllers/Finance/WithdrawalController.php:120
 * @route '/finance/withdrawals/{withdrawal}/approve'
 */
    const approveForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::approve
 * @see app/Http/Controllers/Finance/WithdrawalController.php:120
 * @route '/finance/withdrawals/{withdrawal}/approve'
 */
        approveForm.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Finance\WithdrawalController::process
 * @see app/Http/Controllers/Finance/WithdrawalController.php:138
 * @route '/finance/withdrawals/{withdrawal}/process'
 */
export const process = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: process.url(args, options),
    method: 'post',
})

process.definition = {
    methods: ["post"],
    url: '/finance/withdrawals/{withdrawal}/process',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::process
 * @see app/Http/Controllers/Finance/WithdrawalController.php:138
 * @route '/finance/withdrawals/{withdrawal}/process'
 */
process.url = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return process.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::process
 * @see app/Http/Controllers/Finance/WithdrawalController.php:138
 * @route '/finance/withdrawals/{withdrawal}/process'
 */
process.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: process.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Finance\WithdrawalController::process
 * @see app/Http/Controllers/Finance/WithdrawalController.php:138
 * @route '/finance/withdrawals/{withdrawal}/process'
 */
    const processForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: process.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::process
 * @see app/Http/Controllers/Finance/WithdrawalController.php:138
 * @route '/finance/withdrawals/{withdrawal}/process'
 */
        processForm.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: process.url(args, options),
            method: 'post',
        })
    
    process.form = processForm
/**
* @see \App\Http\Controllers\Finance\WithdrawalController::reject
 * @see app/Http/Controllers/Finance/WithdrawalController.php:201
 * @route '/finance/withdrawals/{withdrawal}/reject'
 */
export const reject = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/finance/withdrawals/{withdrawal}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Finance\WithdrawalController::reject
 * @see app/Http/Controllers/Finance/WithdrawalController.php:201
 * @route '/finance/withdrawals/{withdrawal}/reject'
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
* @see \App\Http\Controllers\Finance\WithdrawalController::reject
 * @see app/Http/Controllers/Finance/WithdrawalController.php:201
 * @route '/finance/withdrawals/{withdrawal}/reject'
 */
reject.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Finance\WithdrawalController::reject
 * @see app/Http/Controllers/Finance/WithdrawalController.php:201
 * @route '/finance/withdrawals/{withdrawal}/reject'
 */
    const rejectForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Finance\WithdrawalController::reject
 * @see app/Http/Controllers/Finance/WithdrawalController.php:201
 * @route '/finance/withdrawals/{withdrawal}/reject'
 */
        rejectForm.post = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const withdrawals = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
approve: Object.assign(approve, approve),
process: Object.assign(process, process),
reject: Object.assign(reject, reject),
}

export default withdrawals