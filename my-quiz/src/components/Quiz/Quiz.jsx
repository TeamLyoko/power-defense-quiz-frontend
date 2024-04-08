import { useState } from 'react';
import { resultInitialState } from '../../constants';
import AnswerTimer from '../AnswerTimer/AnswerTimer';
import "./Quiz.scss";
import Result from '../Result/Result';
import Feedback from '../Feedback/Feedback';

const TIMER_DURATION = 10; // Define Time Duration

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [results, setResults] = useState(resultInitialState);
    const [showResults, setShowResults] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);
    const [isEvaluated, setIsEvaluated] = useState(false); 
    const [isAnswered, setIsAnswered] = useState(false); 
    const [isChangeAble, setIsChangeAble] = useState(true);
    
    const { question, choices, correctAnswer, generalFeedback, specificFeedback} = questions[currentQuestion];

    const onAnswerClick = (answer, index) => { // checking the answer
        console.log("Answer is clicked");
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

    const onClickCheck = (isAnswerRight, isQuestionEvaluated) => {
        setIsChangeAble(false);
        console.log(("Next or Check buttton is clicked"));
        console.log("Debugging => iscorrect : ", isCorrect, ", showResults : ", showResults, ", showAnswerTimer : ", showAnswerTimer, ", isEvaluated : ", isEvaluated, ", isAnswered : ", isAnswered, ", isChangeAble : ", isChangeAble);
        if (isQuestionEvaluated) { // Next buttom is clicked
            setAnswerIdx(null);
            setShowAnswerTimer(false);
            setResults((prev) => isAnswerRight ?
                { ...prev, score: prev.score + 5, correctAnswers: prev.correctAnswers + 1 } :
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
            setShowAnswerTimer(false);
            setIsChangeAble(false);

            setTimeout(() => {
                setIsEvaluated(true);
            })
        }
    };

    const onTryAgain = () => {
        setResults(resultInitialState);
        setShowResults(false);
        isChangeAble(true);
        isAnswered(false);
        isEvaluated(false);
        setShowAnswerTimer(true);
        console.log("Try again buttom is clicked");
        console.log("Debugging => is Answer correct : ", isCorrect, ", showResults : ", showResults, ", showAnswerTimer : ", showAnswerTimer, ", isEvaluated : ", isEvaluated, ", isAnswered : ", isAnswered, ", isChangeAble : ", isChangeAble);
        
    };

    const handleTimeUp = () => {
        //alert("Time's up!");
        setIsCorrect(false);
        onClickCheck(false, false);
        isChangeAble(false);
    }

    return (
        <div className="quiz-container">
            { !showResults ? (
                <>
                {showAnswerTimer && (
                    <AnswerTimer duration={TIMER_DURATION} onTimeUp={handleTimeUp} />
                )}
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {choices.map((answer, index) => (
                        <li 
                            onClick={() => onAnswerClick(answer, index)} 
                            key={answer}
                            className={answerIdx === index ? 'selected-answer' : null}>
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
                    <button onClick={() => onClickCheck(isCorrect, isEvaluated)} disabled={answerIdx === null && showAnswerTimer}>
                        { isEvaluated ? "Next" : "Check" }
                    </button>
                </div>
            </>
            ) : (
                <Result results={results} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
            )}

        </div>
    );
};

export default Quiz