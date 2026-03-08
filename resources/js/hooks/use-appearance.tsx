import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyLightMode = () => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

export function initializeTheme() {
    applyLightMode();
    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance('light');
        localStorage.setItem('appearance', 'light');
        setCookie('appearance', 'light');
        applyLightMode();
    }, []);

    useEffect(() => {
        updateAppearance('light');
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
