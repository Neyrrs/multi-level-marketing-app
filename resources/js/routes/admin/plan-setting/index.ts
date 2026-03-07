import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:200
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
 * @see app/Http/Controllers/Admin/PlanController.php:200
 * @route '/admin/plan-setting/assign'
 */
assign.url = (options?: RouteQueryOptions) => {
    return assign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:200
 * @route '/admin/plan-setting/assign'
 */
assign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:200
 * @route '/admin/plan-setting/assign'
 */
    const assignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::assign
 * @see app/Http/Controllers/Admin/PlanController.php:200
 * @route '/admin/plan-setting/assign'
 */
        assignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(options),
            method: 'post',
        })
    
    assign.form = assignForm
/**
* @see \App\Http\Controllers\Admin\PlanController::setDefault
 * @see app/Http/Controllers/Admin/PlanController.php:215
 * @route '/admin/plan-setting/{id}/set-default'
 */
export const setDefault = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setDefault.url(args, options),
    method: 'post',
})

setDefault.definition = {
    methods: ["post"],
    url: '/admin/plan-setting/{id}/set-default',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PlanController::setDefault
 * @see app/Http/Controllers/Admin/PlanController.php:215
 * @route '/admin/plan-setting/{id}/set-default'
 */
setDefault.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return setDefault.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PlanController::setDefault
 * @see app/Http/Controllers/Admin/PlanController.php:215
 * @route '/admin/plan-setting/{id}/set-default'
 */
setDefault.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setDefault.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PlanController::setDefault
 * @see app/Http/Controllers/Admin/PlanController.php:215
 * @route '/admin/plan-setting/{id}/set-default'
 */
    const setDefaultForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setDefault.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PlanController::setDefault
 * @see app/Http/Controllers/Admin/PlanController.php:215
 * @route '/admin/plan-setting/{id}/set-default'
 */
        setDefaultForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setDefault.url(args, options),
            method: 'post',
        })
    
    setDefault.form = setDefaultForm
const planSetting = {
    assign: Object.assign(assign, assign),
setDefault: Object.assign(setDefault, setDefault),
}

export default planSetting