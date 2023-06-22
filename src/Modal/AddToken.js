import React, { useState } from "react";
import "./Modal.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { addTokenService } from "../service/topTokenService";
import { toast } from "react-toastify";
const AddToken = (props) => {
  const [data, setData] = useState({
    name: "",
    address: "",
    symbol: "",
  });
  const [error, setError] = useState({});

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !data.address:
        setError({ address: "Token Address field is required!" });
        formData = false;
        break;
    }
    return formData;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      const obj = {
        address: data.address.replace(/\s+/g, ""),
      };

      const res = await addTokenService(obj);

      if (res.data.data) {
        toast.success(res?.data?.message);
        props.setShow(props.tokenPopupClose);
        setData({ address: "" });
        setError({ address: "" });
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "Something went wrong"
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Modal
      className="add-token-wrapper"
      show={props.show}
      onHide={props.tokenPopupClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="token-form">
          <Form.Control
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder=" Token Address"
          />
          <span style={{ color: "red" }}>{error.address}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddToken;
