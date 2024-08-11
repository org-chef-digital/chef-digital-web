import axios, { AxiosError } from "axios";
import { ApiResponse } from "./apiTypes";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

export function responseError(error: any)  {
    const respError = error as AxiosError<ApiResponse<null>>;
    
    return respError.response?.data
};
