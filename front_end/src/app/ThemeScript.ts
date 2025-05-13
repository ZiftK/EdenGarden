'use client'

import { useEffect } from 'react'

export default function ThemeScript() {
    useEffect(() => {
        const systemPrefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemPrefer);
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
            meta.setAttribute('content', systemPrefer);
        }
    }, [])

    return null;
}