
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import { jsQuizz } from "./questions";
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "./App.scss";

function App() {
  return (
  <div className="main-app">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Quiz" element={<Quiz questions={jsQuizz.questions} />} />
      </Routes>
      
    </Router>
    
    
  </div>
  );
}

export default App
