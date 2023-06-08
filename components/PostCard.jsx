'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession} from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const PostCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
     const [copied, setCopied] = useState("");
     const { data: session } = useSession();
     const pathName = usePathname();
     const router = useRouter();

     const handleProfileClick = () => {
          if(post.creator._id === session?.user.id) return router.push(`/profile`);
          router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
     }
      
     const handleCopy = () => {
          setCopied(post.link);
          navigator.clipboard.writeText(post.link);
          setTimeout(() => setCopied(""), 3000);
     }

     return ( 
          <div className="prompt_card">
               <div className="flex justify-between items-start gap-5">
                    <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
                         <Image src={post.creator.image} 
                         alt='user image' 
                         width={40}
                         height={40} 
                         className='rounded-full object-contain' />
                         <div className="flex flex-col">
                              <h3 className="font-satoshi font-semibold text-white">
                                   {post.creator.username}
                              </h3>
                              <p className="font-inter text-sm text-white">
                                   {post.creator.email}
                              </p>
                         </div>

                    </div>
               </div>
               <div className="flex flex-col gap-4 mt-5">
                              <h3 className='font-satoshi font-semibold text-base text-white'>{post.title}</h3>
                              <p className='my-4 font-satoshi text-sm text-white'>{post.about}</p>
               <div className='flex justify-between items-start gap-5 link form_input'>
                    <p className='font-inter text-xs orange_gradient cursor-pointer overflow-hidden'>{post.link}</p>
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
               <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>
               {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm edit cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm edit cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
                         </div>
          </div>
      );
}
 
export default PostCard;