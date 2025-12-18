import { Axios, backendConfig } from "../constants/mainContent";
const origin = backendConfig?.base;

export const addAddress = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/users/add-address`, payload);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getAddress = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-address`);
    return response;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const updateAddress = async (payload) => {
  try {
    const response = await Axios.put(`${origin}/users/update-address`, payload);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await Axios.delete(`${origin}/users/delete-address/${addressId}`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const setDefaultAddress = async (addressId) => {
  try {
    const response = await Axios.post(`${origin}/users/set-default-address`, { addressId });
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};
