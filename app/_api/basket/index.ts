import _FETCH from "@/_utils/_FETCH";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/basket`;

export const get = async () => {
    return await _FETCH.request({url: `${API_URL}/get`});
}

export const add = async (data: {
    id: number;
    size: string;
    count?: number;
}, toastSuccess: boolean = true) => {
    return await _FETCH.request({
        url: `${API_URL}/add`,
        options: {
            method: 'POST',
            body: JSON.stringify(data)
        },
        toastSuccess
    });
}

export const decrement = async (data: {
    id: number;
    size: string;
}, toastSuccess: boolean = true) => {
    return await _FETCH.request({
        url: `${API_URL}/decrement`,
        options: {
            method: 'POST',
            body: JSON.stringify(data)
        },
        toastSuccess
    });
}

export const remove = async (data: {
    id: number;
    size: string;
}, toastSuccess: boolean = true) => {
    return await _FETCH.request({
        url: `${API_URL}/remove`,
        options: {
            method: 'POST',
            body: JSON.stringify(data)
        },
        toastSuccess
    });
}

export const setCount = async (data: {
    id: number;
    size: string;
    count: number;
}, toastSuccess: boolean = true) => {
    return await _FETCH.request({
        url: `${API_URL}/set-count`,
        options: {
            method: 'POST',
            body: JSON.stringify(data)
        },
        toastSuccess
    });
}

export const clear = async (toastSuccess: boolean = true) => {
    return await _FETCH.request({url: `${API_URL}/clear`, toastSuccess});
}
