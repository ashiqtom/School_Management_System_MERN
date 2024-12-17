import { apiInstance } from "../ApiInstence";

export const editUser = async (id,data) => {
    try {
        const response = await apiInstance.put(`/admin/users/${id}`,data);
        return response;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};