import {Product} from "@_types/product";

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    phone: string;
    age: number;
    gender: 'female' | 'male';
    email: string;
}

export interface UserSignInData {
    phone: string;
    password: string;
}

export interface UserSignUpData extends Omit<User, 'id'> {
    password: string;
    password_confirmed: string;
}

export interface UserEditData extends Omit<User, 'id'> {
}

export interface UserOrder {
    id: number;
    number: string;
    status: number;
    user_id: number;
    date: string;
    change_date: string;
    delivery_date: string;
    comment: string;
    products: Product[];
}