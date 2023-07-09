import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../api/exam";
import Instructions from "./Instructions";
import { addReport } from "../api/reports";
import { useAuth } from "../context/authContext";
import colorSharp from "../assets/img/color-sharp.png";
import { NavAll } from './NavAll';
import { HashLink } from 'react-router-hash-link';



const TakeTest = () => {
  const [examsData, setExamData] = useState(null);
  const [view, setView] = useState("instructions");
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuesitonIndex, setSeletedQuesitonIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [result, setResult] = useState({});
  const [intervalId, setIntervalId] = useState(null);

  const params = useParams();
  const [auth, setAuth] = useAuth();
  const getExamData = async () => {
    try {
      const response = await getExamById(params.id);
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.duration);
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

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];
      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });
      let verdict = "Pass";
      if (correctAnswers.length < examsData.passingMarks) {
        verdict = "Fail";
      }
      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: auth?.user?._id,
      });
      if (response.success) {
        setView("result");
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const startTimer = () => {
    let totalSeconds = examsData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      }
      else {
        clearInterval(intervalId);
        setTimeUp(true);
      }
      setIntervalId(intervalId);
    }, 1000);
  };
  useEffect(() => {
    if (timeUp) {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  return (
    <section className="admin" id="admin">
      <NavAll />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <div>
                {examsData && <h1 className="text-center" style={{ fontSize: 50, color: "blue" }}>{examsData?.name}</h1>}
                {view === "instructions" && (
                  <div><Instructions
                    examsData={examsData}
                    setView={setView}
                    startTimer={startTimer}
                  />
                    <HashLink to='/student/testpanel'>
                      <button
                        type="button"
                        class="btn btn-outline-danger mt-4"
                      >
                        Back
                      </button>
                    </HashLink></div>
                )}
                {view === "questions" && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <h1 className="text-2xl" style={{ border: '4px solid blue', fontweight: 20, fontSize: 35, color: "black", backgroundColor: "#d9d1d0" }} >
                        {selectedQuesitonIndex + 1}:
                        {questions[selectedQuesitonIndex]?.name}
                      </h1>
                      <div className="timer" >
                        <span className="text-2xl" style={{ fontweight: 10, fontSize: 20, backgroundColor: "red" }}>{secondsLeft}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-items-center gap-4" style={{ border: '4px solid blue', fontSize: 50, color: "blue" }} >
                      {Object.keys(questions[selectedQuesitonIndex].options).map(
                        (option, index) => {
                          return (
                            <div
                              className={`flex gap-2 items-center ${selectedOptions[selectedQuesitonIndex] === option
                                  ? "selected-option"
                                  : "option"
                                }`}
                              key={index}
                              onClick={() => {
                                setSelectedOptions({
                                  ...selectedOptions,
                                  [selectedQuesitonIndex]: option,
                                });
                                console.log(selectedOptions);
                              }}
                            >
                              <h1 className="text-xl">
                                {option}:
                                {questions[selectedQuesitonIndex].options[option]}
                              </h1>
                            </div>
                          );
                        }
                      )}
                    </div>
                    {selectedQuesitonIndex > 0 && (
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setSeletedQuesitonIndex(selectedQuesitonIndex - 1);
                        }}
                      >
                        Previous
                      </button>
                    )}
                    {selectedQuesitonIndex < questions.length - 1 && (
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setSeletedQuesitonIndex(selectedQuesitonIndex + 1);
                        }}
                      >
                        Next
                      </button>
                    )}
                    {selectedQuesitonIndex === questions.length - 1 && (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setTimeUp(true);
                          clearInterval(intervalId);
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                )}
                {view === "result" && (

                  <div>
                    <div className="flex justify-center mt-2 result" style={{ border: '4px solid blue' }} >
                      <div className="flex flex-col">
                        <h1>Result:</h1>
                        <div className="marks mt-3" >
                          <h1 className="text-2xl">
                            Total Marks:{examsData.totalMarks}
                          </h1>
                          <h1 className="text-2xl">
                            Obtained Marks:{result.correctAnswers.length}
                          </h1>
                          <h1 className="text-2xl">
                            Wrong Answers:{result.wrongAnswers.length}
                          </h1>
                          <h1 className="text-2xl">
                            Verdict:{result.verdict}
                          </h1>
                        </div>

                      </div>

                    </div>
                    <HashLink to='/student/testpanel'>
                      <button
                        type="button"
                        class="btn btn-outline-danger mt-4"
                      >
                        Back
                      </button>
                    </HashLink>
                  </div>
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

export default TakeTest;
