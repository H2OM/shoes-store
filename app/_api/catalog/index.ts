import _FETCH from "@/_utils/_FETCH";
import formatQueryParams from "@utils/formatQueryParams";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/catalog`;

export const get = async (filters: Record<string, string>) => {
    const params = formatQueryParams(filters);

    return await _FETCH.request({url: `${API_URL}/get${params ? `?${params}` : ''}`});
}

export const getProductById = async (id: number|string) => {
    return await _FETCH.request({url: `${API_URL}/getProduct?id=${id}`});
}