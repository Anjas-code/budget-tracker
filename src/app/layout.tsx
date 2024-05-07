import type { Metadata } from "next";
import "./globals.css";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { inter } from "@/components/ui/fonts";
import RootProvider from "@/components/providers/root-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Budget Tracking",
    description: "Your best budget tracking",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html
                lang="en"
                className="dark"
                style={{
                    colorScheme: "dark",
                }}
            >
                <body className={inter.className}>
                    <Toaster richColors position="bottom-right" />
                    <RootProvider>{children}</RootProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
