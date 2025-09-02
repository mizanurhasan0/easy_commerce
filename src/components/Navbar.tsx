"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = {
    href: string;
    label: string;
};

const NAV_LINKS: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/deals", label: "Deals" },
    { href: "/support", label: "Support" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [elevated, setElevated] = useState(false);

    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 ${elevated ? "shadow-sm border-b border-border" : ""
                } transition-[box-shadow,background-color,border-color] duration-300`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded-md px-2 py-1 text-lg font-semibold text-foreground/90 hover:text-foreground transition-colors"
                        >
                            <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/90 text-primary-foreground">e</span>
                            <span className="hidden sm:inline">EasyCommerce</span>
                            <span className="sm:hidden">Easy</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/cart"
                            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground/90 hover:text-foreground hover:shadow-sm transition-all"
                        >
                            Cart
                        </Link>
                        <Link
                            href="/signin"
                            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:brightness-105 active:brightness-95 transition-[filter,transform]"
                        >
                            Sign in
                        </Link>
                        <button
                            aria-label="Toggle Menu"
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted transition-colors focus-visible:focus-ring"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {open ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <path d="M3 6h18M3 12h18M3 18h18" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div
                className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-1 px-4 pb-4 pt-2">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:text-foreground hover:bg-muted transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex gap-2 pt-2">
                        <Link
                            href="/cart"
                            className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-center text-sm hover:bg-muted transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Cart
                        </Link>
                        <Link
                            href="/signin"
                            className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground hover:brightness-105 transition"
                            onClick={() => setOpen(false)}
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}


