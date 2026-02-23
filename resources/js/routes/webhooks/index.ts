import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Webhooks\MidtransController::midtrans
 * @see app/Http/Controllers/Webhooks/MidtransController.php:36
 * @route '/webhooks/midtrans'
 */
export const midtrans = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: midtrans.url(options),
    method: 'post',
})

midtrans.definition = {
    methods: ["post"],
    url: '/webhooks/midtrans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Webhooks\MidtransController::midtrans
 * @see app/Http/Controllers/Webhooks/MidtransController.php:36
 * @route '/webhooks/midtrans'
 */
midtrans.url = (options?: RouteQueryOptions) => {
    return midtrans.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Webhooks\MidtransController::midtrans
 * @see app/Http/Controllers/Webhooks/MidtransController.php:36
 * @route '/webhooks/midtrans'
 */
midtrans.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: midtrans.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Webhooks\MidtransController::midtrans
 * @see app/Http/Controllers/Webhooks/MidtransController.php:36
 * @route '/webhooks/midtrans'
 */
    const midtransForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: midtrans.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Webhooks\MidtransController::midtrans
 * @see app/Http/Controllers/Webhooks/MidtransController.php:36
 * @route '/webhooks/midtrans'
 */
        midtransForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: midtrans.url(options),
            method: 'post',
        })
    
    midtrans.form = midtransForm
const webhooks = {
    midtrans: Object.assign(midtrans, midtrans),
}

export default webhooks