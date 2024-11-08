import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBlog(req, res) {
    try {
        const { title, excerpt, body } = req.body;
        const userId = req.userId;
        
        const newBlog = await prisma.blogPost.create({
            data: {
                title,
                excerpt,
                body,
                owner: userId,
            },
        });

        res.status(201).json(newBlog);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
}

 export async function fetchSingleBlog (req, res){
    try{
        const {id} = req.params;
        const blog = await prisma.blogPost.findFirst({
            where: { id },
            include: {
                user: true
            }

        })
        if(!blog) {
            res.status(404).json({message: "blog not found"})
            return;
        }
        res.status(201).json(blog)
    } catch(e) {
        res.status(500).json({ message: "Something went wrong please try again later"})
    }

}


export async function fetchAllBlogs (req, res) {
    try {
        const blogs = await prisma.blogPost.findMany({
            include: {
                user: true,  
            },
        });

        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }

       
        res.status(200).json(blogs);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Something went wrong, please try again later" });
    }
}

 export async function getUserBlogs(req, res) {
    try {
       const userId = req.userId;
       const blogs = await prisma.blogPost.findMany({
        where: {
            owner: userId
        }
       })
       res.status(200).json(blogs)
    } catch(e) {
        res.status(400).json({message: "Something went wrong please try again later"})
    }
}

export async  function deleteBlog(req, res) {
    try{
        const { blogId } = req.params;
        const userId = req.userId;
        await prisma.blogPost.delete({
            where: {
                id : blogId,
                owner: userId
            }
        })

        res.status(200).json({ message: "blogs deleted successfully"})

    } catch(e) {
        console.log(e.message)
        res.status(500).json({ message: "Something went wrong please try again later"})
    }

}



