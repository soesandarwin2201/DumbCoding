'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import PostCardList from './PostCardList';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts,setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
  const getPostsData = async() => {
    const response = await fetch('/api/post');
    const data = await response.json();
    setPosts(data);
  }
  getPostsData();
  },[])
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder='Search for the free sources' value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>
      <PostCardList 
      data={posts} 
      handleTagClick={() => {}} />
    </section>
  )
}

export default Feed