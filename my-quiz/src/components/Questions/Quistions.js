import React from "react";
import QuestionService from "../../services/QuestionService";

class Questions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        };
    }

    componentDidMount() {
        QuestionService.getQuestions().then((response) => {
            this.setState({ questions: response.data });
        });
    }

    
}

export default Questions;