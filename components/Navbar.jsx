'use client';
import { PhoneCall, ChevronDown, Menu, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const pathname = usePathname()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        // Use passive scroll listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
        setIsDropdownOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    // Handle escape key to close mobile menu
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false)
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/blogs', label: 'Blogs' },
    ]

    const portfolioLinks = [
        { href: '/portfolio/videos', label: 'Videos' },
        { href: '/portfolio/websites', label: 'WebSites' },
        { href: '/portfolio/3d-models', label: '3D Renderings' },
    ]

    const isActiveLink = (href) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
                        : 'bg-transparent'
                }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link 
                            href="/" 
                            className="flex items-center group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <img 
                                src={'/images/logo.png'} 
                                alt="Kamaan Logo" 
                                className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-200 group-hover:scale-105" 
                            />
                            <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                                Kamaan
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {/* Main Navigation Links */}
                            <div className="flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-1 py-2 text-[15px] font-medium transition-colors duration-200 ${
                                            isActiveLink(link.href)
                                                ? 'text-lime-400'
                                                : 'text-white hover:text-lime-400'
                                        }`}
                                    >
                                        {link.label}
                                        {isActiveLink(link.href) && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-400" />
                                        )}
                                    </Link>
                                ))}
                                
                                {/* Portfolio Dropdown */}
                                <DropdownMenu onOpenChange={setIsDropdownOpen}>
                                    <DropdownMenuTrigger className="flex items-center space-x-1 px-1 py-2 text-[15px] font-medium text-white hover:text-lime-400 transition-colors duration-200 focus:outline-none focus:text-lime-400">
                                        <span>Portfolios</span>
                                        <ChevronDown 
                                            size={16} 
                                            className={`transition-transform duration-200 ${
                                                isDropdownOpen ? 'rotate-180' : ''
                                            }`} 
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent 
                                        className="w-48 mt-2 border border-gray-700 bg-gray-900 shadow-xl rounded-lg"
                                        align="start"
                                    >
                                        {portfolioLinks.map((link, index) => (
                                            <React.Fragment key={link.href}>
                                                <DropdownMenuItem asChild>
                                                    <Link 
                                                        href={link.href}
                                                        className="w-full px-3 py-2.5 text-sm text-white hover:bg-lime-600 hover:text-white transition-colors cursor-pointer"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                                {index < portfolioLinks.length - 1 && (
                                                    <DropdownMenuSeparator className="bg-gray-700" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Contact Section */}
                            <div className="flex items-center space-x-3 pl-8 border-l border-gray-600">
                                <Link href="/contact" className="flex items-center space-x-3 group">
                                    <div className="p-2.5 bg-lime-600 rounded-lg shadow-sm group-hover:bg-lime-500 group-hover:shadow-md transition-all duration-200">
                                        <PhoneCall size={16} className="text-white" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[12px] font-medium text-white tracking-wide">
                                            For Consultation
                                        </div>
                                        <div className="font-semibold text-[14px] text-white tracking-tight">
                                            +92 (339) 245 0349
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 rounded-lg text-white hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400"
                            onClick={toggleMobileMenu}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
                    isMobileMenuOpen 
                        ? 'opacity-100 visible' 
                        : 'opacity-0 invisible'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            {/* Mobile Menu Panel */}
            <div 
                className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-full lg:hidden transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-gray-900 shadow-xl`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <Link 
                            href="/" 
                            className="flex items-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <img 
                                src={'/images/logo.png'} 
                                alt="Kamaan Logo" 
                                className="w-8 h-8" 
                            />
                            <span className="ml-2 text-lg font-bold text-white">
                                Kamaan
                            </span>
                        </Link>
                        <button
                            className="p-2 rounded-lg text-white hover:bg-gray-800 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                                    isActiveLink(link.href)
                                        ? 'bg-lime-600 text-white'
                                        : 'text-white hover:bg-lime-600'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile Portfolio Section */}
                        <div className="pt-2">
                            <div className="px-4 py-2 text-lg font-medium text-white">
                                Portfolios
                            </div>
                            <div className="space-y-1 ml-4">
                                {portfolioLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block px-4 py-3 rounded-lg transition-colors ${
                                            isActiveLink(link.href)
                                                ? 'bg-lime-600 text-white'
                                                : 'text-white hover:bg-lime-600'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Contact Section */}
                    <div className="p-4 border-t border-gray-700 space-y-4">
                        <Link
                            href="/contact"
                            className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-lime-600 text-white rounded-lg hover:bg-lime-500 transition-colors font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <PhoneCall size={18} />
                            <span>Contact Us</span>
                        </Link>
                        
                        <div className="text-center">
                            <div className="text-white text-sm font-medium mb-1">
                                For Consultation
                            </div>
                            <div className="text-white font-semibold text-lg">
                                +92 (339) 245 0349
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;