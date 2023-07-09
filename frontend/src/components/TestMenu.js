import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Table } from "antd";
import { deleteExamById, getAllExams } from "../api/exam";
import colorSharp from "../assets/img/color-sharp.png"
import { NavAdmin } from './NavAdmin';
import { HashLink } from 'react-router-hash-link';

const TestMenu = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const columns = [
    {
      title: "Test Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            class="btn btn-success"
            onClick={() => {
              navigate(`/adminPanel/testmenu/addTest/edit/${record._id}`);
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              deleteExam(record._id);
            }}
          >
            Delete
          </button>

        </div>
      ),
    },
  ];
  const deleteExam = async (id) => {
    try {
      
      const response = await deleteExamById(id);
      window.location.reload(true);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getExamsData = async () => {
    try {
      
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getExamsData();
  }, []);
  return (
    <section className="admin" id="admin">
      <NavAdmin />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
            <h1 className="text-center mt-1">Tests</h1>
              <div>
                <div className="flex justify-between mt-2 items-end">
               
                  <button
                    class="btn btn-primary"
                    onClick={() => navigate("/adminPanel/testmenu/addTest")}
                  >
                    <i className="ri-add-line"></i>
                    Add Exam
                  </button>
                </div>
                <Table columns={columns} dataSource={exams} />
                <HashLink  to='/adminPanel'>
                            <button
                              type="button"
                              class="btn btn-outline-danger"
                          
                            >
                             Back
                            </button>
                            </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>



  );
};

export default TestMenu;
