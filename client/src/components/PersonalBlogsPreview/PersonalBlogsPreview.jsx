import React from "react";
import { useQuery } from 'react-query';
import PersonalBlogPreview from "../PersonalBlogPreview/PersonalBlogPreview";
import { Link } from "react-router-dom";
import { API_BASE } from "../../utils/apiBase";
import usePersonalBlogStore from "../../store/personalBlogStore";

function PersonalBlogsPreview() {
    const blogs = usePersonalBlogStore((state) => state.blogs);
    const setBlogs = usePersonalBlogStore((state) => state.setBlogs);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["personalBlogs"],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/blogs/user`, { credentials: "include" });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            console.log("Fetched Data:", data); 
            return data;
        },
        onSuccess: (data) => {
            setBlogs(data);
            console.log("Blogs state after setBlogs:", blogs);  
        }
    });

    if (isLoading) {
        return <h2>Loading, please wait...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    if (blogs.length <= 0) {
        return (
            <div>
                <h3>You don't have any blogs yet.{" "}
                    <Link to="/write">Click to create one.</Link>
                </h3>
            </div>
        );
    }

    return (
        <React.Fragment>
            <h2>Your Personal Blogs</h2>
            <div>
                {blogs.map((blog) => (
                    <PersonalBlogPreview
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        body={blog.body}
                    />
                ))}
            </div>
        </React.Fragment>
    );
}

export default PersonalBlogsPreview;

