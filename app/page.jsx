import Feed from "@/components/Feed";

const Home = () => {
     return ( 
          <section className="w-full flex-center flex-col">
               <h1 className="head_text text-center">
                    Start You Journey
                    <br className="max-md:hidden" />
                    <span className="text-center">
                         With DumbCoding
                    </span>
               </h1>
               <p className="desc text-center"> Dumbcoding is an open-source blog app for every who want to learn software engineering. I will share all the resources for you journey.</p>

               <Feed />
          </section>
      );
}
 
export default Home;