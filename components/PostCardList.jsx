import React from 'react';
import PostCard from './PostCard';

const PostCardList = ({data,handleTagClick}) => {
     return ( 
          <div className="mt-16 prompt_layout">
               {
                    data.map(post => (
                         <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
                    ))
               }
          </div>
      );
}
 
export default PostCardList;