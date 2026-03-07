import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:181
 * @route '/admin/plan-setting/assign'
 */
export const assign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/admin/plan-setting/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:181
 * @route '/admin/plan-setting/assign'
 */
assign.url = (options?: RouteQueryOptions) => {
    return assign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:181
 * @route '/admin/plan-setting/assign'
 */
assign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:181
 * @route '/admin/plan-setting/assign'
 */
    const assignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:181
 * @route '/admin/plan-setting/assign'
 */
        assignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(options),
            method: 'post',
        })
    
    assign.form = assignForm
const planSetting = {
    assign: Object.assign(assign, assign),
}

export default planSetting