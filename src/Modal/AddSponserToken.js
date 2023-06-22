import React, { useState } from "react";
import "./Modal.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { GiConsoleController } from "react-icons/gi";
import { addSponserService } from "../service/sponserService";
import { useNavigate } from "react-router-dom";
const AddSponserToken = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    address: "",
    symbol: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    const obj = {
      //   name: data.name,
      address: data.address,
      //   symbol: data.symbol,
    };

    const res = await addSponserService(obj);

    if (res) {
      props.setShow(props.tokenPopupClose);
    } else {
      console.log("error");
    }
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
export default AddSponserToken;