import "../styles/Loading.scss";
import loadingImg from "../images/loading.jpg";
import { useEffect } from "react";
//import {ELIGIBILITY_REST_API_URL, QUESTIONS_REST_API_URL} from "../variables";
import VARIABLES from "../variables";
import { useState } from "react";

import { useLocation } from "react-router-dom";
import axios from "axios";
import Quiz from "./Quiz";

const Loading = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("userName");
    const password = searchParams.get("password");
    const [quisDownloaded, setQuisDownloaded] = useState(false);
    const [questionListData, setQuestionListData] = useState([]);
    const datatosend = {
        username: userName,
        password: password
    };

    useEffect(() => {
        
        async function fetchData() {
            try {
                console.log("Data to send:", datatosend);
                const response = await axios.post(VARIABLES.ELIGIBILITY_WITH_SEC_REST_API_URL, datatosend);
                console.log("Response:",response);
                const data = response.data;
                console.log("Data:",data);
                console.log("Data JWT:",data.jwt);
                const token = data.jwt;
                console.log("Token:",token);
                const completed = false; // Completion is checked in the Game

                
                console.log("Completed:",completed);


                // when ever the quisDownloaded is set to true, the page will be redirected to the Home page
                if (!completed) {

                    console.log("Moving to Home page");
                    window.location.href = `/Home?userName=${encodeURIComponent(userName)}&token=${encodeURIComponent(token)}`;
                } else {
                    console.log("User has already done the quiz");
                    alert("You have already done the quiz. You can't do it again.");
                    
                    // close the browser window
                    window.open('','_self').close();
                }

            } catch (error) {
                console.log(error);
            }
        }
    
        if (userName) {
            fetchData();
        }

    }, []);  // Run fetchData whenever userName changes

    useEffect(() => {
        if (quisDownloaded) {
            saveQuestionsToFile(questionListData);
        }
    }, [quisDownloaded, questionListData]);


    return (
        <div className="loading">
            {questionListData.length > 0 ? (
                <Quiz questions={questionListData} />
            ) : (
                <img src={loadingImg} className="loading-img" alt="Loading Image" />
            )}
        </div>
    );
};

export default Loading;