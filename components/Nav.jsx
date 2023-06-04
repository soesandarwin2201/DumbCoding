'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { AiOutlineReddit } from 'react-icons/ai'

const Nav = () => {
     const { data: session } = useSession()
     const [providers, setProviders ] = useState(null);
     const [toggle, setToggle] = useState(false);

     useEffect(() => {
          const getProviderData = async () => {
               const response = await getProviders();
                    
               setProviders(response);
          }
               getProviderData();
     },[]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
     <Link href='/' className="flex gap-2 flex-center logo_text">
          DumbCoding <AiOutlineReddit />
     </Link>
     <div className="sm:flex hidden">
       {
          session?.user ? (
               <div className="flex gap-3 md:gap-5">
                    <Link href='/create-post' className="black_btn">
                         Create Post
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                         Sign Out
                    </button>

                    <Link href='/profile'>
                         <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
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

     <div className="sm:hidden flex relative">
          { 
          session?.user ? (
               <div className="flex">
                    <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="use profile" onClick={() => setToggle((current) => !current)} />

                    {
                        toggle && (
                         <div className="dropdown">
                                   <Link 
                                   href='/profile'
                                   className="dropdown_link items-center" 
                                   onClick={() => setToggle(false)}>
                                         My Profile
                                   </Link>
                                   <Link 
                                   href='/create_post'
                                   className="dropdown_link items-center" 
                                   onClick={() => setToggle(false)}>
                                         Create Post
                                   </Link>
                                   <button type="button" onClick={() => {
                                        setToggle(false);
                                        signOut()
                                   }} className="mt-5 w-full black_btn">
                                        Sign Out
                                   </button>
                              </div>
                        )
                    }
               </div>
          ) : (
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
          )}
     </div>
    </nav>
  )
}

export default Nav