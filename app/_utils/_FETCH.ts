import toast from 'react-hot-toast';

const isClient = typeof window !== 'undefined';
const DEBUG = process.env.NEXT_PUBLIC_DEBUG === '1';

const cleanRequest = async ({url, options = {method: "GET"}}: {
    url: string,
    options?: RequestInit,
    toasts?: boolean
}) => {
    return await fetch(url, options)
        .catch(() => {
            isClient && toast.error("Ошибка запроса");
            return false;
        });
}

const fileRequest = async ({url, options = {method: "GET"}, toasts = false}: {
    url: string,
    options?: RequestInit,
    toasts?: boolean

}) => {
    const RESPONSE = await fetch(url, options);
    const blob = await RESPONSE.blob();

    if (!(blob instanceof Blob)) {
        isClient && toast.error("Ошибка запроса");

        return false;
    }

    toasts && isClient && toast.success("Файл успешно получен");

    const disposition = RESPONSE.headers.get('Content-Disposition');
    let filename = 'file.txt';

    if (disposition && disposition.includes('filename=')) {
        filename = disposition
            .split('filename=')[1]
            .split(';')[0]
            .replace(/['"]/g, '');

        filename = decodeURIComponent(filename);
    }

    return {blob, filename};
}

const request = async ({
    url,
    options = {
       method: "GET", cache: "no-cache", headers: {
           "Content-Type": "application/json"
       }
    },
    toastSuccess = false,
    toastError = true
}: {
    url: string;
    options?: RequestInit;
    toastSuccess?: boolean | string;
    toastError?: boolean | string;
}) => {
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
    }

    return await fetch(url, options)
        .then(response => DEBUG ? response.text() : response.json())
        .then(data => {
            DEBUG && console.log(data);

            if (!data || !data.success) {
                throw new Error(data.message ?? `Ошибка в получении данных с сервера.`);
            }

            toastSuccess && isClient && toast.success(typeof toastSuccess === 'string' ? toastSuccess : data.message ?? 'Успешно!');

            return data;
        })
        .catch(error => {
            const MESSAGE = typeof toastError === 'string'
                ? toastError
                : (error instanceof Error && error.message === 'Failed to fetch'
                    ? "Ошибка соединения с сервером!"
                    : (error.message !== ''
                        ? error.message
                        : "Ошибка в получении данных!"));

            toastError && isClient && toast.error(MESSAGE);

            return {success: false, message: MESSAGE};
        });
}

const progressTrackingRequest = async ({
    url,
    options = {method: "GET", cache: "no-cache"},
    loading,
    success,
    error
}: {
    url: string;
    options?: RequestInit;
    loading?: string;
    success?: string;
    error?: string;
}) => {
    if (!isClient) return request({url, options, toastError: false});

    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
    }

    return toast.promise(
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.success) throw new Error(data.message);

                return data;
            }),
        {
            loading: loading ?? 'Загрузка...',
            success: data => success ?? data.message ?? 'Успешно!',
            error: e => error ?? e.message ?? 'Ошибка загрузки данных!'
        },
    ).catch(error => ({success: false, message: error.message}));
}

export default {request, progressTrackingRequest, cleanRequest, fileRequest};