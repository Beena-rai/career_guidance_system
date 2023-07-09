import { Form, message, Modal } from "antd";
import React from "react";
import {
  addQuestion,
  deleteQuestionById,
  editQuestionById,
} from "../api/exam";

const QuestionModal = ({
  setShowQuestionModal,
  showQuestionModal,
  examId,
  refreshData,
  selectedQuestion,
  setSelectedQuestion,
}) => {

  const onFinish = async (values) => {
    console.log(values);
    try {
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };

      let response;
      if (selectedQuestion) {
        response = await editQuestionById(selectedQuestion._id, {
          ...requiredPayload,
        });
      } else {
        response = await addQuestion(requiredPayload);
      }
      if (response.success) {

        message.success(response.message);
        refreshData();
        setShowQuestionModal(false);
      } else {
        message.error(response.error);
      }
      setSelectedQuestion(null);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title={selectedQuestion ? "Edit Question" : "Add Question"}
        open={showQuestionModal}
        footer={false}
        onCancel={() => {
          setShowQuestionModal(false);
          setSelectedQuestion(null);
        }}
      >
        <Form
          onFinish={onFinish}
          layout={"vertical"}
          initialValues={{
            name: selectedQuestion?.name,
            A: selectedQuestion?.options?.A,
            B: selectedQuestion?.options?.B,
            C: selectedQuestion?.options?.C,
            D: selectedQuestion?.options?.D,
            correctOption: selectedQuestion?.correctOption,
          }}
        >
          <Form.Item name="name" label="Question">
            <input type="text" />
          </Form.Item>
          <Form.Item name="correctOption" label="Correct Option">
            <input type="text" />
          </Form.Item>
          <div className="flex gap-3">
            <Form.Item name="A" label="Option A">
              <input type="text" />
            </Form.Item>
            <Form.Item name="B" label="Option B">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex gap-3">
            <Form.Item name="C" label="Option C">
              <input type="text" />
            </Form.Item>
            <Form.Item name="D" label="Option D">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-danger "
              onClick={() => {
                setShowQuestionModal(false);
              }}
            >
              Cancel
            </button>

            <button class="btn btn-success">Save</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionModal;
