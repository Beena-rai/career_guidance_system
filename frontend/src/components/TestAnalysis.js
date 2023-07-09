import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { getAllReportsByUser } from "../api/reports";
import moment from "moment";
import { useAuth } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { NavStudent } from './NavStudent';
import colorSharp from "../assets/img/color-sharp.png";
import { HashLink } from 'react-router-hash-link';

const TestAnalysis = () => {
  const [reportsData, setReportsData] = useState([]);
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];

  const getData = async () => {
    try {
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
        // console.log(response.data[0].result);


      } else {
        message.error(response.error);
      }
    } catch (error) {
      return message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <section className="admin" id="admin">
      <NavStudent />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <div>
                <PageTitle title="Reports" />
                <Table columns={columns} dataSource={reportsData} />
                <HashLink to='/student'>
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

export default TestAnalysis;
