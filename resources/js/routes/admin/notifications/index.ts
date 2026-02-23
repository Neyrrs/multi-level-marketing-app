import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\NotificationsController::index
 * @see app/Http/Controllers/Admin/NotificationsController.php:15
 * @route '/admin/notifications'
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
* @see \App\Http\Controllers\Admin\NotificationsController::resend
 * @see app/Http/Controllers/Admin/NotificationsController.php:40
 * @route '/admin/notifications/{id}/resend'
 */
export const resend = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

resend.definition = {
    methods: ["post"],
    url: '/admin/notifications/{id}/resend',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NotificationsController::resend
 * @see app/Http/Controllers/Admin/NotificationsController.php:40
 * @route '/admin/notifications/{id}/resend'
 */
resend.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return resend.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NotificationsController::resend
 * @see app/Http/Controllers/Admin/NotificationsController.php:40
 * @route '/admin/notifications/{id}/resend'
 */
resend.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\NotificationsController::resend
 * @see app/Http/Controllers/Admin/NotificationsController.php:40
 * @route '/admin/notifications/{id}/resend'
 */
    const resendForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resend.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\NotificationsController::resend
 * @see app/Http/Controllers/Admin/NotificationsController.php:40
 * @route '/admin/notifications/{id}/resend'
 */
        resendForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resend.url(args, options),
            method: 'post',
        })
    
    resend.form = resendForm
/**
* @see \App\Http\Controllers\Admin\NotificationsController::destroy
 * @see app/Http/Controllers/Admin/NotificationsController.php:68
 * @route '/admin/notifications/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/notifications/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\NotificationsController::destroy
 * @see app/Http/Controllers/Admin/NotificationsController.php:68
 * @route '/admin/notifications/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NotificationsController::destroy
 * @see app/Http/Controllers/Admin/NotificationsController.php:68
 * @route '/admin/notifications/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\NotificationsController::destroy
 * @see app/Http/Controllers/Admin/NotificationsController.php:68
 * @route '/admin/notifications/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\NotificationsController::destroy
 * @see app/Http/Controllers/Admin/NotificationsController.php:68
 * @route '/admin/notifications/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const notifications = {
    index: Object.assign(index, index),
resend: Object.assign(resend, resend),
destroy: Object.assign(destroy, destroy),
}

export default notifications