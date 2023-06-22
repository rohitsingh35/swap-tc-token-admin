import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Button, Table } from "react-bootstrap";
import AddToken from "../Modal/AddToken";
import AddSponserToken from "../Modal/AddSponsertoken";
import { getSponserToken } from "../../src/service/sponserService";
import { useEffect } from "react";
const SponsorToken = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const tokenPopupClose = () => setShow(false);
  const tokenPopupShow = () => setShow(true);

  const getAllsponserToken = async () => {
    try {
      const res = await getSponserToken();

      setData(res);
    } catch (err) {
      return err.message;
    }
  };

  useEffect(() => {
    getAllsponserToken();
  }, [show]);

  return (
    <Layout>
      <div className="token-wrappr">
        <div className="token-btn">
          <h1>Sponsor Token List</h1>
          <Button onClick={tokenPopupShow}>Add Sponser Token</Button>
        </div>
        <div className="token-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Sponser Token Name</th>
                <th>Sponser Token Symbol</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.symbol}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <AddSponserToken
        show={show}
        tokenPopupClose={tokenPopupClose}
        setShow={setShow}
      />
    </Layout>
  );
};
export default SponsorToken;