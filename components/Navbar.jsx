'use client';
import { PhoneCall, ChevronDown } from 'lucide-react'
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

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300 ${
            isScrolled 
                ? 'bg-gray-900 backdrop-blur-md bg-opacity-95' 
                : 'bg-transparent '
        }`}>
            {/* Logo */}
            <div className='flex items-center'>
                <img 
                    src="./images/logo.png" 
                    alt="Logo" 
                    className='w-10 h-10 transition-transform duration-200 hover:scale-105' 
                />
            </div>

            <div className='flex items-center gap-x-12'>

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
                            <DropdownMenuItem className='cursor-pointer py-2.5 text-sm hover:bg-lime-50 hover:text-lime-700 transition-colors'>
                                Videos
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-gray-100' />
                            <DropdownMenuItem className='cursor-pointer py-2.5 text-sm hover:bg-lime-50 hover:text-lime-700 transition-colors'>
                                WebSites
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-gray-100' />
                            <DropdownMenuItem className='cursor-pointer py-2.5 text-sm hover:bg-lime-50 hover:text-lime-700 transition-colors'>
                                3D Models
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <span className={`cursor-pointer transition-colors duration-200 text-[15px] font-medium py-2 ${
                        isScrolled 
                            ? 'text-white  hover:text-lime-400' 
                            : 'text-white hover:text-lime-600'
                    }`}>
                        Blogs
                    </span>
                </div>

                {/* Contact Section */}
                <div className='flex items-center gap-x-3 pl-4 border-l border-gray-200'>
                    <button className={`cursor-pointer p-2.5 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md ${
                        isScrolled 
                            ? 'bg-lime-500 hover:bg-lime-400' 
                            : 'bg-lime-600 hover:bg-lime-700'
                    }`}>
                        <PhoneCall size={16} className="text-white" />
                    </button>
                    <div className='text-right'>
                        <div className={`text-[12px] font-medium tracking-wide ${
                            isScrolled ? 'text-white' : 'text-white'
                        }`}>
                            For Consultation
                        </div>
                        <div className={`font-semibold text-[14px] tracking-tight ${
                            isScrolled ? 'text-white' : 'text-white'
                        }`}>
                            +92 (88) 669 850
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Navbar