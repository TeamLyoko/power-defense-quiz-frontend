import "./AnswerTimer.scss";
import { useEffect, useState, useRef } from "react";
import soundTimer from "../../assets/music/quis1.mp3";
//import {BEGIN_VOLUME_LEVEL, END_VOLUME_LEVEL, MUSIC_FADE_OUT_DURATION} from "../../variables";
import VARIABLES from "../../variables";



function AnswerTimer({duration, onTimeUp}){
    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef(null);
    const audioRef = useRef(new Audio(soundTimer));

    useEffect(() => {
        audioRef.current.play();
        intervalRef.current = setInterval(() => {
            setCounter((prev) => prev + 0.1); // incrementing the counter by 0.1 for each 100ms
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, []); // Run effect only once on component mount

    useEffect(() => {
        setProgressLoaded((counter / duration) * 100);

        const volumeDecreaseRate = (VARIABLES.BEGIN_VOLUME_LEVEL - VARIABLES.END_VOLUME_LEVEL ) * 0.1 / VARIABLES.MUSIC_FADE_OUT_DURATION;
        const fadeOutStart = duration - VARIABLES.MUSIC_FADE_OUT_DURATION;

        if (counter >= fadeOutStart) {
            // Gradually decrease the volume towards the end
            audioRef.current.volume -= volumeDecreaseRate;
            //console.log("Volume level:", audioRef.current.volume);
        }

        if(counter >= duration - 0.1){  // 0.1 is due to counter balance the transition-time
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();
            }, 100); 
        }

    }, [counter]); // Run effect only when counter changes

    useEffect(() => {
        audioRef.current.volume = VARIABLES.BEGIN_VOLUME_LEVEL;
        console.log("Begin Volume level:", audioRef.current.volume);
        
        return () => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // Reset the audio to the beginning
        };
      }, []); // Run effect only once on component mount

    return <div className="answer-timer-container">
        <div
            style={{ 
                width: `${progressLoaded}%`, 
                backgroundColor: `${progressLoaded < 40 ? "lightgreen" : progressLoaded < 70 ? "orange" : "red"}`,
            }} 
            className="progress">

        </div>

    </div>;
}

export default AnswerTimer;