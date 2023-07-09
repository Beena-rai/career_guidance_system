import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getAllExams } from "../api/exam";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import colorSharp from "../assets/img/color-sharp.png"
import { HashLink } from 'react-router-hash-link';
import { NavAll } from './NavAll';

const TestPanel = () => {
  const [exam, setExam] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const getExams = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        setExam(response.data);
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getExams();
  }, []);
  return (

    <section className="admin" id="admin">
      <NavAll />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <div>
                <h1 className="text-center mt-1">{`Hi, ${auth?.user?.firstName}`} </h1>
                <div class="d-flex align-items-end flex-column"><HashLink to='/'>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                  >
                    Back
                  </button>
                </HashLink></div>
                <Row gutter={[16, 16]}>
                  {exam.map((exams) => (
                    <Col span={6} key={exams._id}>

                      <div className="card card-lg flex flex-col gap-1 mt-3">

                        <h2 className="text-md">{exams?.name}</h2>
                        <span className="text-md">Category:{exams.category}</span>
                        <span className="text-md">Total Marks:{exams.totalMarks}</span>
                        <span className="text-md">Passing Marks:{exams.passingMarks}</span>

                      </div>
                      <button
                        className="btn btn-success mt-3"
                        onClick={() => navigate(`/student/testpanel/taketest/${exams._id}`)}
                      >
                        Start Exam
                      </button>
                    </Col>
                  ))}
                </Row>
              </div>

            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
};

export default TestPanel;
