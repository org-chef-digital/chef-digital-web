import { api, responseError } from "../api";
import { ApiResponse } from "../apiTypes";
import { Category } from "../categoryServices/categoryTypes";
import { Product } from "./productTypes";

async function update(newProduct: Product) {
    try {
        const response = await api.put<ApiResponse<Product>>(`/products/${newProduct.id}`, newProduct);

        if (!response.data.success) {
            throw new Error(response.data.message);
        } 

        return response.data;

    } catch (error) {
        return responseError(error);
    }
}

async function create(newProduct: Product) {
    try {
        const response = await api.post<ApiResponse<Product>>(`/products/new`, newProduct);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getProducts() {
    try {
        const response = await api.get<ApiResponse<Product>>(`products/all/restaurant/${localStorage.getItem('restaurantId')}`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getProduct(id: string) {
    try{
        const response = await api.get<ApiResponse<Product>>(`/products/${id}`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function deleteProduct(id: string) {
    try {
        const response = await api.delete<ApiResponse<Product>>(`/products/${id}`);

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
    getProducts,
    getProduct,
    deleteProduct
}