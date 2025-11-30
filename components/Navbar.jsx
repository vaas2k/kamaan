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

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [])

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-gray-900 backdrop-blur-md bg-opacity-95' 
                    : 'bg-transparent'
            }`}>
                {/* Logo */}
                <div className='flex items-center'>
                    <img 
                        src={'/images/logo.png'} 
                        alt="Logo" 
                        className='w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-200 hover:scale-105' 
                    />
                    <span className={`ml-2 sm:ml-3 text-lg sm:text-xl font-bold hover:text-lime-600 cursor-pointer ${
                        isScrolled ? 'text-white' : 'text-white'
                    }`}>
                        Kamaan
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-x-12'>
                    {/* Navigation Links */}
                    <div className='flex items-center gap-x-8'>
                        <Link href={'/'} className={`cursor-pointer transition-colors duration-200 text-[15px] font-medium py-2 ${
                            isScrolled 
                                ? 'text-white hover:text-lime-400' 
                                : 'text-white hover:text-lime-600'
                        }`}>
                            Home
                        </Link>
                        <Link href={'/services'} className={`cursor-pointer transition-colors duration-200 text-[15px] font-medium py-2 ${
                            isScrolled 
                                ? 'text-white hover:text-lime-400' 
                                : 'text-white hover:text-lime-600'
                        }`}>
                            Services
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className={`flex items-center gap-x-1 cursor-pointer transition-colors duration-200 text-[15px] font-medium py-2 focus:outline-none ${
                                isScrolled 
                                    ? 'text-white hover:text-lime-400' 
                                    : 'text-white hover:text-lime-600'
                            }`}>
                                Portfolios
                                <ChevronDown size={16} className='mt-0.5' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-48 mt-2 border border-gray-200 shadow-lg rounded-lg'>
                               <Link href={'/portfolio/videos'} >
                                <div className='text-center cursor-pointer py-2.5 text-sm rounded-lg hover:bg-lime-600 hover:text-white transition-colors'>
                                    Videos
                                </div>
                               </Link> 
                                <DropdownMenuSeparator className='bg-gray-100' />
                                <Link href={'/portfolio/websites'}>
                                <div className='text-center cursor-pointer py-2.5 text-sm rounded-lg hover:bg-lime-600 hover:text-white transition-colors'>
                                    WebSites
                                </div>
                                </Link>
                                <DropdownMenuSeparator className='bg-gray-100' />
                                 <Link href={'/portfolio/3d-models'}>
                                <div className='text-center cursor-pointer py-2.5 text-sm rounded-lg hover:bg-lime-600 hover:text-white transition-colors'>
                                    3D Renderings
                                </div>
                                 </Link>                              
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href={'/blogs'} className={`cursor-pointer transition-colors duration-200 text-[15px] font-medium py-2 ${
                            isScrolled 
                                ? 'text-white  hover:text-lime-400' 
                                : 'text-white hover:text-lime-600'
                        }`}>
                            Blogs
                        </Link>
                    </div>

                    {/* Contact Section */}
                    <div className='flex items-center gap-x-3 pl-4 border-l border-gray-200'>
                        <Link href={'/contact'}>
                        <button className={`cursor-pointer p-2.5 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md ${
                            isScrolled 
                            ? 'bg-lime-500 hover:bg-lime-400' 
                            : 'bg-lime-600 hover:bg-lime-700'
                        }`}>
                            <PhoneCall size={16} className="text-white" />
                        </button>
                            </Link>
                        <div className='text-right'>
                            <div className={`text-[12px] font-medium tracking-wide ${
                                isScrolled ? 'text-white' : 'text-white'
                            }`}>
                                WhatsApp
                            </div>
                            <div className={`font-semibold text-[14px] tracking-tight ${
                                isScrolled ? 'text-white' : 'text-white'
                            }`}>
                                +92 (339) 245 0349
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="lg:hidden p-2 rounded-lg text-white hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            } ${isScrolled ? 'bg-gray-900' : 'bg-gray-900'} mt-16`}>
                <div className="px-4 py-6 space-y-4">
                    {/* Mobile Navigation Links */}
                    <Link 
                        href={'/'} 
                        className="block py-3 px-4 text-white hover:bg-lime-600 rounded-lg transition-colors text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    
                    <Link 
                        href={'/services'} 
                        className="block py-3 px-4 text-white hover:bg-lime-600 rounded-lg transition-colors text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Services
                    </Link>

                    {/* Mobile Dropdown for Portfolios */}
                    <div className="px-4 py-3">
                        <div className="text-white text-lg font-medium mb-2">Portfolios</div>
                        <div className="space-y-2 ml-4">
                            <Link 
                                href={'/portfolio/videos'} 
                                className="block py-2 px-4 text-white hover:bg-lime-600 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Videos
                            </Link>
                            <Link 
                                href={'/portfolio/websites'} 
                                className="block py-2 px-4 text-white hover:bg-lime-600 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                WebSites
                            </Link>
                            <Link 
                                href={'/portfolio/3d-models'} 
                                className="block py-2 px-4 text-white hover:bg-lime-600 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                3D Renderings
                            </Link>
                        </div>
                    </div>

                    <Link 
                        href={'/blogs'} 
                        className="block py-3 px-4 text-white hover:bg-lime-600 rounded-lg transition-colors text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Blogs
                    </Link>

                    {/* Mobile Contact Section */}
                    <div className="pt-4 border-t border-gray-700">
                        <Link 
                            href={'/contact'} 
                            className="flex items-center justify-center gap-x-2 py-3 px-4 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <PhoneCall size={18} />
                            Contact Us
                        </Link>
                        
                        <div className="mt-4 text-center">
                            <div className="text-white text-sm font-medium">
                                For Consultation
                            </div>
                            <div className="text-white font-semibold text-lg">
                                +92 (339) 245 0349
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    )
}

export default Navbar