import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::store
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:148
 * @route '/affiliate/pengaturan/withdraw'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/affiliate/pengaturan/withdraw',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::store
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:148
 * @route '/affiliate/pengaturan/withdraw'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::store
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:148
 * @route '/affiliate/pengaturan/withdraw'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Affiliate\PengaturanController::store
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:148
 * @route '/affiliate/pengaturan/withdraw'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PengaturanController::store
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:148
 * @route '/affiliate/pengaturan/withdraw'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const withdraw = {
    store: Object.assign(store, store),
}

export default withdraw