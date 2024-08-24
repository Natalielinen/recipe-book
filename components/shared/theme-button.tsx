'use client';

import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react"

export const ThemeButton = () => {

    const { setTheme, theme } = useTheme();

    const onThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return <Button variant="outline" onClick={onThemeChange}>
        {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
}