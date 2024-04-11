import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))//.render(<App />);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
//reportWebVitals();
