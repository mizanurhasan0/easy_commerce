"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
    id: string;
    name: string;
    href: string;
    icon: string;
    subcategories: {
        id: string;
        name: string;
        href: string;
        items?: string[];
    }[];
};

type NavLink = {
    href: string;
    label: string;
};

const CATEGORIES: Category[] = [
    {
        id: "electronics",
        name: "Electronics",
        href: "/electronics",
        icon: "📱",
        subcategories: [
            {
                id: "mobile-phones",
                name: "Mobile Phones",
                href: "/electronics/mobile-phones",
                items: ["Smartphones", "Feature Phones", "Accessories"]
            },
            {
                id: "computers",
                name: "Computers",
                href: "/electronics/computers",
                items: ["Laptops", "Desktops", "Tablets", "Monitors"]
            },
            {
                id: "audio",
                name: "Audio & Video",
                href: "/electronics/audio",
                items: ["Headphones", "Speakers", "Cameras", "TV & Home Theater"]
            }
        ]
    },
    {
        id: "fashion",
        name: "Fashion",
        href: "/fashion",
        icon: "👕",
        subcategories: [
            {
                id: "mens-fashion",
                name: "Men's Fashion",
                href: "/fashion/mens",
                items: ["Clothing", "Shoes", "Accessories", "Watches"]
            },
            {
                id: "womens-fashion",
                name: "Women's Fashion",
                href: "/fashion/womens",
                items: ["Clothing", "Shoes", "Bags", "Jewelry"]
            },
            {
                id: "kids-fashion",
                name: "Kids Fashion",
                href: "/fashion/kids",
                items: ["Boys Clothing", "Girls Clothing", "Baby & Toddler"]
            }
        ]
    },
    {
        id: "home-garden",
        name: "Home & Garden",
        href: "/home-garden",
        icon: "🏠",
        subcategories: [
            {
                id: "furniture",
                name: "Furniture",
                href: "/home-garden/furniture",
                items: ["Living Room", "Bedroom", "Kitchen & Dining", "Office"]
            },
            {
                id: "home-decor",
                name: "Home Decor",
                href: "/home-garden/decor",
                items: ["Wall Art", "Lighting", "Rugs", "Curtains"]
            },
            {
                id: "garden",
                name: "Garden & Outdoor",
                href: "/home-garden/garden",
                items: ["Plants", "Garden Tools", "Outdoor Furniture", "BBQ & Grilling"]
            }
        ]
    },
    {
        id: "sports",
        name: "Sports & Fitness",
        href: "/sports",
        icon: "⚽",
        subcategories: [
            {
                id: "fitness",
                name: "Fitness Equipment",
                href: "/sports/fitness",
                items: ["Cardio Equipment", "Strength Training", "Yoga & Pilates"]
            },
            {
                id: "outdoor-sports",
                name: "Outdoor Sports",
                href: "/sports/outdoor",
                items: ["Cycling", "Running", "Swimming", "Hiking"]
            }
        ]
    },
    {
        id: "books",
        name: "Books & Media",
        href: "/books",
        icon: "📚",
        subcategories: [
            {
                id: "books",
                name: "Books",
                href: "/books/books",
                items: ["Fiction", "Non-Fiction", "Educational", "Children's Books"]
            },
            {
                id: "media",
                name: "Movies & Music",
                href: "/books/media",
                items: ["DVDs", "Blu-ray", "Music CDs", "Digital Downloads"]
            }
        ]
    },
    {
        id: "automotive",
        name: "Automotive",
        href: "/automotive",
        icon: "🚗",
        subcategories: [
            {
                id: "parts",
                name: "Auto Parts",
                href: "/automotive/parts",
                items: ["Engine Parts", "Body Parts", "Electrical", "Tires & Wheels"]
            },
            {
                id: "accessories",
                name: "Car Accessories",
                href: "/automotive/accessories",
                items: ["Interior", "Exterior", "Electronics", "Tools"]
            }
        ]
    }
];

