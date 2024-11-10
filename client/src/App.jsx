import { BrowserRouter, Routes,  Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from "./components/Header/Header"; 
import Signup from "./Pages/Signup/Signup"; 
import Home from "./Pages/Home/Home"; 
import Login from "./Pages/Login/Login";
import Explore from "./Pages/Explore/Explore";
import Write from "./Pages/Write/Write";
import Articles from "./Pages/Articles/Articles";
import BlogDetail from "./Pages/BlogDetail/BlogDetail";
import Bloglist from "./Pages/Bloglist/Bloglist";
import Profile from "./Pages/Profile/Profile";
import Edit from "./Pages/Edit/Edit";
import MyBlogs from "./Pages/MyBlogs/MyBlogs";
import "./App.css";



const client = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={client}>
        <BrowserRouter>
            <Header />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/articles" element={<Articles/>}/>
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/bloglist" element={<Bloglist/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/myblogs" element={<MyBlogs/>}/>
            </Routes>
        </BrowserRouter>
        </QueryClientProvider> 
    );
}

export default App;
