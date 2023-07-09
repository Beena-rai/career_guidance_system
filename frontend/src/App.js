
import './App.css';
import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Career } from "./components/Careers";
import { Colleges } from "./components/Colleges";
import { Aboutus } from "./components/AboutUs";
import { Footer } from "./components/Footer";
import { Test } from "./components/Test";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Student from "./components/Student";
import PrivateRoute from "./components/Private";
import AdminRoute from "./components/AdminPrivate";
import Admin from "./components/Admin";
import AddTest from "./components/AddTest";
import AdminCollege from "./components/AdminCollege";
import Profile from "./components/Profile";
import TestAnalysis from "./components/TestAnalysis";
import SelectedCollege from "./components/SelectedCollege";
import CollegeSignUp from "./components/CollegeSignUp";
import CollegeSignIn from "./components/CollegeSignIn";
import CollegeRoute from "./components/CollegePrivate";
import CollegeDetails from "./components/CollegeDetails";
import UpdateCollegeDetails from "./components/UpdateCollegeDetails";
import DisplayCareer from "./components/DisplayCareer";
import UpdateCareer from "./components/UpdateCareer";
import CareerDetails from "./components/CareerDetails";
import TakeTest from "./components/TakeTest";
import TestMenu from "./components/TestMenu";
import TestPanel from "./components/TestPanel";
import HomeCollege from "./components/HomeCollege";
import DisplayCollegeDetails from "./components/DisplayCollegeDetails";
import ApproveCollege from "./components/ApproveCollege";
import AddCareer from "./components/AddCareer";
import DisplayCareerAll from "./components/DisplayCareerAll";


function App() {
  return (
      <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <React.Fragment>
          <NavBar />
          <Banner />
          <Test />
          <Career />
          <Colleges />
          <Aboutus />
          <Footer />
        </React.Fragment>} />
      <Route path="/login" element={<Login />} />
      <Route path="/career/:name" element={<CareerDetails />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/collegesignup" element={<CollegeSignUp />} />
      <Route path="/collegesignin" element={<CollegeSignIn />} />
      <Route path="/homecollege" element={<HomeCollege />} />
      <Route path="/displaycareerall" element={<DisplayCareerAll />} />
      <Route path="/displaycollegedetails/:name" element={<DisplayCollegeDetails />} />


      <Route path="/student/" element={<PrivateRoute />}>
        <Route path="" element={<Student />} />
        <Route path="profile" element={<Profile />} />
        <Route path="testanalysis" element={<TestAnalysis />} />
        <Route path="selectedcollege" element={<SelectedCollege />} />
        <Route path="testpanel" element={<TestPanel/>} />
        <Route path="testpanel/taketest/:id" element={<TakeTest/>} />
      </Route>


      <Route path="/collegedetails/" element={<CollegeRoute />}>
        <Route path=":name" element={<CollegeDetails />} />
        <Route path="update/:name" element={<UpdateCollegeDetails />} />
      </Route>


      <Route path="/adminPanel/" element={<AdminRoute />}>
        <Route path="" element={<Admin />} />
        <Route path="testmenu/addTest" element={<AddTest />} />
        <Route path="testmenu/addTest/edit/:id" element={<AddTest />} />
        <Route path="admincollege" element={<AdminCollege />} />
        <Route path="addcareer" element={<AddCareer />} />
        <Route path="displaycareer" element={<DisplayCareer />} />
        <Route path="displaycareer/:name" element={<UpdateCareer />} />
        <Route path="testmenu" element={<TestMenu />} />
        <Route path="admincollege/approvecollege" element={<ApproveCollege/>} />
      </Route>

    </Routes>
  </BrowserRouter>

    
  );
}

export default App;
