import { apiInstance } from "../ApiInstence";

export const deleteUser = async (id) => {
    try {
        const response = await apiInstance.delete(`librarian/users/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};