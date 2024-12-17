import { apiInstance } from "../ApiInstence";

export const deleteStudent = async (id) => {
    try {
        const response = await apiInstance.delete(`staff/student/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};