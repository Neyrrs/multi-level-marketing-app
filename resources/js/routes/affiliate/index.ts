import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import tree from './tree'
import shop from './shop'
import pinList from './pin-list'
import personalRo from './personal-ro'
import reward from './reward'
import redeem from './redeem'
/**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/affiliate/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\DashboardController::dashboard
 * @see app/Http/Controllers/Affiliate/DashboardController.php:14
 * @route '/affiliate/dashboard'
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
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
export const binary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: binary.url(options),
    method: 'get',
})

binary.definition = {
    methods: ["get","head"],
    url: '/affiliate/binary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
binary.url = (options?: RouteQueryOptions) => {
    return binary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
binary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: binary.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
binary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: binary.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
    const binaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: binary.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
        binaryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: binary.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\BinaryController::binary
 * @see app/Http/Controllers/Affiliate/BinaryController.php:12
 * @route '/affiliate/binary'
 */
        binaryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: binary.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    binary.form = binaryForm
/**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
export const komisi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: komisi.url(options),
    method: 'get',
})

komisi.definition = {
    methods: ["get","head"],
    url: '/affiliate/komisi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
komisi.url = (options?: RouteQueryOptions) => {
    return komisi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
komisi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: komisi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
komisi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: komisi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
    const komisiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: komisi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
        komisiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: komisi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\KomisiController::komisi
 * @see app/Http/Controllers/Affiliate/KomisiController.php:12
 * @route '/affiliate/komisi'
 */
        komisiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: komisi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    komisi.form = komisiForm
/**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
export const kode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kode.url(options),
    method: 'get',
})

kode.definition = {
    methods: ["get","head"],
    url: '/affiliate/kode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
kode.url = (options?: RouteQueryOptions) => {
    return kode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
kode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kode.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
kode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kode.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
    const kodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: kode.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
        kodeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kode.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\KodeController::kode
 * @see app/Http/Controllers/Affiliate/KodeController.php:18
 * @route '/affiliate/kode'
 */
        kodeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kode.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    kode.form = kodeForm
/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
export const pengaturan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pengaturan.url(options),
    method: 'get',
})

pengaturan.definition = {
    methods: ["get","head"],
    url: '/affiliate/pengaturan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
pengaturan.url = (options?: RouteQueryOptions) => {
    return pengaturan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
pengaturan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pengaturan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
pengaturan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pengaturan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
    const pengaturanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pengaturan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
        pengaturanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pengaturan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PengaturanController::pengaturan
 * @see app/Http/Controllers/Affiliate/PengaturanController.php:13
 * @route '/affiliate/pengaturan'
 */
        pengaturanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pengaturan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pengaturan.form = pengaturanForm
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
export const personal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: personal.url(options),
    method: 'get',
})

personal.definition = {
    methods: ["get","head"],
    url: '/affiliate/personal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
personal.url = (options?: RouteQueryOptions) => {
    return personal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
personal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: personal.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
personal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: personal.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
    const personalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: personal.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
        personalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: personal.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PersonalController::personal
 * @see app/Http/Controllers/Affiliate/PersonalController.php:12
 * @route '/affiliate/personal'
 */
        personalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: personal.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    personal.form = personalForm
/**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
export const downline = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downline.url(options),
    method: 'get',
})

downline.definition = {
    methods: ["get","head"],
    url: '/affiliate/downline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
downline.url = (options?: RouteQueryOptions) => {
    return downline.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
downline.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downline.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
downline.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downline.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
    const downlineForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downline.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
        downlineForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downline.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\DownlineController::downline
 * @see app/Http/Controllers/Affiliate/DownlineController.php:12
 * @route '/affiliate/downline'
 */
        downlineForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downline.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downline.form = downlineForm
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
export const sponsor = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sponsor.url(options),
    method: 'get',
})

sponsor.definition = {
    methods: ["get","head"],
    url: '/affiliate/sponsor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
sponsor.url = (options?: RouteQueryOptions) => {
    return sponsor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
sponsor.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sponsor.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
sponsor.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sponsor.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
    const sponsorForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sponsor.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
        sponsorForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sponsor.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\SponsorController::sponsor
 * @see app/Http/Controllers/Affiliate/SponsorController.php:12
 * @route '/affiliate/sponsor'
 */
        sponsorForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sponsor.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sponsor.form = sponsorForm
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
export const generationRo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generationRo.url(options),
    method: 'get',
})