const NAV_LINKS: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/deals", label: "Today's Deals" },
    { href: "/brands", label: "Brands" },
    { href: "/gift-cards", label: "Gift Cards" },
    { href: "/customer-service", label: "Customer Service" }
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [elevated, setElevated] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 bg-background border-b border-border ${elevated ? "shadow-sm" : ""
                } transition-shadow duration-300`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center mr-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded-md px-2 py-1 text-lg font-bold text-foreground hover:text-primary transition-colors"
                        >
                            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold">E</span>
                            <span className="hidden sm:inline">EasyCommerce</span>
                        </Link>
                    </div>

                    {/* Categories Dropdown - Left Side */}
                    <div className="relative mr-6">
                        <button
                            onClick={() => setCategoriesOpen(!categoriesOpen)}
                            onMouseEnter={() => setCategoriesOpen(true)}
                            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            All Categories
                            <svg
                                className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Categories Mega Dropdown */}
                        {categoriesOpen && (
                            <div
                                className="absolute top-full left-0 mt-1 w-screen max-w-4xl bg-card border border-border rounded-lg shadow-xl z-50"
                                onMouseLeave={() => {
                                    setCategoriesOpen(false);
                                    setActiveCategory(null);
                                }}
                            >
                                <div className="flex">
                                    {/* Categories List */}
                                    <div className="w-64 border-r border-border">
                                        <div className="py-2">
                                            {CATEGORIES.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onMouseEnter={() => setActiveCategory(category.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted transition-colors ${activeCategory === category.id ? "bg-muted text-primary" : "text-foreground/80"
                                                        }`}
                                                >
                                                    <span className="text-lg">{category.icon}</span>
                                                    {category.name}
                                                    <svg className="ml-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Subcategories */}
                                    <div className="flex-1 p-6">
                                        {activeCategory && (
                                            <div>
                                                {CATEGORIES.find(cat => cat.id === activeCategory)?.subcategories.map((subcategory) => (
                                                    <div key={subcategory.id} className="mb-6">
                                                        <Link
                                                            href={subcategory.href}
                                                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors mb-3 block"
                                                        >
                                                            {subcategory.name}
                                                        </Link>
                                                        {subcategory.items && (
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {subcategory.items.map((item, index) => (
                                                                    <Link
                                                                        key={index}
                                                                        href={`${subcategory.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        className="text-xs text-foreground/70 hover:text-primary transition-colors py-1"
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {!activeCategory && (
                                            <div className="text-center text-foreground/60 py-8">
                                                <p>Hover over a category to see subcategories</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1 flex-1">
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

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-64 pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <svg className="absolute left-3 top-2.5 h-4 w-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Account & Cart */}
                        <Link
                            href="/account"
                            className="hidden sm:flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account
                        </Link>

                        <Link
                            href="/cart"
                            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground/90 hover:text-foreground hover:shadow-sm transition-all"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                            </svg>
                            <span className="hidden sm:inline">Cart</span>
                            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">0</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            aria-label="Toggle Menu"
                            onClick={() => setOpen(!open)}
                            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted transition-colors focus-visible:focus-ring"
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

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden border-t border-border bg-background">
                    <div className="px-4 py-2 space-y-1">
                        {/* Mobile Search */}
                        <div className="pb-3">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-3 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Mobile Categories */}
                        <div className="border-t border-border pt-2">
                            <button
                                onClick={() => setCategoriesOpen(!categoriesOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            >
                                All Categories
                                <svg
                                    className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {categoriesOpen && (
                                <div className="ml-4 mt-2 space-y-1">
                                    {CATEGORIES.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={category.href}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span>{category.icon}</span>
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="border-t border-border pt-2">
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
                        </div>

                        {/* Mobile Account Link */}
                        <div className="border-t border-border pt-2">
                            <Link
                                href="/account"
                                className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:text-foreground hover:bg-muted transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                My Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}


