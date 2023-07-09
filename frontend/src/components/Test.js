

import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/test.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { HashLink } from 'react-router-hash-link';
export const Test = () => {
  return (
    <section className="test" id="test">
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
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Need Counselling?</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                  <div className="taketest">
                    <HashLink to='/student/testpanel'>
                      <Button variant="primary" size="lg">
                        Take Test
                      </Button>
                    </HashLink>
                  </div>
                </div>}
            </TrackVisibility>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

