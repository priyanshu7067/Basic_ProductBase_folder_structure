import { Axios, backendConfig } from "../constants/mainContent";
const origin = backendConfig?.base;

export const fetchSElfIncentive = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-self-incentive`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const fetchSponsorIncentive = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-sponsor-incentive`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};


export const fetchSelfPerformance = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-self-performance`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const fetchSponsorPerformance = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-sponsor-performance`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};



export const fetchRoyalStarIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-royal-star`);
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const fetchRoyalReferralIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-royal-referral`);
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getRainbowIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/user-rainbow-income`);
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};
export const getForeverIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/user-forever-income`);    
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};
export const getRoyalIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/user-royal-income`);    
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getFeildOfficerIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/user-fieldOfficer-income`);    
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getuserRankIncome = async () => {
  try {
    const response = await Axios.get(`${origin}/users/user-rank-income`);    
    return response;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

// router.get("/income-history", helpingAuth, helpingController.getHelpingIncomeHistory);

export const getHelpingIncomeHistory = async () => {
  try {
    const response = await Axios.get(`${origin}/helping/income-history`);    
    return response.data;
  }
  catch (error) {
    console.log(error);
    return error.response?.data;
  }
};