'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Profile from '@/components/Profile';

const MyProfile = () => {
     const { data: session } = useSession();
     const [posts,setPosts] = useState([]);
     const router = useRouter();

     useEffect(() => {
          const getPostsData = async() => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
          }
          if(session?.user.id) getPostsData();
          },[])

     const handleEdit = (post) => {
       router.push(`/update-post?id=${post._id}`)
     }

     const handleDelete = async (post) => {
      const isConfirmed = confirm('Are you sure you want to delete this post?');

      if(isConfirmed){
        try{
         await fetch(`/api/post/${post._id.toString()}`, {
          method: 'DELETE',
         });
         const filterPosts = post.filter(item => item._id !== post._id);

         setPosts(filterPosts);
        }
        catch(error){
          console.log(error);
        }
      }
       
     }
     return ( 
          <Profile  
          name="My"
          desc='Welcome to your personalizeed profile page'
          data={posts} 
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
      );
}
 
export default MyProfile;