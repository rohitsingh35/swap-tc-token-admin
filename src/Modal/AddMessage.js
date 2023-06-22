import React, { useState } from "react";
import "./Modal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addMessageService } from "../service/addMessage.service";

const FORM = {
  message: "",
};

const AddMessage = ({ show, PopupClose, setShow }) => {
  const startDate = new Date();
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [formState, setFormState] = useState(FORM);

  const inputChangeHandler = (e) => {
    setError({});
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState({});
  const isValid = () => {
    let formData = true;
    switch (true) {
      case !formState.message:
        setError({ message: "Message field is required!" });
        formData = false;
        break;
      case !startDateTime:
        setError({ startDateTime: "Start Date & Time is required!" });
        formData = false;
        break;
      case !endDateTime:
        setError({ endDateTime: "End Date & Time is required!" });
        formData = false;
        break;
      case startDateTime >= endDateTime:
        setError({
          endDateTime: "start date is less than end date & time is required!",
        });

        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  const addMessage = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const date = startDateTime;
      const toDate = endDateTime;
      const message = formState.message;
      const TOKEN = localStorage.getItem("token");
      try {
        const dataObj = {
          message,
          date,
          toDate,
          TOKEN,
        };

        const res = await addMessageService(dataObj);
        if (res.data.data) {
          setShow(PopupClose);
          toast.success(res?.data?.message);
        } else {
          toast.error(
            res?.data?.message ? res?.data?.message : "Something went wrong"
          );
        }
      } catch (error) {
        return toast.error(error?.message, { toastId: error?.message });
      }
    }
  };

  return (
    <Modal className="add-token-wrapper" show={show} onHide={PopupClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="token-form">
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Leave a message here"
              style={{ height: "100px" }}
              name="message"
              onChange={inputChangeHandler}
            />
            <span style={{ color: "red" }}>{error.message}</span>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <div className="selecttime-field">
              <DatePicker
                selected={startDateTime}
                onChange={(date) => setStartDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                timeCaption="Start Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                name="date"
              />
            </div>

            <span style={{ color: "red" }}>{error.startDateTime}</span>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <div className="selecttime-field">
              <DatePicker
                selected={endDateTime}
                onChange={(date) => setEndDateTime(date)}
                showTimeSelect
                timeIntervals={10}
                timeCaption="End Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="endDate"
                minDate={startDate}
                name="toDate"
              />
            </div>
            <span style={{ color: "red" }}>{error.endDateTime}</span>
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={addMessage}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddMessage;
