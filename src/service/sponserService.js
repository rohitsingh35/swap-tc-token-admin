import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../src/constant/environment";
const token = localStorage.getItem("token");

export const addSponserService = async (data) => {
  const headerData1 = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/admin/add/addSponserToken`,
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

export const getSponserToken = async () => {
  const headerData1 = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/admin/get/getSponserToken`,
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
