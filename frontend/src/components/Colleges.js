import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import React from 'react';
import { Link } from "react-router-dom";
import { useAdd } from "../context/addContext";

export const Colleges = () => {
  const [add, setAdd] = useAdd();
  return (
    <section className="college" id="college">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="text-center mt-5">Select Colleges</h2><Link to="/homecollege" >More</Link>
                  <Tab.Container id="colleges-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Colleges</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            add?.map((p) => {
                              return (
                                <Col size={12} sm={6} md={4}>
                                  <div className="college-imgbx">
                                    <Link
                                      key={p._id}
                                      to={`/displaycollegedetails/${p.name}`}
                                      className="detail-link"
                                    ><img
                                        src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                      />
                                      <div className="college-txtx">
                                        <h4 >{p.name}</h4>

                                      </div>
                                    </Link>
                                  </div>
                                </Col>
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
