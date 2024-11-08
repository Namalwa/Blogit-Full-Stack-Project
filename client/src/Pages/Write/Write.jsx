import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import { useMutation } from 'react-query'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from "../../utils/apiBase"
import './Write.css';

const Write = () => {
    
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: async (blog) => {
            const response = await fetch(`${API_BASE}/blogs`, {
                method: "POST",
                body: JSON.stringify(blog),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });
            if (response.ok === false) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const data = await response.json();
            return data;
        },
        onSuccess: (data)=> {
            navigate(`/blog/${data.id}`)
            toast("Blog written successfully", {
                theme: "toast-success",
                duration: 2000,
            })
            
        },

        onError: (error) => {
            toast(error.message, {
                theme: "toast-error",
                duration: 2000,
            })
        }
    });
    
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'], 
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'], 
        ['blockquote', 'code-block'] 
    ];

    const modules = {
        toolbar: toolbarOptions,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !excerpt || !body ) {
            toast.error('Please fill in all the required fields!');
            return;
        }
        const newBlogPost = {
            title,
            excerpt,
            body
        };
        mutate(newBlogPost);

        console.log('New Blog Post:', newBlogPost);
        toast.success('Blog post submitted successfully!');
    
        setTitle('');
        setExcerpt('');
        setBody('');
    };

    return (
        <div className="write-page">
            <h1>This is where creators bring their stories to life.</h1>
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
                    <button type="submit" className='publish-button' disabled={isLoading}>
                        
                        {
                            isLoading ? "please wait.." : "Publish"
                        }
                </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Write;
