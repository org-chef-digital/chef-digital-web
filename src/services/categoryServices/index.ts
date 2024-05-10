import { api, responseError } from "../api";
import { ApiResponse } from "../apiTypes";
import { Category } from "./categoryTypes";

async function update(newCategory: Category) {
    try {
        const response = await api.put<ApiResponse<Category>>(`/categories/${newCategory.id}`, newCategory);

        if (!response.data.success) {
            throw new Error(response.data.message);
        } 

        return response.data;

    } catch (error) {
        return responseError(error);
    }
}

export const categoryServices = {
    update,
}