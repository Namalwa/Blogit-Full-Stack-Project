import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useQuery, useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from "../../utils/apiBase";
import './Edit.css';

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    
    const { data, isLoading: isFetching, isError } = useQuery(
        ["blog", id],
        async () => {
            const response = await fetch(`${API_BASE}/blogs/${id}`, {
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
        {
            onSuccess: (data) => {
                setTitle(data.title || '');
                setExcerpt(data.excerpt || '');
                setBody(data.body || '');
            }
        }
    );

    
    const { mutate, isLoading: isUpdating } = useMutation(
        async (updatedBlog) => {
            const response = await fetch(`${API_BASE}/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBlog),
                credentials: "include",
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
        {
            onSuccess: (data) => {
                navigate(`/blog/${data.id}`);
                toast.success("Blog updated successfully!", {
                    theme: "colored",
                });
            },
            onError: (error) => {
                toast.error(`Error: ${error.message}`, {
                    theme: "colored",
                });
            }
        }
    );

    
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'], 
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'], 
        ['blockquote', 'code-block']
    ];

    const modules = { toolbar: toolbarOptions };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !excerpt || !body) {
            toast.error('Please fill in all the required fields!');
            return;
        }
        mutate({ title, excerpt, body });
    };

    if (isFetching) return <h2>Loading, please wait...</h2>;
    if (isError) return <h2>Failed to load blog data. Please try again.</h2>;

    return (
        <div className="edit-page">
            <h1>Edit Your Story</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title (required):</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your title here"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="excerpt">Excerpt (required):</label>
                    <input
                        type="text"
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Enter excerpt here"
                        required
                    />
                </div>

                <div className='texteditor-container'>
                    <label htmlFor="body">Body (required):</label>
                    <ReactQuill
                        modules={modules}
                        theme="snow"
                        value={body}
                        onChange={setBody}
                        placeholder="Write your story here..."
                    />
                </div>

                <div className='button-section'>
                    <button type="submit" className='publish-button' disabled={isUpdating}>
                        {isUpdating ? "Please wait..." : "Update"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Edit;
