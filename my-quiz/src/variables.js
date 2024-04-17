// FrontEnd parameters
const VARIABLES = {
    TIMER_DURATION : 10, // Define Time Duration
    COIN_INCREMENT : 5, // Define Coin Increment
    BEGIN_VOLUME_LEVEL : 0.7, // Define Begin Volume Level
    END_VOLUME_LEVEL : 0.1, // Define End Volume Level
    MUSIC_FADE_OUT_DURATION : 3, // Define Music Fade Out Duration

    // BackEnd parameters
    QUESTIONS_REST_API_URL : 'https://dummy.restapiexample.com/quiz/questionsWithFeedback', // Define Questions REST API URL
    ELIGIBILITY_REST_API_URL : 'http://localhost:8080/quiz/completed', // Define Eligibility REST API URL
    ELIGIBILITY_WITH_SEC_REST_API_URL : 'http://localhost:8080/quiz/authenticate', // Define Eligibility REST API URL
    RESULT_REST_API_URL : 'http://localhost:8080/quiz/marks/submit', // Define Result REST API URL

}



// export {    TIMER_DURATION, 
//             COIN_INCREMENT, 
//             BEGIN_VOLUME_LEVEL, 
//             END_VOLUME_LEVEL, 
//             MUSIC_FADE_OUT_DURATION,
//             QUESTIONS_REST_API_URL,
// };

export default VARIABLES;

export const resultInitialState = {
    coins: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
};