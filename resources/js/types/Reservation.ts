export interface Reservation {
    id?: number;
    flight_number?: string | null;
    date_from: string;
    time_from?: string;
    date_to: string;
    time_to?: string;
    pickup_place_id: number;
    dropoff_place_id: number;
    car_id: number;
    client_id: number;
    status: string;
    total_price: number;
    added_options?: {
        id: number;
        quantity: number;
        price_per_day: number;
    }[];
}

export interface AddedOption {
    id: number;
    title: string;
    price_per_day: number;
}

export interface Car {
    id: number;
    brand: string;
    model: string;
    price_per_day: number;
}

export interface Client {
    id: number;
    full_name: string;
    email: string;
}

export interface Place {
    id: number;
    title: string;
}
