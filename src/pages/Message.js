import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Button, Card } from "react-bootstrap";
import AddMessage from "../Modal/AddMessage";
import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../constant/environment";
import moment from "moment";
const Messages = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const token = localStorage.getItem("token");
  const headerData1 = { Authorization: `Bearer ${token}` };

  const PopupClose = () => {
    setError({});
    setShow(false);
  };
  const PopupShow = () => setShow(true);

  const [massageData, setMassageData] = useState([]);

  useEffect(() => {
    getAllMessage();
  }, [show]);

  const getAllMessage = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/admin/get/getAllMessage`,
        {
          headers: headerData1,
        }
      );
      setMassageData(data.data);
    } catch (error) {
      console.log("error while fetching Finance Table ", error);
    }
  };

  return (
    <Layout>
      <div className="message-list-wrapper">
        <div className="message-heading">
          <h1>Message</h1>
          <Button onClick={PopupShow}>Add Message</Button>
        </div>
        <div className="message-list-box">
          <div className="ms-list">
            {massageData.map((user, index) => (
              <Card>
                <Card.Body>
                  <Card.Text>
                    <div className="message-box">
                      <p>{user.message}</p>
                      <div className="message-date">
                        <div className="date-field">
                          <label>Start Date</label>
                          <div className="Date">
                            {moment(user.date).format("Do MMM YY")}
                          </div>
                        </div>
                        <div className="date-field">
                          <label>End Date</label>
                          <div className="Date">
                            {moment(user.toDate).format("Do MMM YY")}
                          </div>
                        </div>
                      </div>
                      <div className="message-created">
                        <h3>
                          Created At:
                          {moment(user.createdAt).format("Do MMM YY")}
                        </h3>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AddMessage
        show={show}
        PopupClose={PopupClose}
        error={error}
        setShow={setShow}
        setError={setError}
      />
    </Layout>
  );
};
export default Messages;
