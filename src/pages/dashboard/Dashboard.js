import React from "react";
import Layout from "../../layout/Layout";
import "./Dashboard.scss";
import dsimg from "../../assets/img/bg.png";
function Dashboard() {
  return (
    <>
      <Layout>
        <div className="login2">
          <h2>Welcome!</h2>
          <img src={dsimg} alt="img" />
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
