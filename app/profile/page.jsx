'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Profile from '@/components/Profile';

const MyProfile = () => {
     const { data: session } = useSession();
     const [posts,setPosts] = useState([]);

     useEffect(() => {
          const getPostsData = async() => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
          }
          if(session?.user.id) getPostsData();
          },[])

     const handleEdit = () => {

     }

     const handleDelete = async () => {

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