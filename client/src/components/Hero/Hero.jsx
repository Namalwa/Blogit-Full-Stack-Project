import { useNavigate } from "react-router-dom";
import "./Hero.css"
import Heroimage from "../../assets/hero.jpg"

function Hero(){
    const navigate = useNavigate();

    const handleStartwriting = () => {
        navigate("/login");
    };
    return(
        <section className="hero-section">
            <img src={Heroimage} alt="writing" className="hero-image"/>
            <div className="dark-overlay"></div>
            <div className="hero-text">
                <h1 className="heading">Unleash Your Words: Write, Inspire, and Connect</h1> <br/>
                <h2 className="sub-heading">Your go-to blog for expert tips, inspiring stories, and essential tools to elevate your writing journey.</h2>
                <button className="start-reading-btn" onClick={handleStartwriting}>Start Writing</button>
                
            
            </div>
           
           

        </section>
    )
}
export default Hero;