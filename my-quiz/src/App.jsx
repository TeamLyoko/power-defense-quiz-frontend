
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import { jsQuizz } from "./questions";
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "./App.scss";
//import { jsQuizzGet } from "./questions";
import { useEffect } from "react";
//import { QUESTIONS_REST_API_URL } from "./variables";



function App() {
  return (
  <div className="main-app">
    <Router>
      <Routes>
        <Route exact path="/" element={<Loading />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Quiz" element={<Quiz questions={jsQuizz.questions} />} />
        {/* <Route exact path="/Quiz" element={<Quiz />} /> */}

      </Routes>
      
    </Router>
    
    
  </div>
  );
}

export default App
