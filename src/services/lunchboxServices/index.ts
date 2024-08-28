import { api, responseError } from "../api";
import { ApiResponse } from "../apiTypes";
import { Lunchbox } from "./lunchboxTypes";

async function create(newLunchbox: Lunchbox) {
    try {
        const response = await api.post<ApiResponse<Lunchbox>>(`/lunchboxes/new`, newLunchbox);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getLunchboxes() {
    try {
        const response = await api.get<ApiResponse<Lunchbox>>(`/lunchboxes/all`)

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getLunchbox(id: string) {
    try {
        const response = await api.get<ApiResponse<Lunchbox>>(`lunchboxes/${id}`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function deleteLunchbox(id: string) {
    try {
        const response = await api.delete<ApiResponse<Lunchbox>>(`/lunchboxes/${id}`);
        
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }   
}

export const lunchboxServices = {
    create,
    getLunchboxes,
    getLunchbox,
    deleteLunchbox,
}