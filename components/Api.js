import axios from "axios";
import { readData } from "../util/Util";
import Configs from "../configs/Configs";

export const get = async (endpoint) => {
  try {
    let response = await axios.get(`${Configs.BASE_URL}/${endpoint}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (endpoint) => {
  try {
    let response = await axios.post(`${Configs.BASE_URL}/${endpoint}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getWithToken = async (endpoint) => {
  try {
    const token = await readData("token");
    // console.log(
    //   token,
    //   "===================================",
    //   `${Configs.BASE_URL}/${endpoint}`
    // );
    let response = await axios.get(`${Configs.BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    // console.log(data, "[[[[[[[[[[[[[[[[[");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const postWithToken = async (endpoint, data, token) => {
  try {
    axios
      .post(`${Configs.BASE_URL}/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postFormData = async (endpoint, formData) => {
  try {
    return await axios
      .post(`${Configs.BASE_URL}/${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    throw new Error(error.message);
  }
};
export const postFormDataToken = async (endpoint, formData) => {
  const token = await readData("token");
  try {
    return await axios
      .post(`${Configs.BASE_URL}/${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(
        //   res.data,
        //   "res.datares.datares.datares.datares.datares.data"
        // );
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  } catch (error) {
    console.log(error.response);
    throw new Error(error.message);
  }
};

// export const putFormData = async (endpoint, formData) => {
//   const user_data = await readData("user_data");
//   const token = user_data?.token;
//   const params = new URLSearchParams(formData);
//   try {
//     let res = await axios.put(`${Configs.BASE_URL}/${endpoint}`, params.toString(), {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });
//     return res;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
