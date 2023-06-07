"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState({
   title: '',
   about: '',
   link: '',
   tag: '',
});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
         title: data.title,
         about: data.about,
         link: data.link,
         tag: data.tag
      });
    };

    if (postId) getPromptDetails();
  }, [postId]);

  const updatePost = async (e) => {
   e.preventDefault();
   setSubmitting(true);
   if (!postId) return alert("Missing postId!");

   try{
        const response = await fetch(`/api/post/${postId}`, {
             method: 'PATCH',
             body: JSON.stringify({
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
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePrompt;