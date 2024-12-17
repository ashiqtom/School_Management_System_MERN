import { apiInstance } from "../ApiInstence";

export const signIn = async (data) => {
  try {
    const response = await apiInstance.post("auth/login/", data);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};