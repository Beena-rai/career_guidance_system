import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import { HashLink } from 'react-router-hash-link';
import toast, { Toaster } from "react-hot-toast";
import React from 'react';
import Login from './Login';
import { useAdd } from "../context/addContext";

import { useAuth } from "../context/authContext";
import { useCollegeAuth } from "../context/collegeauthContext";


export const NavBar = () => {
  const [add, setAdd] = useAdd();
  const [auth, setAuth] = useAuth();
  const [collegeAuth, setCollegeAuth] = useCollegeAuth();
  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const handleCollegeLogout = () => {
    setCollegeAuth({
      ...collegeAuth,
      college: null,
      token: "",
    });
    localStorage.removeItem("collegeAuth");
    toast.success("Logout Successfully");
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#test" className={activeLink === 'test' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('test')}>Take Test</Nav.Link>
            <Nav.Link href="#career" className={activeLink === 'career' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('career')}>Career</Nav.Link>
            <Nav.Link href="#college" className={activeLink === 'college' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('college')}>Colleges</Nav.Link>
            <Nav.Link href="#aboutus" className={activeLink === 'aboutus' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('aboutus')}>About Us</Nav.Link>
          </Nav>
          {auth.user ? (<>
            <span className="navbar-text">
              <HashLink to={`/${auth?.user?.role === 1 ? "adminPanel" : "student"
                }`}>
                {
                  auth?.user?.role === 1 ? (<><button className="vvd"><span>Admin</span></button></>) : (<>
                    <button className="vvd"><span>Student</span></button>
                  </>)
                }
              </HashLink>
            </span>

            <span className="navbar-text">
              <HashLink onClick={handleLogout} to='/'>
                <button className="vvd"><span>LogOut</span></button>
              </HashLink>
            </span>
          </>) : collegeAuth.college ? (<>
            <span className="navbar-text">
              <HashLink to={`/collegedetails/${collegeAuth?.college?.name}`}>
                <button className="vvd"><span>College</span></button>
              </HashLink>
            </span>
            <span className="navbar-text">
              <HashLink onClick={handleCollegeLogout} to='/'>
                <button className="vvd"><span>LogOut</span></button>
              </HashLink>
            </span>
          </>) : (<><span className="navbar-text">
            <HashLink to='/'>
              <button onClick={() => setShowMyModal(true)} className="vvd"><span>Login</span></button>
            </HashLink>
          </span></>)
          }
        </Navbar.Collapse>
      </Container>
      <Login onClose={handleOnClose} visible={showMyModal}></Login>
    </Navbar>
  )
}
