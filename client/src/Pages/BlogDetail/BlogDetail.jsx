import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { API_BASE } from "../../utils/apiBase"

function BlogDetail () {
    const { id } = useParams();

    const { data,isLoading, isError, error} =  useQuery({
        queryKey: [ "allBlogs"],
        queryFn: async () => {
           const response =  await fetch(`${API_BASE}/blogs/${id}`, { credentials: "include"})
        
           if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message)
           }

           const data = await response.json()
           return data;
        },
        
    })

    if (isLoading) {
        return(
            <h2>Loading please wait...</h2>
        )
    }

    if (isError) {
        return(
            <h2>{error.message}</h2>
        )
    }

    return( 
        <div>
            <h2>{data && data.title}</h2>
            <p>By {data && data.user.firstname} {data && data.user.lastname}</p>
            <p>Last updated: {new Date(data && data.updatedAt).toDateString()}</p>
            <p>{data && data.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: data && data.body }}></div>


        </div>
    )
}


export default BlogDetail;
