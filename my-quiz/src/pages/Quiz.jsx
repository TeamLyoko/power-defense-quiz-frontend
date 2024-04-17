import { useEffect, useState } from 'react';
import { resultInitialState } from '../variables';
import AnswerTimer from '../components/AnswerTimer/AnswerTimer';
import "../styles/Quiz.scss";
import Result from '../components/Result/Result';
import Feedback from '../components/Feedback/Feedback'; 
import CustomButton from '../components/CustomButton/CustomButton';
import { useLocation } from "react-router-dom";

//import { TIMER_DURATION, COIN_INCREMENT } from '../variables';
import VARIABLES from "../variables";

import soundClick from "../assets/music/click.wav";
import soundCorrect from "../assets/music/correctclick1.wav";
import soundWrong from "../assets/music/wronganswer1.wav";
//import RESULT_REST_API_URL from '../variables';




//const VARIABLES.COIN_INCREMENT = 5; // Define Coin Increment

const Quiz = ({ questions }) => {
//const Quiz = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("userName");

    const [questionsL, setQuestionsL] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(QUESTIONS_REST_API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            
            console.log("response:",response);
            setQuestionsL(data.questions);
            console.log("Questions:",questionsL);
            setLoaded(true);
            
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
    }, []);


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [results, setResults] = useState(resultInitialState);
    const [showResults, setShowResults] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);
    const [isEvaluated, setIsEvaluated] = useState(false); 
    const [isAnswered, setIsAnswered] = useState(false); 
    const [isChangeAble, setIsChangeAble] = useState(true);
    
    // if (!loaded) {
    //     return <div>Loading...</div>;
    // }
    console.log("Questions:",questions);
    const { question, choices, correctAnswer, generalFeedback, specificFeedback} = questions[currentQuestion];

    function playClick () {
        const audio = new Audio(soundClick);
        audio.play();
    }

    function playCorrect () {
        const audioc = new Audio(soundCorrect);
        audioc.play();
    }

    function playWrong () {
        const audiow = new Audio(soundWrong);
        audiow.play();
    }

    const onAnswerClick = (answer, index) => { // checking the answer
        console.log("Answer is clicked");
        playClick();
        console.log("Debugging => is Answer correct : ", isCorrect, ", showResults : ", showResults, ", showAnswerTimer : ", showAnswerTimer, ", isEvaluated : ", isEvaluated, ", isAnswered : ", isAnswered, ", isChangeAble : ", isChangeAble);
        if (isChangeAble){
            setAnswerIdx(index);
            setIsAnswered(true);
            if (answer === correctAnswer) {
                setIsCorrect(true);
                console.log("Correct");
            } else {
                setIsCorrect(false);
                console.log("Incorrect");
            }
        } else {
            setShowAnswerTimer(false);

        }
    };

    useEffect(() => {
        if (showResults) {

            const data = {
                username: userName,
                score: parseInt(results.coins)
            };
            console.log("Data:",data);
            console.log("Body:",JSON.stringify(data));
            console.log("Results:",results);
            fetch(VARIABLES.RESULT_REST_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [showResults]);

    const onClickCheck = (isAnswerRight, isQuestionEvaluated) => {
        setIsChangeAble(false);
        console.log(("Next or Check buttton is clicked"));
        console.log("Debugging => iscorrect : ", isCorrect, ", showResults : ", showResults, ", showAnswerTimer : ", showAnswerTimer, ", isEvaluated : ", isEvaluated, ", isAnswered : ", isAnswered, ", isChangeAble : ", isChangeAble);
        if (isQuestionEvaluated) { // Next buttom is clicked
            playClick();
            setAnswerIdx(null);
            setShowAnswerTimer(false);
            setResults((prev) => isAnswerRight ?
                { ...prev, coins: prev.coins + VARIABLES.COIN_INCREMENT, correctAnswers: prev.correctAnswers + 1 } :
                { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
            );
    
            if(currentQuestion !== questions.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
                console.log("Next question is {}", currentQuestion + 1);
            } else {
                setCurrentQuestion(0);
                setShowResults(true);
                console.log("Quiz finished");
            }
            
            setIsEvaluated(false);
            setIsAnswered(false);

            setTimeout(() => { // assyncronous call will execute after que execution
                setShowAnswerTimer(true);
                setIsChangeAble(true);
                console.log("Answer is changable : ", isChangeAble);
            
            })

        } else { // Check buttom is clicked
            if (isCorrect){
                playCorrect();
            } else {
                playWrong();
            }

            setShowAnswerTimer(false);
            setIsChangeAble(false);

            setTimeout(() => {
                setIsEvaluated(true);
            })
        }
    };

    const OnBacktoGame = () => {
        playClick();
        // Close the current window
        window.close();
        console.log("Back to game buttom is clicked");
        alert("Quiz is completed. Close the browser and proceed to Game.");
        
    };

    const handleTimeUp = () => {
        //alert("Time's up!");

        if (isAnswered) {
            setIsChangeAble(false);
            setIsEvaluated(false);
            setIsChangeAble(false);
            onClickCheck(isCorrect, isEvaluated);
            if (isCorrect){
                playCorrect();
            } else {
                playWrong();
            }

        } else{
            playWrong();
            setIsCorrect(false);
            onClickCheck(false, false);
            setIsChangeAble(false);
        }

    }

    return (
        <div className='question-box'>
            <div className="quiz-container">
                { !showResults ? (
                    <>
                    {showAnswerTimer && (
                        <AnswerTimer duration={VARIABLES.TIMER_DURATION} onTimeUp={handleTimeUp} />
                    )}
                    <span className="active-question-no">{currentQuestion + 1}</span>
                    <span className="total-question">/{questions.length}</span>
                    <h2>{question}</h2>
                    <ul>
                        {choices.map((answer, index) => (
                            <li 
                                onClick={() => onAnswerClick(answer, index)} 
                                key={answer}
                                className={(answerIdx === index ? ( isEvaluated ? ( isCorrect ? 'correct-answer' : 'incorrect-answer') : 'selected-answer' ) : null) || (answerIdx !== index && isEvaluated && answer === correctAnswer ? 'correct-answer' : null)}>
                                    {answer}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <>
                            {!showAnswerTimer && <Feedback generalFB={generalFeedback} specificFB={specificFeedback} answerIDX={answerIdx} isAnswered={isAnswered}/>}
                        </>
                    </div>
                    <div className="footer">
                        
                        <CustomButton 
                            onClick={() => onClickCheck(isCorrect, isEvaluated)} 
                            disabled={answerIdx === null && showAnswerTimer} 
                            label={ isEvaluated ? ( (currentQuestion + 1) === questions.length ? "Results" : "Next" ) : "Check" } 
                        />

                    </div>
                </>
                ) : (
                    <Result results={results} OnBacktoGame={OnBacktoGame} totalQuestions={questions.length}/>
                )}

            </div>
        </div>
    );
};

export default Quiz