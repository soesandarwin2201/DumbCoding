'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { AiOutlineReddit } from 'react-icons/ai'

const Nav = () => {
     const isUserLogIn = false;
     const [providers, setProviders ] = useState(null);

     useEffect(() => {
          const setProviders = async () => {
               const response = await getProviders();

               setProviders(response);
          }
          setProviders();
     },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
     <Link href='/' className="flex gap-2 flex-center logo_text">
          DumbCoding <AiOutlineReddit />
     </Link>

     <div className="sm:flex hidden">
       {
          isUserLogIn ? (
               <div className="flex gap-3 md:gap-5">
                    <Link href='/create-post' className="black_btn">
                         Create Post
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                         Sign Out
                    </button>

                    <Link href='/profile'>
                         <Image src='/assets/images/logo.svg' width={37} height={37} className="rounded-full" alt="profile" />
                    </Link>
               </div>
          ):(
               <>
               {
                    providers && Object.values(providers).map((providers) => (
                      <button type="button" key={providers.name} 
                      onClick={() => signIn(providers.id)} 
                      className="black_btn">
                         Sign In
                      </button>                         
                    ))

               }
               </>
          )
       }
     </div>
    </nav>
  )
}

export default Nav