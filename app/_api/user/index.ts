import _FETCH from "@/_utils/_FETCH";
import {UserEditData, UserSignInData, UserSignUpData} from "@_types/user";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const isAuth = async () => {
    return await _FETCH.request({url: `${API_URL}/is-auth`});
}

export const get = async () => {
    return await _FETCH.request({url: `${API_URL}/get`});
}

export const edit = async (body: UserEditData) => {
    return await _FETCH.request({
        url: `${API_URL}/edit`,
        options: {
            method: "POST",
            body: JSON.stringify(body),
        },
        toastSuccess: true
    });
}

export const signIn = async (body: UserSignInData) => {
    return await _FETCH.request({
        url: `${API_URL}/sign-in`,
        options: {
            method: "POST",
            body: JSON.stringify(body),
        },
        toastSuccess: true
    });
}

export const signUp = async (body: UserSignUpData) => {
    return await _FETCH.request({
        url: `${API_URL}/sign-up`,
        options: {
            method: "POST",
            body: JSON.stringify(body),
        },
        toastSuccess: true
    });
}

export const logOut = async () => {
    return await _FETCH.request({url: `${API_URL}/log-out`});
}

export const getOrders = async () => {
    return await _FETCH.request({url: `${API_URL}/get-orders`});
}