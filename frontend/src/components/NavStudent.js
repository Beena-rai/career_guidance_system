import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import { HashLink } from 'react-router-hash-link';
import toast, { Toaster } from "react-hot-toast";
import React from 'react';
import Login from './Login';

import { useAuth } from "../context/authContext";
export const NavStudent = () => {
  const [auth, setAuth] = useAuth();
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
            <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="/student/profile" className={activeLink === 'profile' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('profile')}>Profile</Nav.Link>
            <Nav.Link href="/student/testanalysis" className={activeLink === 'testanalysis' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('testanalysis')}>Test Analysis</Nav.Link>
            <Nav.Link href="/student/selectedcollege" className={activeLink === 'selectedcollege' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('selectedcollege')}>Selected Colleges</Nav.Link>
          </Nav>
          {
            !auth.user ? (<><span className="navbar-text">
              <HashLink to='/'>
                <button onClick={() => setShowMyModal(true)} className="vvd"><span>Login</span></button>
              </HashLink>
            </span></>) : (<>
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
            </>)
          }
        </Navbar.Collapse>
      </Container>
      <Login onClose={handleOnClose} visible={showMyModal}></Login>
    </Navbar>
  )
}
