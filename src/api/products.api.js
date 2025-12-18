import { Axios , backendConfig} from "../constants/mainContent";
const origin = backendConfig?.base;
export const getAllProducts = async () => {
  try {
    const response = await Axios.get(`${origin}/users/products`);
    return response;
  } catch (error) {
    console.log(error);
    return error?.response?.data;

  }
};
export const getSingleProductDetails = async (id) => {
  try {
    const response = await Axios.get(`${origin}/users/product/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const addtoCart = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/users/add-to-cart`, payload);
    return response.data; 
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const getCarts = async () => {
  try {
    const response = await Axios.get(`${origin}/users/get-cart`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const removeCartProduct = async (productId) => {
  try {
    const response = await Axios.delete(`${origin}/users/remove-from-cart`, {
      data: { productId }, 
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const updateCartItem = async (payload) => {
  try {
    const response = await Axios.put(`${origin}/users/update-cart-item`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};