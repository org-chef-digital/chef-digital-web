import { api, responseError } from '../api';
import { ApiResponse } from '../apiTypes';
import { Restaurant, RestaurantSignIn , RestaurantStatus} from './restaurantTypes';

async function create(newRestaurant: Restaurant) {
    try {
        const response = await api.post<ApiResponse<Restaurant>>(`/restaurant/register`, newRestaurant);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function signIn(restaurantSignIn: RestaurantSignIn) {
    try {
        const response = await api.post<ApiResponse<RestaurantSignIn>>(`/auth/signin`, restaurantSignIn);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function getStatus(restaurantStatus: RestaurantStatus) {
    try {
        const response = await api.get<ApiResponse<RestaurantStatus>>(`restaurant/${restaurantStatus.id}/status`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }); 

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

async function updateStatus(restaurantStatus: RestaurantStatus) {
    try {
        const response = await api.put<ApiResponse<RestaurantStatus>>(`restaurant/${restaurantStatus.id}/updateStatus`, restaurantStatus, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        return responseError(error);
    }
}

export const restaurantServices = {
    create,
    signIn, 
    getStatus,
    updateStatus
}