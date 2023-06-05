import { connectToDB } from "@/lib/connect";
import Post from "@/models/post";

export const POST = async (req) => {
     const { userId,title,about,link, tag} = await req.json();

     try{
      await connectToDB();
      const newPost = new Post({
          creator: userId,
          title: title,
          about: about,
          link: link,
          tag: tag
      });
      await newPost.save();
      return new Response(JSON.stringify(newPost), {
          status: 201
      })
     }
     catch(error){
    return new Response("Failed to create a new prompt", { status: 500})
     }
}