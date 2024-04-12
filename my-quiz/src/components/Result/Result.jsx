import './Result.scss';

const Result = ({totalQuestions, results, onTryAgain}) => {

    return(
        <div className="result">
            <h3>Result</h3>
            <p>
                Total Questions: <span>{totalQuestions}</span>
            </p>
            <p>
                Total Coins: <span>{results.coins}</span>
            </p>
            <p>
                Correct Questions: <span>{results.correctAnswers}</span>
            </p>
            <p>
                Incorrect Questions: <span>{results.wrongAnswers}</span>
            </p>
            <button onClick={onTryAgain}>Try again</button>
        </div>
    );
}

export default Result;