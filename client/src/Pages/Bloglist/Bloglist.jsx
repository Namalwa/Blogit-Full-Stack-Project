import React from "react";
import { useQuery } from "react-query";
import BlogPreview from "../../components/BlogPreview/BlogPreview";
import { API_BASE } from "../../utils/apiBase";
import blogs from "../../Data/blogs"; 

function Bloglist() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/blogs`, { credentials: "include" });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <h2>Loading, please wait...</h2>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }


    const blogData = data || blogs;

    return (
        <div>
            {blogData && Array.isArray(blogData) ? (
                blogData.map((blog, i) => (
                    <BlogPreview
                        key={i}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        authorImgUrl={blog.authorImgUrl}
                        authorName={`${blog.user.firstname} ${blog.user.lastname}`}
                        id={blog.id} 
                    />
                ))
            ) : (
                <h2>No blogs available</h2>
            )}
        </div>
    );
}

export default Bloglist;
