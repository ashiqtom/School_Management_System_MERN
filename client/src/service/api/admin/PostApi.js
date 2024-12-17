import { apiInstance } from "../ApiInstence";

/**
 * -1
 *  Admin Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the dealer  account
 * @param {string} data.password - Password for the dealer account
 *
 */

export const createAccount = async (data) => {
  try{
    const response = await apiInstance.post("/admin/create_account", data);
    return response;
  } catch (error){
    console.error(error)
    throw error.response ? error.response.data : new Error(error.message);
  }
}
