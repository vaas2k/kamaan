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
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Navbar */}
            <div
                className={`
    fixed top-0 left-0 right-0 z-50 flex items-center justify-between 
    px-6 md:px-8 py-5 transition-all duration-300

    ${isScrolled
                        ? 'bg-gray-900 backdrop-blur-md bg-opacity-95'
                        : 'md:bg-transparent bg-gray-900 bg-opacity-95 backdrop-blur-md'
                    }
`}
            >
                {/* Logo */}
                <div className='flex items-center'>
                    <img
                        src={'/images/logo.png'}
                        alt="Logo"
                        className='w-10 h-10 transition-transform duration-200 hover:scale-105'
                    />
                    <span className='ml-3 text-xl font-bold text-white cursor-pointer'>
                        Kamaan
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-x-12'>
                    <div className='flex items-center gap-x-8'>
                        <Link
                            href={'/'}
                            className='cursor-pointer transition-colors duration-200 text-[15px] text-white font-medium py-2 hover:text-lime-400'
                        >
                            Home
                        </Link>

                        <Link
                            href={'/services'}
                            className='cursor-pointer transition-colors duration-200 text-[15px] text-white font-medium py-2 hover:text-lime-400'
                        >
                            Services
                        </Link>

                        {/* Desktop Portfolio Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-x-1 text-white hover:text-lime-400 text-[15px] font-medium py-2 cursor-pointer'>
                                Portfolios
                                <ChevronDown size={16} className='mt-0.5' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-48 mt-2 border border-gray-200 shadow-lg rounded-lg'>
                                <Link href={'/portfolio/videos'}>
                                    <div className='text-center cursor-pointer py-2.5 text-sm rounded-lg hover:bg-lime-600 hover:text-white transition-colors'>
                                        Videos
                                    </div>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link href={'/portfolio/websites'}>
                                    <div className='text-center cursor-pointer py-2.5 text-sm rounded-lg hover:bg-lime-600 hover:text-white transition-colors'>
                                        WebSites
                                    </div>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link href={'/portfolio/3d-models'}>
                                    <div className='text-center cursor-pointer py-2.5 text-sm rounded-lg hover:bg-lime-600 hover:text-white transition-colors'>
                                        3D Renderings
                                    </div>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                            href={'/blogs'}
                            className='cursor-pointer transition-colors duration-200 text-[15px] text-white font-medium py-2 hover:text-lime-400'
                        >
                            Blogs
                        </Link>
                    </div>

                    {/* Contact */}
                    <div className='flex items-center gap-x-3 pl-4 border-l border-gray-200 '>
                        <Link href={'/contact'}>
                            <button className='cursor-pointer p-2.5 bg-lime-600 hover:bg-lime-700 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md'>
                                <PhoneCall size={16} className="text-white" />
                            </button>
                        </Link>
                        <div className='text-right'>
                            <div className='text-[12px] text-white'>For Consultation</div>
                            <div className='font-semibold text-[14px] text-white'>
                                +92 (339) 245 0349
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden text-white'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden fixed top-[70px] left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-md p-6 space-y-4 z-40'>
                    <Link href={'/'} className='block text-white text-lg font-medium'>
                        Home
                    </Link>

                    <Link href={'/services'} className='block text-white text-lg font-medium'>
                        Services
                    </Link>

                    {/* Mobile Dropdown */}
                    <div>
                        <button
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            className='flex justify-between items-center w-full text-white text-lg font-medium'
                        >
                            Portfolios
                            <ChevronDown
                                size={18}
                                className={`transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {mobileDropdownOpen && (
                            <div className='ml-4 mt-2 space-y-2'>
                                <Link href={'/portfolio/videos'} className='block text-gray-300'>
                                    Videos
                                </Link>
                                <Link href={'/portfolio/websites'} className='block text-gray-300'>
                                    Websites
                                </Link>
                                <Link href={'/portfolio/3d-models'} className='block text-gray-300'>
                                    3D Renderings
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href={'/blogs'} className='block text-white text-lg font-medium'>
                        Blogs
                    </Link>

                    {/* Mobile Contact */}
                    <div className='pt-4 border-t border-gray-600'>
                        <Link href={'/contact'}>
                            <div className='flex items-center gap-x-3'>
                                <div className='p-2.5 bg-lime-600 rounded-lg'>
                                    <PhoneCall className='text-white' size={18} />
                                </div>
                                <div>
                                    <div className='text-gray-300 text-sm'>For Consultation</div>
                                    <div className='text-white font-semibold'>
                                        +92 (339) 245 0349
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            <a
                href="https://wa.me/923392450349"
                target="_blank"
                className="fixed bottom-5 right-5 z-[60] animate-pulse bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="sm:w-6 sm:h-6"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.452" />
                </svg>
            </a>
        </>
    );
};

export default Navbar;
