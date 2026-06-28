import { useEffect, useState } from 'react'

export function useTheme() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    return { theme, toggleTheme }
}
