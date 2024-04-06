import './Feedback.scss';

const Feedback = ({generalFB, specificFB, answerIDX, isAnswered}) => {
    console.log("Answer is ", answerIDX);
    return (
        <div className="feedback">
            
            {isAnswered && (
                <>
                    <h3>Feedback</h3>
                    <p>{specificFB[answerIDX]}</p>
                </>
            )}
            <>   
                <h3>General Feedback</h3>
                <p>{generalFB}</p>
            </>
        </div>
    );
}

export default Feedback;