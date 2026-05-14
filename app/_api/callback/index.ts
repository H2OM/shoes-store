import _FETCH from "@/_utils/_FETCH";
import {CallbackForm, CallbackSubscribe} from "@_types/callbacks";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/callback`;

export const subscribe = async (data: CallbackSubscribe) => {
    return await _FETCH.progressTrackingRequest({url: `${API_URL}/subscribe`, options: {method: 'POST', body: JSON.stringify(data)}});
}

export const form = async (data: CallbackForm) => {
    return await _FETCH.progressTrackingRequest({url: `${API_URL}/form`, options: {method: 'POST', body: JSON.stringify(data)}});
}
