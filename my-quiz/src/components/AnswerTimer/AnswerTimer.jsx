import "./AnswerTimer.scss";
import { useEffect, useState, useRef } from "react";
import soundTimer from "../../assets/music/quis1.wav";

function AnswerTimer({duration, onTimeUp}){
    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((prev) => prev + 0.1); // incrementing the counter by 0.1 for each 100ms
            playTimerSound(counter);
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, []);

    const playTimerSound = (counter) => {
        if (counter === 0.1) {
            const audio = new Audio(soundTimer);
            audio.play();
            console.log("Timer sound is playing");
        }
        else {
            if ((counter - 0.2) === duration) {
                audio.pause();
                console.log("Timer sound is paused");
            }
        }

    };

    useEffect(() => {
        setProgressLoaded((counter / duration) * 100);

        if(counter >= duration - 0.1){  // 0.1 is due to counter balance the transition-time
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();
            }, 100); 
        }

    }, [counter]);

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