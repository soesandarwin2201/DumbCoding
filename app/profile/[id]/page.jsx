'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";

const UserProfile = ({params}) => {
     const searchParams = useSearchParams();
     const userName = searchParams.get('name');
     const [userPost, setUserPosts] = useState([]);
     console.log(userPost);
      
     useEffect(() => {
          const fetchPosts = async() => {
               const response = await fetch(`/api/users/${params?.id}/posts`);
               const data = await response.json();
               setUserPosts(data)
          };
          if(params?.id) fetchPosts();
     }, [params.id]);

     return ( 
          <Profile name={userName} desc={`Welcome to ${userName}'s personalizes profile page.Explore the resourse from ${userName} .`} data={userPost} />
      );
}
 
export default UserProfile;

