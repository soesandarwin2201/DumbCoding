import { connectToDB } from "@/lib/connect";
import Post from "@/models/post";

export const GET = async (request, {params}) => {
     try{
          await connectToDB();
          const post = await Post.findById(params.id).populate('creator');
          if(!post) return new Response("Post not found", { status: 404})
          return new Response(JSON.stringify(posts), {
               status: 200
          })
     }catch(error){
          return new Response("Failed to fetch the data", {
               status: 500
     }) 
}
}

export const PATCH = async (request, {params}) => {
     const {title,about,link, tag} = await request.json();
     try{
          await connectToDB();
          const existingPost = await Post.findById(params.id);
          if(!existingPost) return new Response("Post not found", { status: 404})
          existingPost.title = title;
          existingPost.about = about;
          existingPost.link = link;
          existingPost.tag = tag;
          await existingPost.save();
          return new Response(JSON.stringify(existingPost), {
               status: 201
           })
     }catch(error){
          return new Response("Failed to update the post!", {
               status: 500
     }) 
}
}

export const DELETE = async(request,{params}) => {
     try{
      await connectToDB();
      await Post.findByIdAndRemove(params.id);
      return new Response("Post deleted successfully", {status: 200})
     }
     catch(error){
          return new Response("Failed to delete the post!", {
               status: 500})

     }
}