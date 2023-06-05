'use client';
import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import { findDOMNode } from 'react-dom';
import { sendStatusCode } from 'next/dist/server/api-utils';

const CreatePost = () => {
     const router = useRouter();
     const { data: session } = useSession();
     const [submitting, setSubmitting] = useState(false);
     const [post, setPost] = useState({
          title: '',
          about: '',
          link: '',
          tag: '',
     });

     const createPost = async (e) => {
          e.preventDefault();
          setSubmitting(true);

          try{
               const response = await fetch('/api/post/new', {
                    method: 'POST',
                    body: JSON.stringify({
                         userId: session?.user.id,
                         title: post.title,
                         about: post.about,
                         link: post.link,
                         tag: post.tag
                    })
               })
               if(response.ok){
                    router.push('/');
               }
          } catch(error){
           console.log(error);
          }
          finally{
               setSubmitting(false);
          }

     }


     return ( 
         <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPost} />
      );
}
 
export default CreatePost;