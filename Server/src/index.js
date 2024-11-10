import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createBlog, fetchSingleBlog, fetchAllBlogs, getUserBlogs, deleteBlog, updateBlog} from './controllers/blogs.controllers.js';
import { registerUser } from './controllers/users.controllers.js';
import { logginUsers } from './controllers/auth.controllers.js';
import verifyToken from "./middleware/verifyToken.js";
import validateBlog from "./middleware/validateBlog.js";
import validateUserInformation from './middleware/validateUserInformation.js';

const app = express();


app.use(express.json());``
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true, 
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true 
}));

app.use(cookieParser());


app.post("/users", validateUserInformation, registerUser);
app.post("/auth/login", logginUsers);
app.post("/blogs", verifyToken, validateBlog, createBlog);
app.get("/blogs/user", verifyToken, getUserBlogs); 
app.get("/blogs/:id", verifyToken, fetchSingleBlog);
app.get("/blogs", fetchAllBlogs);
app.delete("/blogs/:blogId",  deleteBlog);
app.put("/blogs/:id",verifyToken ,validateBlog ,updateBlog)



app.listen(3000, () => console.log(`Server running on port 3000...`));

