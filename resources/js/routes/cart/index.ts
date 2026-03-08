import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicCartController::checkout
 * @see app/Http/Controllers/PublicCartController.php:27
 * @route '/cart/checkout'
 */
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/cart/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicCartController::checkout
 * @see app/Http/Controllers/PublicCartController.php:27
 * @route '/cart/checkout'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicCartController::checkout
 * @see app/Http/Controllers/PublicCartController.php:27
 * @route '/cart/checkout'
 */
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicCartController::checkout
 * @see app/Http/Controllers/PublicCartController.php:27
 * @route '/cart/checkout'
 */
    const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicCartController::checkout
 * @see app/Http/Controllers/PublicCartController.php:27
 * @route '/cart/checkout'
 */
        checkoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkout.url(options),
            method: 'post',
        })
    
    checkout.form = checkoutForm
/**
* @see \App\Http\Controllers\PublicCartController::cancel
 * @see app/Http/Controllers/PublicCartController.php:167
 * @route '/cart/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/cart/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicCartController::cancel
 * @see app/Http/Controllers/PublicCartController.php:167
 * @route '/cart/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicCartController::cancel
 * @see app/Http/Controllers/PublicCartController.php:167
 * @route '/cart/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicCartController::cancel
 * @see app/Http/Controllers/PublicCartController.php:167
 * @route '/cart/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicCartController::cancel
 * @see app/Http/Controllers/PublicCartController.php:167
 * @route '/cart/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const cart = {
    checkout: Object.assign(checkout, checkout),
cancel: Object.assign(cancel, cancel),
}

export default cart