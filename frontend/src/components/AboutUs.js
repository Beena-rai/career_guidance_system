
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/aboutus.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import React from 'react';
export const Aboutus = () => {


  return (
    <section className="aboutus" id="aboutus">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>

            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>

          </Col>
        </Row>
      </Container>
    </section>
  )
}