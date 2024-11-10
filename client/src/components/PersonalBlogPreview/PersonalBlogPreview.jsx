
import React from "react";
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { API_BASE } from "../../utils/apiBase";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import "./PersonalBlogPreview.css"; 

function PersonalBlogPreview({ id, title, excerpt, body }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const { isLoading, mutate } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_BASE}/blogs/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
        onSuccess: () => {
            toast("Blog deleted successfully", {
                theme: "toast-success",
                duration: 2000,
            });
            
            queryClient.invalidateQueries("personalBlogs");
        },
        onError: (error) => {
            toast(error.message, {
                theme: "toast-error",
                duration: 2000,
            });
        },
    });

    function handleDelete() {
        mutate(); 
    }

    function handleRedirectForEditing() {
        if (!id) return;
        navigate(`/edit/${id}`);
    }

    console.log("Rendering Blog Preview:", { id, title, excerpt, body });

    return (
        <div className="blog-preview">
            <h2>{title}</h2>
            <p>{excerpt}</p>
            <div className="blog-body" dangerouslySetInnerHTML={{ __html: body }} />

            <div className="actions">
                <button onClick={handleRedirectForEditing}>
                    <FaPen />
                    <span>Update</span>
                </button>
                <button disabled={isLoading} onClick={handleDelete}>
                    <FaTrash />
                    <span>{isLoading ? "Please wait..." : "Delete"}</span>
                </button>
            </div>
        </div>
    );
}

export default PersonalBlogPreview;

