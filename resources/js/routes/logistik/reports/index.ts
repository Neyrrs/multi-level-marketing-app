import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
export const delivery = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: delivery.url(options),
    method: 'get',
})

delivery.definition = {
    methods: ["get","head"],
    url: '/logistik/reports/delivery',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
delivery.url = (options?: RouteQueryOptions) => {
    return delivery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
delivery.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: delivery.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
delivery.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: delivery.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
    const deliveryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: delivery.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
        deliveryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: delivery.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReportController::delivery
 * @see app/Http/Controllers/Logistik/ReportController.php:17
 * @route '/logistik/reports/delivery'
 */
        deliveryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: delivery.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    delivery.form = deliveryForm
/**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
export const shipment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shipment.url(options),
    method: 'get',
})

shipment.definition = {
    methods: ["get","head"],
    url: '/logistik/reports/shipment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
shipment.url = (options?: RouteQueryOptions) => {
    return shipment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
shipment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shipment.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
shipment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shipment.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
    const shipmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shipment.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
        shipmentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shipment.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Logistik\ReportController::shipment
 * @see app/Http/Controllers/Logistik/ReportController.php:83
 * @route '/logistik/reports/shipment'
 */
        shipmentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shipment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shipment.form = shipmentForm
const reports = {
    delivery: Object.assign(delivery, delivery),
shipment: Object.assign(shipment, shipment),
}

export default reports