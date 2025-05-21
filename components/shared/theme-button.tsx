'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeButton = () => {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button variant="outline" onClick={onThemeChange} aria-label="Toggle dark mode">
            {!mounted ? null : theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
    );
};