import _FETCH from "@/_utils/_FETCH";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/favorites`;

export const get = async () => {
    return await _FETCH.request({url: `${API_URL}/get`});
}

export const add = async (productId: number) => {
    return await _FETCH.request({url: `${API_URL}/add?product_id=${productId}`, toastSuccess: true});
}

export const remove = async (productId: number) => {
    return await _FETCH.request({url: `${API_URL}/remove?product_id=${productId}`, toastSuccess: true});
}
