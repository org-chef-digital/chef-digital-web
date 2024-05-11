export interface Restaurant {
    fantasyName: string;
    phone: string;
    email: string;
    password: string;
}

export interface RestaurantSignIn {
    email: string;
    password: string;
}

export interface RestaurantStatus {
    id: string;
    status: boolean;
}