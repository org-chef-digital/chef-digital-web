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

async function create(newCategory: Category) {
    try {
        const response = await api.post<ApiResponse<Category>>(`/categories`, newCategory);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getCategories() {
    try {
        const response = await api.get<ApiResponse<Category>>(`/categories/all`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getCategory(id: string) {
    try{
        const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function deleteCategory(id: string) {
    try {
        const response = await api.delete<ApiResponse<Category>>(`/categories/${id}`);

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
    create,
    getCategories,
    getCategory,
    deleteCategory
}