'use client'
import React, { useState, useEffect } from 'react';
import PostCardList from './PostCardList';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredResult, setFilteredResult] = useState([]);
  const [posts, setPosts] = useState([]);

  const filterPost = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((item) => 
      regex.test(item.creator.username) || 
      regex.test(item.title) ||
      regex.test(item.tag)
    );
  };
   
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPost(e.target.value);
        setFilteredResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPost(tagName);
    setFilteredResult(searchResult);
  };

  useEffect(() => {
    const getPostsData = async () => {
      const response = await fetch(`/api/post`);
      const data = await response.json();
      setPosts(data);
    };
    getPostsData();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="Search for the free sources" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>
      
      {searchText ? (
        <PostCardList data={filteredResult} handleTagClick={handleTagClick} />
      ) : (
        <PostCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
