import { useLayoutEffect, useState } from 'react'

const getInitialTheme = () => {
    const root = window?.document?.documentElement
    if (root) {
        const dataTheme = root.getAttribute('data-theme')
        if (dataTheme) return dataTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('app-theme')
        return storedTheme || getInitialTheme()
    })

    useLayoutEffect(() => {
        const root = window?.document?.documentElement
        if (root) {
            root.setAttribute('data-theme', theme)
            localStorage.setItem('app-theme', theme)
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            const root = window?.document?.documentElement
            if (root) {
                root.setAttribute('data-theme', newTheme)
                localStorage.setItem('app-theme', newTheme)
            }
            return newTheme
        })
    }

    return { theme, toggleTheme }
}
