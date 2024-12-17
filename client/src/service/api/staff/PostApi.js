import { apiInstance } from "../ApiInstence";

/**
 * -1
 *  Admin Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the dealer  account
 * @param {string} data.password - Password for the dealer account
 *
 */

export const createStudent = async (data) => {
  try{
    const response = await apiInstance.post("staff/create_student", data);
    return response;
  } catch (error){
    console.error(error)
    throw error.response ? error.response.data : new Error(error.message);
  }
}
