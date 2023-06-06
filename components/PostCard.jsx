'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession} from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const PostCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
     const [copied, setCopied] = useState("");
      
     const handleCopy = () => {
          setCopied(post.link);
          navigator.clipboard.writeText(post.link);
          setTimeout(() => setCopied(""), 3000);
     }

     return ( 
          <div className="prompt_card">
               <div className="flex justify-between items-start gap-5">
                    <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                         <Image src={post.creator.image} 
                         alt='user image' 
                         width={40}
                         height={40} 
                         className='rounded-full object-contain' />
                         <div className="flex flex-col">
                              <h3 className="font-satoshi font-semibold text-gray-900">
                                   {post.creator.username}
                              </h3>
                              <p className="font-inter text-sm text-gray-500">
                                   {post.creator.email}
                              </p>
                         </div>

                    </div>
               </div>
               <div className="flex flex-col gap-4 mt-5">
                              <h3 className='font-satoshi font-semibold text-base text-gray-700'>{post.title}</h3>
                              <p className='my-4 font-satoshi text-sm text-gray-700'>{post.about}</p>
               <div className='flex justify-between items-start gap-5 link form_input'>
                    <p className='font-inter text-sm blue_gradient cursor-pointer'>{post.link}</p>
                    <div className="copy_btn" onClick={handleCopy}>
                    <Image
            src={
              copied === post.link
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.link ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
                    </div>
               </div>
               <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
                              
                         </div>
          </div>
      );
}
 
export default PostCard;