import { apiInstance } from "../ApiInstence";

/**
 * -1
 *  Dealer Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the dealer  account
 * @param {string} data.password - Password for the dealer account
 *
 */
export const getStudents = async () => {
  try {
    const response = await apiInstance.get("librarian/students");
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


export const getLibrarianStudentById= async (id) => {
  try {
    const response = await apiInstance.get(`librarian/student/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};