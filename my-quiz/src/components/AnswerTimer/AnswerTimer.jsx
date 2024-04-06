import "./AnswerTimer.scss";
import { useEffect, useState, useRef } from "react";

function AnswerTimer({duration, onTimeUp}){
    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((prev) => prev + 0.1); // incrementing the counter by 0.1 for each 100ms
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, []);

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