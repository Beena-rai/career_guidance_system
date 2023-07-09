
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';

export const Career = () => {

  const [career, setCareer] = useState([]);
  

   //get all career
   const getAllCareer = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/career/getcareer`);
      if (data?.success) {
        setCareer(data?.careers);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting career");
    }
  };

  useEffect(() => {
      getAllCareer();
  }, []);

  

  return (
    <section className="career" id="career">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="text-center mt-5">Select Careers</h2><Link to="/displaycareerall" >More</Link>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                  <Tab.Container id="colleges-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Career</Nav.Link>
                      </Nav.Item>
                     
                    </Nav>
                    <Tab.Content>
                      {/* <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}></Tab.Content> */}
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            career?.map((p) => {
                              return (
                                <Col size={12} sm={6} md={4}>
                                  <div className="college-imgbx">
                                  <Link
                key={p._id}
                to={`/career/${p.name}`}
                className="detail-link"
              ><img
                      src={`${process.env.REACT_APP_BASE_URL}/api/career/careerphoto/${p._id}`}
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
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
