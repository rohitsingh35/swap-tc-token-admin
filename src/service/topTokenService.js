import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../src/constant/environment";

export const addTokenService = async (data) => {
  const token = localStorage.getItem("token");

  const headerData1 = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/admin/add/address`,
      data,
      {
        headers: headerData1,
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      console.log("error");
    }
  } catch (e) {
    return e.message;
  }
};

export const getTopToken = async () => {
  const token = localStorage.getItem("token");

  const headerData1 = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/admin/get/tokenlistbyaddress`,
      {
        headers: headerData1,
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("error");
    }
  } catch (e) {
    return e.message;
  }
};
