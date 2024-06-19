"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '../../public/logo.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import profile_icon from '../../public/profile-icon.jpg'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {
    const Menu = [
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:2,
            name:'Explore',
            path:'/search/Cardiologist'
        },
        {
            id:3,
            name:'Contact Us',
            path:'/'
        }
    ]

    const {user} = useKindeBrowserClient()

    useEffect(()=>{

    },[user])
  return (
    <div className='flex items-center justify-between
     p-4 shadow-sm '>
        <div className='flex items-center gap-10'>

        <Image src={logo}
        alt='logo'
        width={180}
        height={180} />

        <ul className='md:flex gap-8 hidden'>
              {Menu.map((item,index)=>(
                <Link href={item.path} key={index} >
                <li className='hover:text-primary 
                  cursor-pointer hover:scale-105 transition-all ease-in-out'>
                    {item.name}
                </li>
                </Link>
                  
                )
            )}
        </ul>

        </div>
        <Button>Get Started</Button>
        
    </div>
  )
}

export default Header