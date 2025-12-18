const token = localStorage.getItem("token");
import { Axios, backendConfig } from "../constants/mainContent";
const origin = backendConfig?.base;
export const helpingLogin = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/helping/login`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data 
  }
};
export const helpingRegister = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/helping/register`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};
export const helpingVerifyOtp = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/helping/verify-otp`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};
export const getProfile = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/getProfile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;  
  }
};


export const placeOrder = async (data) => {
  try {
    const response = await Axios.post(`${origin}/order/place-order`, data);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await Axios.post(`${origin}/order/verify-payment`, paymentData);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await Axios.get(`${origin}/order/user/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};


export const getOrderHistory = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/get-orders`, {
      headers
        : { Authorization: `Bearer ${token}` }
    });
    return response;
  } 
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const addAddress = async (data) => {
  try {
    const response = await Axios.post(`${origin}/helping/address/add`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};


export const getAddress = async (userId) => {
  try {
    const response = await Axios.get(`${origin}/helping/addresses/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;

  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await Axios.delete(`${origin}/helping/address/delete/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;

  } catch (error) {
    console.log(error);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};

export const updateAddress = async (addressId, data) => {
  try {
    const response = await Axios.put(`${origin}/helping/address/update/${addressId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;

  } catch (error) {
    console.log(error);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};



export const getDashboradData = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;

  } catch (error) {
    console.log(error);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};



export const getDashboardStats = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/dashboard-data`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};


export const userDetails = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/user-details`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;

  } catch (error) {
    console.log(error);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};
export const editProfile = async (data) => {
  try {
    const response = await Axios.put(
      `${origin}/helping/edit-profile`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data; // return only the JSON
  } catch (error) {
    console.error("Edit profile error:", error);
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const updateUserBank = async (data) => {
  try {
    const response = await Axios.put(`${origin}/helping/update-user`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Update user error:", error);
    return error.response?.data || { message: "Something went wrong" };
  }
};



export const changePassword = async (data) => {
  try {
    const response = await Axios.post(
      `${origin}/helping/change-helping-password`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data; // return only the JSON
  } catch (error) {
    console.error("Edit profile error:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const contactus = async (data) => {
  try {
    const response = await Axios.post(`${origin}/helping/contact-us`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const forgotPassword = async (data) => {
  try {
    const response = await Axios.post(`${origin}/helping/reset-helping-password`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // ✅ return only JSON
  } catch (err) {
    // ✅ Standardize error response
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
    };
  }
};

export const getContactQuery = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/get-query`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;

  } catch (error) {
    console.log(error);
  }
};

export const getMyDownlines = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/my-downlines`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Something went wrong" };
  }
};
export const geneologyStructure = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/genealogy-structure`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Something went wrong" };
  }
};


export const requestWithdrawal = async (data) => {
  try {
    const response = await Axios.post(`${origin}/helping/withdrawal-request`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getMyHelpingInvestments = async (bankName) => {
  try {
    const response = await Axios.get(
      `${origin}/helping/get-qrcode?bankName=${bankName}`,  
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
    };
  }
};


export const getAllHelpingQRCodes = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/getAll-QR`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
  catch (err) {
    return { success: false, message: err.response?.data?.message || "Something went wrong" };
  }

};

export const verifyHelpingPayment = async (data) => {
  try {
    const response = await Axios.post(`${origin}/helping/verify-payment`, data, {
      headers
        : { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
  catch (err) {
    return { success: false, message: err.response?.data?.message || "Something went wrong" };
  }
};
export const getMatchingIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-matching-income`, {
      headers

        : { Authorization: `Bearer ${token}` }
    });
    return response;
  }
  catch (error) {
    console.log(error);
  }
};

export const submitKyc = async (data) => {
  try {
    const response = await Axios.post(`${origin}/users/create-kyc`, data, {
      headers
        : { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
  catch (err) {
    return { success: false, message: err.response?.data?.message || "Something went wrong" };
  }
};

export const getKycDetails = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-kyc`, {
      headers
        : { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
  catch (err) {
    return { success: false, message: err.response?.data?.message || "Something went wrong" };
  }
};