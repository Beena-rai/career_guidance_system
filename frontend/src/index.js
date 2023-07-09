import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/authContext";
import { CollegeAuthProvider } from "./context/collegeauthContext";
import axios from 'axios';
import { AddProvider } from "./context/addContext";
import { SelectProvider } from "./context/selectContext";

axios.defaults.headers.post['Content-Type'] = 'application/json';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <CollegeAuthProvider >
    <AuthProvider>
        <AddProvider>
          <SelectProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </SelectProvider>
        </AddProvider>
    </AuthProvider>
  </CollegeAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
