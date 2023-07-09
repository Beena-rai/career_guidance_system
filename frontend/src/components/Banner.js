import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/contact-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import React from 'react';
import { useAuth } from "../context/authContext";

export const Banner = () => {
  const [auth, setAuth] = useAuth();
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Say Hello to Future You</span>
                  <h1>{`A Career Guidance Website`} <span className="wrap"></span></h1>
                  <p>Career guidance is a space of counselling that spotlights on assisting people with tracking down the right career pathway</p>
                  
                </div>}
              
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

    </section>
  )
}
