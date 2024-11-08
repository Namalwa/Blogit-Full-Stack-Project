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

    return (
        <section className="header-container">
            <div className="logo-section" onClick={handleHomeClick}>
                <img src={Blogitlogo} alt="Blogit logo" className="logo" />
            </div>
            <nav className="navigation-container">
            <a href="#" className="explore" onClick={handleExploreClick}>Explore</a>
                <button className="login" onClick={handleLoginClick}>Login</button>
                <button className="signup" onClick={handleSignupClick}>Signup</button>
                
            </nav>
        </section>
    );
}

export default Header; 