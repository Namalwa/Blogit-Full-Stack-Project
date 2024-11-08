import { useNavigate } from "react-router-dom";
import "./Header.css";
import Blogitlogo from "../../assets/blogit logo.png";

function Header() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleSignupClick = () => {
        navigate("/signup");
    };

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleExploreClick = () => {
        navigate("/explore");
    }

    const handleWriteClick = () => {
        navigate("/write");
    }

    
    const handleArticlesClick = () => {
        navigate("/articles");
    }

    const handleBloglistClick = () => {
        navigate("/bloglist");
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleMyBlogsClick = () => {
        navigate("/myblogs");
    }
    return (
        <section className="header-container">
            <div className="logo-section" onClick={handleHomeClick}>
                <img src={Blogitlogo} alt="Blogit logo" className="logo" />
            </div>
            <nav className="navigation-container">
            <a href="#" className="home" onClick={handleHomeClick}></a>
            <a href="#" className="explore" onClick={handleMyBlogsClick}>My Blogs</a>
            <a href="#" className="explore" onClick={handleProfileClick}>My Profile</a>
            <a href="#" className="explore" onClick={handleBloglistClick}>Bloglist</a>
            <a href="#" className="explore" onClick={handleArticlesClick}>Articles</a>
            <a href="#" className="explore" onClick={handleWriteClick}>Write</a>
            <a href="#" className="explore" onClick={handleExploreClick}>Explore</a>
                <button className="login" onClick={handleLoginClick}>Login</button>
                <button className="signup" onClick={handleSignupClick}>Signup</button>
                
            </nav>
        </section>
    );
}

export default Header; 