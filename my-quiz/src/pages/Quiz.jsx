
import "../styles/Quiz.scss";

import { useEffect, useState } from 'react';
import { resultInitialState } from '../variables';
import { useLocation } from "react-router-dom";

import axios from "axios";
import VARIABLES from "../variables";

import AnswerTimer from '../components/AnswerTimer/AnswerTimer';
import Result from '../components/Result/Result';
import Feedback from '../components/Feedback/Feedback'; 
import CustomButton from '../components/CustomButton/CustomButton';

import soundClick from "../assets/music/click.wav";
import soundCorrect from "../assets/music/correctclick1.wav";
import soundWrong from "../assets/music/wronganswer1.wav";


const Quiz = ({ questions }) => {
//const Quiz = () => {

    // Obtaining the username and token from the URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("userName");
    const token = searchParams.get("token");

    // Defining the state variables
    const [questionsL, setQuestionsL] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [results, setResults] = useState(resultInitialState);
    const [showResults, setShowResults] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);
    const [isEvaluated, setIsEvaluated] = useState(false); 
    const [isAnswered, setIsAnswered] = useState(false); 
    const [isChangeAble, setIsChangeAble] = useState(true);


    useEffect(() => {
        // Fetching the questions from the server
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

    // To be improved when the questions are fetched from the server
    // if (!loaded) {
    //     return <div>Loading...</div>;
    // }

    // Variables from question list
    console.log("Questions:",questions);
    const { question, choices, correctAnswer, generalFeedback, specificFeedback} = questions[currentQuestion];


    function playClick () {
        // Function to play the click sound
        const audio = new Audio(soundClick);
        audio.play();
    }

    function playCorrect () {
        // Function to play the correct answer sound
        const audioc = new Audio(soundCorrect);
        audioc.play();
    }

    function playWrong () {
        // Function to play the wrong answer sound
        const audiow = new Audio(soundWrong);
        audiow.play();
    }


    const onAnswerClick = (answer, index) => {
        // Function to handle the answer click
        console.log("Answer is clicked");
        playClick();
        console.log("Debugging => is Answer correct : ", isCorrect, ", showResults : ", showResults, ", showAnswerTimer : ", showAnswerTimer, ", isEvaluated : ", isEvaluated, ", isAnswered : ", isAnswered, ", isChangeAble : ", isChangeAble);
        
        if (isChangeAble){
            // Answer is clicked before the time is up
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
            // Answer is clicked after the time is up
            setShowAnswerTimer(false);
        }
    };


    useEffect(() => {
        if (showResults) {
            // Quis is ended and the results are shown
            const postdata = {
                username: userName,
                score: parseInt(results.coins)
            };
            console.log("Data:",postdata);
            console.log("Body:",JSON.stringify(postdata));
            console.log("Results:",results);

            // Defining the headers
            const headers = {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'Authorization': 'Bearer ' + token  
            };

            // Sending the results to the server
            axios.post(VARIABLES.RESULT_REST_API_URL, postdata, {headers})
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [showResults]); // Run effect only when showResults changes


    const onClickCheck = (isAnswerRight, isQuestionEvaluated) => {
        // Function to handle the Check or Next button click
        setIsChangeAble(false); // Answer is not changeable after the Check button is clicked
        console.log(("Next or Check buttton is clicked"));
        console.log("Debugging => iscorrect : ", isCorrect, ", showResults : ", showResults, ", showAnswerTimer : ", showAnswerTimer, ", isEvaluated : ", isEvaluated, ", isAnswered : ", isAnswered, ", isChangeAble : ", isChangeAble);
        
        if (isQuestionEvaluated) { 
            // Next buttom is clicked
            playClick();
            setAnswerIdx(null);
            setShowAnswerTimer(false);

            // Update the results
            setResults((prev) => isAnswerRight ?
                { ...prev, coins: prev.coins + VARIABLES.COIN_INCREMENT, correctAnswers: prev.correctAnswers + 1 } :
                { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
            );
    
            // Go to the next question or show the results
            if(currentQuestion !== questions.length - 1) {
                // Go to the next question
                setCurrentQuestion((prev) => prev + 1);
                console.log("Next question is {}", currentQuestion + 1);
            } else {
                // Show the results
                setCurrentQuestion(0);
                setShowResults(true);
                console.log("Quiz finished");
            }
            
            // Setting up variables for the next question
            setIsEvaluated(false);
            setIsAnswered(false);
            setTimeout(() => { // assyncronous call will execute after above execution
                setShowAnswerTimer(true);
                setIsChangeAble(true);
                console.log("Answer is changable : ", isChangeAble);
            })

        } else { 
            // Check buttom is clicked

            // Play the correct or wrong sound
            if (isCorrect){
                playCorrect();
            } else {
                playWrong();
            }

            // Setting up variables for the evaluation
            setShowAnswerTimer(false);
            setIsChangeAble(false);
            setTimeout(() => {
                setIsEvaluated(true);
            })
        }
    };


    const OnBacktoGame = () => {
        // Function to handle the Back to Game button click
        playClick();

        // Close the current window
        window.close();
        console.log("Back to game buttom is clicked");
        alert("Quiz is completed. Close the browser and proceed to Game.");
        
    };


    const handleTimeUp = () => {
        // Function to handle the time up event
        if (isAnswered) {
            // Hanfle time up after the answer is clicked
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
            // Handle time up before the answer is clicked
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