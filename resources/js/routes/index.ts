import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:45
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
export const shopHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopHistory.url(options),
    method: 'get',
})

shopHistory.definition = {
    methods: ["get","head"],
    url: '/shop-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
shopHistory.url = (options?: RouteQueryOptions) => {
    return shopHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
shopHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
shopHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shopHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
    const shopHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shopHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
        shopHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Guest/ShopHistoryController.php:17
 * @route '/shop-history'
 */
        shopHistoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopHistory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shopHistory.form = shopHistoryForm
/**
 * @see routes/web.php:318
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:318
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:318
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:318
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:318
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:318
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:318
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
export const product = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: product.url(options),
    method: 'get',
})

product.definition = {
    methods: ["get","head"],
    url: '/product',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
product.url = (options?: RouteQueryOptions) => {
    return product.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
product.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: product.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
product.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: product.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
    const productForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: product.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
        productForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: product.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProductController::product
 * @see app/Http/Controllers/ProductController.php:25
 * @route '/product'
 */
        productForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: product.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    product.form = productForm
/**
 * @see routes/web.php:346
 * @route '/mitra'
 */
export const mitra = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mitra.url(options),
    method: 'get',
})

mitra.definition = {
    methods: ["get","head"],
    url: '/mitra',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:346
 * @route '/mitra'
 */
mitra.url = (options?: RouteQueryOptions) => {
    return mitra.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:346
 * @route '/mitra'
 */
mitra.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mitra.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:346
 * @route '/mitra'
 */
mitra.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mitra.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:346
 * @route '/mitra'
 */
    const mitraForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: mitra.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:346
 * @route '/mitra'
 */
        mitraForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mitra.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:346
 * @route '/mitra'
 */
        mitraForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mitra.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    mitra.form = mitraForm
/**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
export const detailProduct = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailProduct.url(args, options),
    method: 'get',
})

detailProduct.definition = {
    methods: ["get","head"],
    url: '/detail-product/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
detailProduct.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return detailProduct.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
detailProduct.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailProduct.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
detailProduct.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detailProduct.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
    const detailProductForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: detailProduct.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
        detailProductForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detailProduct.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:350
 * @route '/detail-product/{slug}'
 */
        detailProductForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detailProduct.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    detailProduct.form = detailProductForm
/**
 * @see routes/web.php:356
 * @route '/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:356
 * @route '/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:356
 * @route '/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:356
 * @route '/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:356
 * @route '/profile'
 */
    const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profile.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:356
 * @route '/profile'
 */
        profileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:356
 * @route '/profile'
 */
        profileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profile.form = profileForm
/**
 * @see routes/web.php:361
 * @route '/cart'
 */
export const cart = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})

cart.definition = {
    methods: ["get","head"],
    url: '/cart',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:361
 * @route '/cart'
 */
cart.url = (options?: RouteQueryOptions) => {
    return cart.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:361
 * @route '/cart'
 */
cart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:361
 * @route '/cart'
 */
cart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:361
 * @route '/cart'
 */
    const cartForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cart.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:361
 * @route '/cart'
 */
        cartForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cart.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:361
 * @route '/cart'
 */
        cartForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cart.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cart.form = cartForm
/**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
export const editProfile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})

editProfile.definition = {
    methods: ["get","head"],
    url: '/edit-profile',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
editProfile.url = (options?: RouteQueryOptions) => {
    return editProfile.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
editProfile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
editProfile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editProfile.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
    const editProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editProfile.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
        editProfileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editProfile.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:389
 * @route '/edit-profile'
 */
        editProfileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editProfile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editProfile.form = editProfileForm