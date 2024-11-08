import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Explore.css"
import blog1 from '../../assets/summer.jpg'
import blog2 from '../../assets/tech.jpg'
import blog3 from '../../assets/food.jpg'

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: 'Exploring the World of Technology',
      excerpt: 'A brief introduction to the evolving field of technology and its impact on modern society...',
      featuredImage: blog2,
      avatar: 'https://placeimg.com/50/50/people',
      author: 'NinaNamalwa',
      lastUpdated: 'October 25, 2024',
    },
    {
      id: 2,
      title: 'Top Travel Destinations for 2024',
      excerpt: 'From tropical beaches to bustling cities, discover the top destinations to visit in 2024...',
      featuredImage: blog1,
      avatar: '',
      author: 'LinahMercy',
      lastUpdated: 'November 1, 2024',
    },
    {
      id: 1,
      title: 'Exploring tribal recipes',
      excerpt: 'Finding out the different culture foods around Africa...',
      featuredImage: blog3,
      avatar: '',
      author: 'NinaNamalwa',
      lastUpdated: 'October 25, 2024',
    }
    
  ];

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };


  return (
    <div className="explore-section">
      <header className="explore-header">
        <h1>Explore Stories & Ideas</h1>
        <p>Discover stories, insights, and ideas from around the world.</p>
      </header>
      
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Technology</option>
          <option>Travel</option>
          <option>Lifestyle</option>
          <option>Health</option>
        </select>
      </div>



      <section className='grid-container'>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleCardClick(blog.id)}
            className='card'
          >  


            <img src={blog.featuredImage} alt="Featured" className='card-img'/>
            <div className="blog-card">
              <div  className="blog-card-header">
                <img
                  src={blog.avatar || 'https://placeimg.com/50/50/abstract'}
                  alt="Author Avatar"
                />
                <div className="blog-card-author">{blog.author} • {blog.lastUpdated}</div>
              </div>
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-excerpt">{blog.excerpt}</p>
              <button className="blog-card-button">Read More</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Explore;
