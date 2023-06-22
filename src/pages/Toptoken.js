import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Button, Table } from "react-bootstrap";
import AddToken from "../Modal/AddToken";
import { getTopToken } from "../service/topTokenService";
import Loader from "../constant/loader";
const TopToken = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const tokenPopupClose = () => setShow(false);
  const tokenPopupShow = () => setShow(true);

  const getAllsponserToken = async () => {
    try {
      const res = await getTopToken();

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
          <h1>Top Token List</h1>
          <Button onClick={tokenPopupShow}>Add Token</Button>
        </div>
        <div className="token-list">
          <Table striped bordered hover>
            {data?.length > 0 ? (
              <>
                <thead>
                  <th>#</th>
                  <th>Token Name</th>
                  <th>Token Address</th>
                  <th>Token Symbol</th>
                </thead>
                <tbody>
                  {" "}
                  {data.map((val, index) => {
                    return (
                      <tr key={val._id}>
                        <td>{index + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.tokenAdress}</td>
                        <td>{val.symbol}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            ) : (
              <Loader />
            )}
          </Table>
        </div>
      </div>
      <AddToken
        show={show}
        tokenPopupClose={tokenPopupClose}
        setShow={setShow}
      />
    </Layout>
  );
};
export default TopToken;