generationRo.definition = {
    methods: ["get","head"],
    url: '/affiliate/generation-ro',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
generationRo.url = (options?: RouteQueryOptions) => {
    return generationRo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
generationRo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generationRo.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
generationRo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generationRo.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
    const generationRoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generationRo.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
        generationRoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generationRo.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\GeneraionController::generationRo
 * @see app/Http/Controllers/Affiliate/GeneraionController.php:12
 * @route '/affiliate/generation-ro'
 */
        generationRoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generationRo.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generationRo.form = generationRoForm
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
export const matchingBonus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: matchingBonus.url(options),
    method: 'get',
})

matchingBonus.definition = {
    methods: ["get","head"],
    url: '/affiliate/matching-bonus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
matchingBonus.url = (options?: RouteQueryOptions) => {
    return matchingBonus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
matchingBonus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: matchingBonus.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
matchingBonus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: matchingBonus.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
    const matchingBonusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: matchingBonus.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
        matchingBonusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: matchingBonus.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\MatchingController::matchingBonus
 * @see app/Http/Controllers/Affiliate/MatchingController.php:14
 * @route '/affiliate/matching-bonus'
 */
        matchingBonusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: matchingBonus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    matchingBonus.form = matchingBonusForm
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
export const pinHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pinHistory.url(options),
    method: 'get',
})

pinHistory.definition = {
    methods: ["get","head"],
    url: '/affiliate/pin-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
pinHistory.url = (options?: RouteQueryOptions) => {
    return pinHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
pinHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pinHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
pinHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pinHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
    const pinHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pinHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
        pinHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pinHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\PinHistoryController::pinHistory
 * @see app/Http/Controllers/Affiliate/PinHistoryController.php:13
 * @route '/affiliate/pin-history'
 */
        pinHistoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pinHistory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pinHistory.form = pinHistoryForm
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
 */
export const shopHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopHistory.url(options),
    method: 'get',
})

shopHistory.definition = {
    methods: ["get","head"],
    url: '/affiliate/shop-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
 */
shopHistory.url = (options?: RouteQueryOptions) => {
    return shopHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
 */
shopHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
 */
shopHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shopHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
 */
    const shopHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shopHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
 */
        shopHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::shopHistory
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/shop-history'
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
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
export const methodAffiliate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: methodAffiliate.url(options),
    method: 'get',
})

methodAffiliate.definition = {
    methods: ["get","head"],
    url: '/affiliate/method-affiliate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
methodAffiliate.url = (options?: RouteQueryOptions) => {
    return methodAffiliate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
methodAffiliate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: methodAffiliate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
methodAffiliate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: methodAffiliate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
    const methodAffiliateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: methodAffiliate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
        methodAffiliateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: methodAffiliate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Affiliate\ShopHistoryController::methodAffiliate
 * @see app/Http/Controllers/Affiliate/ShopHistoryController.php:17
 * @route '/affiliate/method-affiliate'
 */
        methodAffiliateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: methodAffiliate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    methodAffiliate.form = methodAffiliateForm
/**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
export const ref = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ref.url(args, options),
    method: 'get',
})

ref.definition = {
    methods: ["get","head"],
    url: '/a/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
ref.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ref.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
ref.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ref.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
ref.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ref.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
    const refForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ref.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
        refForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ref.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:370
 * @route '/a/{slug}'
 */
        refForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ref.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ref.form = refForm
/**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
export const landing = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(args, options),
    method: 'get',
})

landing.definition = {
    methods: ["get","head"],
    url: '/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
landing.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return landing.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
landing.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
landing.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: landing.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
    const landingForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: landing.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
        landingForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: landing.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:384
 * @route '/{slug}'
 */
        landingForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: landing.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    landing.form = landingForm
const affiliate = {
    dashboard: Object.assign(dashboard, dashboard),
binary: Object.assign(binary, binary),
komisi: Object.assign(komisi, komisi),
kode: Object.assign(kode, kode),
pengaturan: Object.assign(pengaturan, pengaturan),
personal: Object.assign(personal, personal),
downline: Object.assign(downline, downline),
sponsor: Object.assign(sponsor, sponsor),
generationRo: Object.assign(generationRo, generationRo),
matchingBonus: Object.assign(matchingBonus, matchingBonus),
pinHistory: Object.assign(pinHistory, pinHistory),
shopHistory: Object.assign(shopHistory, shopHistory),
methodAffiliate: Object.assign(methodAffiliate, methodAffiliate),
tree: Object.assign(tree, tree),
shop: Object.assign(shop, shop),
pinList: Object.assign(pinList, pinList),
personalRo: Object.assign(personalRo, personalRo),
reward: Object.assign(reward, reward),
redeem: Object.assign(redeem, redeem),
ref: Object.assign(ref, ref),
landing: Object.assign(landing, landing),
}

export default affiliate