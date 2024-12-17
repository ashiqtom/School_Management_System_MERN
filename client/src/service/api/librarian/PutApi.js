import { apiInstance } from "../ApiInstence";

export const editStudent = async (id,data) => {
    try {
        const response = await apiInstance.put(`librarian/student/${id}`,data);
        return response;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};