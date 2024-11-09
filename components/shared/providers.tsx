'use client';

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "./theme-provider";
import {Suspense} from "react";
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Suspense>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SessionProvider>
            <Toaster />
            <NextTopLoader />

        </Suspense>
    )
};
