import { connectToDB } from "@/lib/connect";

export const POST = async (req) => {
     const { userId,title,about,link, tag} = await req.json();

     try{
      await connectToDB();
     }
     catch(error){

     }
}