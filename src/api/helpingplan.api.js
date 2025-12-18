import { Axios, backendConfig } from "../constants/mainContent";
const origin = backendConfig?.base;
//======================HELPING PLAN========================//

export const getHelpingPlan = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/plans`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const purchaseHelpingPlan = async (data) => {
  try {
    const response = await Axios.post(`${origin}/helping/purchase-plan`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getAllHelpingOrders = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/get-orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getHelpingReferrals = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/my-referrals`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};