import { useState } from 'react';
import { resultInitialState } from '../../constants';
import AnswerTimer from '../AnswerTimer/AnswerTimer';
import "./Quiz.scss";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [results, setResults] = useState(resultInitialState);
    const [showResults, setShowResults] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);
    
    const { question, choices, correctAnswer, generalFeedback, specificFeedback} = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setIsCorrect(true);
            console.log("Correct");
        } else {
            setIsCorrect(false);
            console.log("Incorrect");
        }
    };

    const onClickNext = (isAnswerRight) => {
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

        setTimeout(() => {
            setShowAnswerTimer(true);
        
        })
    };

    const onTryAgain = () => {
        setResults(resultInitialState);
        setShowResults(false);
    };

    const handleTimeUp = () => {
        //alert("Time's up!");
        setIsCorrect(false);
        onClickNext(false);
    }

    return (
        <div className="quiz-container">
            { !showResults ? (
                <>
                {showAnswerTimer && (
                    <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
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
                <div className="footer">
                    <button onClick={() => onClickNext(isCorrect)} disabled={answerIdx === null}>
                        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </>
            ) : (
            <div className="result">
                <h3>Result</h3>
                <p>
                    Total Questions: <span>{questions.length}</span>
                </p>
                <p>
                    Total Score: <span>{results.score}</span>
                </p>
                <p>
                    Total Questions: <span>{results.correctAnswers}</span>
                </p>
                <p>
                    Total Questions: <span>{results.wrongAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Try again</button>
            </div>
            )}

        </div>
    );
};

export default Quiz