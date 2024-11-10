import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import './BlogPreview.css';

function BlogPreview({ id, title, excerpt, authorName, authorImgUrl }) {
    const navigate = useNavigate();

    function handleNavigateToFullBlog() {
        if (!id) return;
        navigate(`/blog/${id}`);
    }

    return (
        <div className="blog-container" onClick={handleNavigateToFullBlog} role="button" tabIndex={0}>
            <div className="blog-header">
                <h2>{title}</h2>
            </div>
            <div className="blog-content">
                <p>{excerpt}</p>
            </div>
            <div className="blog-footer">
                <div className="author-info">
                    {authorImgUrl ? (
                        <img src={authorImgUrl} alt={`${authorName}'s avatar`} className="author-avatar" />
                    ) : (
                        <FaUser className="default-avatar" />
                    )}
                    <p className="author-name">{authorName || "Unknown Author"}</p>
                </div>
                <button className="read-more-button" onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateToFullBlog();
                }}>
                    Read More
                </button>
            </div>
        </div>
    );
}

export default BlogPreview;
