

import { Axios, backendConfig } from "../constants/mainContent";
const origin = backendConfig?.base;

export const payment = async (payload) => {
    try {
        const response = await Axios.post(`${origin}/users/create-order`, payload);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};



export const getWithdrawalAmount = async () => {
    try {
        const response = await Axios.get(`${origin}/users/get-withdrawal-amount`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};


export const requestWithdrawal = async (payload) => {
    try {
        const response = await Axios.post(`${origin}/users/withdrawal-request`, payload);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.response?.data;
    }
};


export const getWithdrawalRequests = async () => {
    try {
        const response = await Axios.get(`${origin}/users/get-withdrawal-requests`);
        return response;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};


export const getReferrals = async () => {
    try {
        const response = await Axios.get(`${origin}/helping/get-referrals`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};


export const getLevelIncome = async () => {
    try {
        const response = await Axios.get(`${origin}/users/get-level-income`);
        return response?.data;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};

export const getRankHistory = async () => {
    try {
        const response = await Axios.get(`${origin}/users/get-rank-history`);
        return response?.data;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};


export const getBonanzaHistory = async () => {
    try {
        const response = await Axios.get(`${origin}/users/get-bonanza-history`);
        return response?.data;
    }
    catch (error) {
        console.log(error);
        return error.response?.data;
    }
};


export const getInvestment = async () => {
    try {
        const response = await Axios.get(`${origin}/users/get-investment`);
        return response?.data;
    } catch (error) {
        console.log(error);
        return error.response?.data;
    }
};