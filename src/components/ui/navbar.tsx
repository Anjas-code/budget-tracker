"use client";

import { NAVBAR_ITEMS } from "@/constant";
import { Logo } from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { UserButton } from "@clerk/nextjs";
import { ButtonThemeSwitcher } from "./button-theme-switcher";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Menu } from "lucide-react";

export const Navbar = () => {
    return (
        <>
            <NavbarDesktop />
            <NavbarMobile />
        </>
    );
};

const NavbarMobile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <aside>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-1/2" side="left">
                            <div className="flex">
                                <Logo />
                            </div>
                            <div className="flex flex-col gap-1 pt-4">
                                {NAVBAR_ITEMS.map((item) => (
                                    <NavbarItem
                                        key={item.label}
                                        href={item.href}
                                        label={item.label}
                                        callbackClick={() =>
                                            setIsOpen((prev) => !prev)
                                        }
                                    />
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </aside>

                <div className="flex h-[80px] min-h-[60px] items-center">
                    <Logo />
                </div>

                <aside className="flex items-center gap-2">
                    <ButtonThemeSwitcher />
                    <UserButton afterSignOutUrl="/sign-in" />
                </aside>
            </nav>
        </div>
    );
};

const NavbarDesktop = () => {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <aside className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo />
                    <div className="h-full flex">
                        {NAVBAR_ITEMS.map((item) => (
                            <NavbarItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                            />
                        ))}
                    </div>
                </aside>

                <aside className="flex items-center gap-4">
                    <ButtonThemeSwitcher />
                    <UserButton afterSignOutUrl="/sign-in" />
                </aside>
            </nav>
        </div>
    );
};

const NavbarItem = ({
    href,
    label,
    callbackClick,
}: {
    href: string;
    label: string;
    callbackClick?: () => void;
}) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <div className="relative flex items-center">
            <Link
                href={href}
                className={cn(
                    buttonVariants({
                        variant: "ghost",
                    }),
                    "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
                    isActive && "text-foreground"
                )}
                onClick={() => {
                    if (callbackClick) callbackClick();
                }}
            >
                {label}
            </Link>
            {isActive && (
                <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
            )}
        </div>
    );
};
