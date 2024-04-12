import "../styles/Home.scss";
import { useState } from "react";
import CustomButton from '../components/CustomButton/CustomButton';
import logoImg from "../images/logo-removebg.png";
import { Link } from "react-router-dom";
import { COIN_INCREMENT, TIMER_DURATION } from "../variables";

const Home = () => {
  const [isGuideOn, setIsGuideOn] = useState(false);

  const handleHelpClick = () => {
    // isGuideOn ? setIsGuideOn(false) : setIsGuideOn(true);
    setIsGuideOn(!isGuideOn);
    console.log("Help button is clicked");
    console.log({isGuideOn});
  }

  return (
    <div className="home">
      <div className="home-center">
        { isGuideOn ? (
          <>
            <div className="guide-box">
              <h2>How to Play</h2>
              <div className="home-para-container">
                <p>1. Read the question carefully.</p>
                <p>2. Choose the correct answer from the options provided.</p>
                <p>3. Click on the "Check" button to check your answer.</p>
                <p>4. Click on the "Next" button to move to the next question.</p>
                <p>5. Click on the "Start" button to start the quiz.</p>
                <p>7. Click on the "Guide" button to see the instructions again.</p>
                <p>8. Once you start answering you can't go back.</p>
                <p>9. There are 10 MCQ questions, each correct answer will get {COIN_INCREMENT} coins.</p>
                <p>10. You have to answer for each question with in {TIMER_DURATION} seconds.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <img className="logo-img" src={logoImg} alt="logo-image" />
            <h1>QUIZ</h1>
          </>
        )}
      </div>
      <footer className="home-footer">
        <CustomButton width="10vw" height="8vh" fontSize="4vh" fontWeight="bold"
          onClick={handleHelpClick} 
          label={isGuideOn ? "Back" : "Help"}  
        />
        <Link to="/Quiz" style={{textDecoration: "none"}}>
          <CustomButton width="10vw" height="8vh" fontSize="4vh" fontWeight="bold"
            label="Start" 
            disabled={isGuideOn}
          />
        </Link>
      </footer>
    </div>
  );
};

export default Home;