import { BrowserRouter, Routes,  Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from "./components/Header/Header"; 
import Signup from "./Pages/Signup/Signup"; 
import Home from "./Pages/Home/Home"; 
import Login from "./Pages/Login/Login";
import Explore from "./Pages/Explore/Explore";
import Write from "./Pages/Write/Write";
<<<<<<< HEAD
=======
import Articles from "./Pages/Articles/Articles";
import BlogDetail from "./Pages/BlogDetail/BlogDetail";
>>>>>>> 5c94229 (creating a blog)
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
<<<<<<< HEAD
=======
            <Route path="/articles" element={<Articles/>}/>
            <Route path="/blog/:id" element={<BlogDetail />} />
>>>>>>> 5c94229 (creating a blog)
            </Routes>
        </BrowserRouter>
         </QueryClientProvider>
    );
}

export default App;
