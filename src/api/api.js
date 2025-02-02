/* eslint-disable no-useless-catch */
// api.js

import axiosClient from "./axios"; // Import your Axios instance

export async function getRequest(URL) {
  try {
    const response = await axiosClient.get(URL);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for better handling in components
    console.log(error);
  }
}

export async function postRequest(URL, payload, queryParams = {}) {
  try {
    const query = new URLSearchParams(queryParams);
    const updatedURL = `${URL}?token=${query.toString()}`;

    const response = await axiosClient.post(updatedURL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postRequestNoToken(URL) {
  try {

    const response = await axiosClient.post(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postRequestJson(URL, payload) {
  try {
    const response = await axiosClient.post(URL, payload);
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}


export async function postRequestJsonwithHeader(URL, payload) {
  try {
    const token = localStorage.getItem("accessToken") || ""; // Retrieve token from localStorage or wherever it is stored

    const response = await axiosClient.post(
      URL,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function patchRequest(URL, payload, queryParams = {}) {
  try {
    const query = new URLSearchParams(queryParams);
    const updatedURL = `${URL}?token=${query.toString()}`;

    const response = await axiosClient.patch(updatedURL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function deleteRequest(URL) {
  try {
    const response = await axiosClient.delete(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}