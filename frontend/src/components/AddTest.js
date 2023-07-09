import { Col, Form, message, Row, Select, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colorSharp from "../assets/img/color-sharp.png";
import { NavAdmin } from './NavAdmin';
import { Container, Tab, Nav } from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';
import PageTitle from "./PageTitle";
import {
  addExam,
  deleteQuestionById,
  editExamById,
  getExamById,
} from "../api/exam";

import QuestionModal from "./QuestionModal";

const AddTest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [examData, setExamData] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const getExamData = async () => {
    try {
      const response = await getExamById(params.id);
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.error);
      }
    } catch (error) {

      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) getExamData();
  }, []);


  const onFinish = async (values) => {
    console.log(values);
    try {
      let response;

      if (params.id) {
        response = await editExamById(params.id, values);
      } else {
        response = await addExam(values);
      }

      if (response.success) {
        message.success(response.message);
        navigate("/adminPanel/testmenu");
      } else {

        message.error(response.error);
      }
    } catch (error) { }
  };


  const deleteQuestion = async (questionId) => {
    try {
      const resposne = await deleteQuestionById(questionId, {
        examId: params.id,
      });

      if (resposne.success) {
        message.success(resposne.message);
        window.location.reload(true);
      } else {
        message.error(resposne.error);
      }
    } catch (error) { }
  };


  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key}:{record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return `${record.correctOption}:${record.options[record.correctOption]
          }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setSelectedQuestion(record);
              setShowQuestionModal(true);
            }}
          >
            edit
          </span>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          >
            delete
          </span>
        </div>
      ),
    },
  ];


  return (

    <section className="admin" id="admin">
      <NavAdmin />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <div>
                {params.id ? (
                  <h1 title="Edit Test" />
                ) : (
                  <h1 title="Add Test" />
                )}
                {(examData || !params.id) && (
                  <Form layout="vertical" onFinish={onFinish} initialValues={examData}>




                    <Tab.Container id="colleges-tabs" defaultActiveKey="first">
                      <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Test Details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Test Questions</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>

                        <Tab.Pane eventKey="first">
                          <Row gutter={[10, 10]}>
                            <Col span={8}>
                              <Form.Item label={<label style={{ color: "blue", fontSize: "16px" }}>Test Name</label>} name="name">
                                <input type="text" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item label={<label style={{ color: "blue", fontSize: "16px" }}>Test Duration</label>} name="duration">
                                <input type="number" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item label={<label style={{ color: "blue", fontSize: "16px" }}>Category</label>} name="category">
                                <select name="" id="">
                                  <option value="">Select Category</option>
                                  <option value="Math">Math</option>
                                  <option value="Reasoning">Reasoning</option>
                                  <option value="English">English</option>

                                </select>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item label={<label style={{ color: "blue", fontSize: "16px" }}>Total Marks</label>} name="totalMarks">
                                <input type="number" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item label={<label style={{ color: "blue", fontSize: "16px" }}>Qualifying Marks</label>} name="passingMarks">
                                <input type="number" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <div className="flex gap-2 justify-end ">
                            <button class="btn btn-success" type="submit">
                              Save
                            </button>

                            <HashLink to='/adminPanel/testmenu'>
                              <button
                                type="button"
                                class="btn btn-outline-danger"

                              >
                                Back
                              </button>
                            </HashLink>
                          </div>


                        </Tab.Pane>




                        <Tab.Pane eventKey="second">
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              class="btn btn-success"
                              onClick={() => {
                                setShowQuestionModal(true);
                              }}
                            >
                              Add Question
                            </button>
                            <HashLink to='/adminPanel/testmenu'>
                              <button
                                type="button"
                                class="btn btn-outline-danger"

                              >
                                Back
                              </button>
                            </HashLink>


                          </div>
                          <Table
                            columns={questionsColumns}
                            dataSource={examData?.questions}
                          ></Table>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>





                  </Form>
                )}


                {showQuestionModal && (
                  <QuestionModal
                    setShowQuestionModal={setShowQuestionModal}
                    showQuestionModal={showQuestionModal}
                    examId={params.id}
                    refreshData={getExamData}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>



  );
};

export default AddTest;
