import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:452
 * @route '/logout'
 */
export const force = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: force.url(options),
    method: 'get',
})

force.definition = {
    methods: ["get","head"],
    url: '/logout',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:452
 * @route '/logout'
 */
force.url = (options?: RouteQueryOptions) => {
    return force.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:452
 * @route '/logout'
 */
force.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: force.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:452
 * @route '/logout'
 */
force.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: force.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:452
 * @route '/logout'
 */
    const forceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: force.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:452
 * @route '/logout'
 */
        forceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: force.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:452
 * @route '/logout'
 */
        forceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: force.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    force.form = forceForm
const logout = {
    force: Object.assign(force, force),
}

export default logout