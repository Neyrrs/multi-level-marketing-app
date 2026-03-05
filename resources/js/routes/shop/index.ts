import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/shop',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\ShopController::index
 * @see app/Http/Controllers/Guest/ShopController.php:26
 * @route '/shop'
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
* @see \App\Http\Controllers\Guest\ShopController::store
 * @see app/Http/Controllers/Guest/ShopController.php:103
 * @route '/shop'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/shop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Guest\ShopController::store
 * @see app/Http/Controllers/Guest/ShopController.php:103
 * @route '/shop'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\ShopController::store
 * @see app/Http/Controllers/Guest/ShopController.php:103
 * @route '/shop'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Guest\ShopController::store
 * @see app/Http/Controllers/Guest/ShopController.php:103
 * @route '/shop'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Guest\ShopController::store
 * @see app/Http/Controllers/Guest/ShopController.php:103
 * @route '/shop'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Guest\ShopController::checkout
 * @see app/Http/Controllers/Guest/ShopController.php:155
 * @route '/shop/checkout'
 */
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/shop/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Guest\ShopController::checkout
 * @see app/Http/Controllers/Guest/ShopController.php:155
 * @route '/shop/checkout'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\ShopController::checkout
 * @see app/Http/Controllers/Guest/ShopController.php:155
 * @route '/shop/checkout'
 */
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Guest\ShopController::checkout
 * @see app/Http/Controllers/Guest/ShopController.php:155
 * @route '/shop/checkout'
 */
    const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Guest\ShopController::checkout
 * @see app/Http/Controllers/Guest/ShopController.php:155
 * @route '/shop/checkout'
 */
        checkoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkout.url(options),
            method: 'post',
        })
    
    checkout.form = checkoutForm
/**
* @see \App\Http\Controllers\Guest\ShopController::cancel
 * @see app/Http/Controllers/Guest/ShopController.php:286
 * @route '/shop/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/shop/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Guest\ShopController::cancel
 * @see app/Http/Controllers/Guest/ShopController.php:286
 * @route '/shop/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\ShopController::cancel
 * @see app/Http/Controllers/Guest/ShopController.php:286
 * @route '/shop/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Guest\ShopController::cancel
 * @see app/Http/Controllers/Guest/ShopController.php:286
 * @route '/shop/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Guest\ShopController::cancel
 * @see app/Http/Controllers/Guest/ShopController.php:286
 * @route '/shop/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const shop = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
checkout: Object.assign(checkout, checkout),
cancel: Object.assign(cancel, cancel),
}

export default shop