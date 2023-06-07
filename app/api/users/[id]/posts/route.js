import { connectToDB } from "@/lib/connect";
import Post from "@/models/post";

export const GET = async (request, {params}) => {
     try{
          await connectToDB();
          const posts = await Post.find({
               creator: params.id
          }).populate('creator');
          return new Response(JSON.stringify(posts), {
               status: 200
          })
     }catch(error){
          return new Response("Failed to fetch the data", {
               status: 500
     }) 
}
}