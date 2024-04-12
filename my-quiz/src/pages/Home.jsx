import "../styles/Home.scss";
import { useState, useEffect } from "react";
import CustomButton from '../components/CustomButton/CustomButton';
import logoImg from "../images/logo-removebg.png";
import { Link } from "react-router-dom";
import { COIN_INCREMENT, TIMER_DURATION } from "../variables";
import soundIntro from "../assets/music/intro.wav";
import soundClick from "../assets/music/click.wav";

const Home = () => {
  const [isGuideOn, setIsGuideOn] = useState(false);
  const [bgMusic] = useState(new Audio(soundIntro));

  useEffect(() => {
    // Play background music when component mounts
    bgMusic.loop = true;
    console.log("Volume level:", bgMusic.volume); 
    bgMusic.play();
    console.log("Is music playing?", !bgMusic.paused);
    bgMusic.volume = 0.15;
    return () => bgMusic.pause(); // Pause music when component unmounts
  }, []); // Run effect only once on component mount

  const handleHelpClick = () => {
    // isGuideOn ? setIsGuideOn(false) : setIsGuideOn(true);
    setIsGuideOn(!isGuideOn);
    playClick();
    console.log("Help button is clicked");
    console.log({isGuideOn});
  }

  function playClick () {
    const audio = new Audio(soundClick);
    audio.play();
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
                <p>7. Click on the "Help" button to see the instructions again.</p>
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
            onClick={playClick()}
            disabled={isGuideOn}
          />
        </Link>
      </footer>
    </div>
  );
};

export default Home;