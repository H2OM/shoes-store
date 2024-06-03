import { createAsyncThunk } from "@reduxjs/toolkit";




export const fetchRequest = createAsyncThunk(
    'fetchSlice/fetchRequest',
    async ({url, m = 'GET', b = null }) =>{
        const respons = await fetch(url, {method: m, body: b})
            .then(data=>{
                if(!data.ok) {
                    throw new Error(data.status);
                }
                return data.json();
            }).catch(e=>{
                // throw new Response("Not Found", { status: 404 });
                throw new Error(e.message);
            });
        return respons;
    },
    {
        condition:({}, {getState, extra})=>{
            if(getState().fetchSlice.status == 'loading') {
                return false;
            }
        }
    }
)
export const userFetch = createAsyncThunk(
    'userData/userFetch',
    async ({url, m = 'GET', b = null }) =>{
        
        const respons = await fetch(url, {method: m, body: b})
            .then(data=>{
                if(!data.ok) {
                    throw new Error(data.status);
                }
                return data.json();

            }).catch(e=>{
                // throw new Response("Not Found", { status: 404 });
                throw new Error(e.message);
            });
        return  respons;
    },
    {
        condition:({m}, {getState, extra})=>{
            const {userData : {entities, status} } = getState();
            if(m == "POST" && status == 'idle') {
                return true;
            } else if((Object.keys(entities).length !== 0 || status !== 'idle') && (status !== "rejected" && Object.keys(entities).length !== 0)) {
                return false;
            } else if (status == 'idle' || (status == "rejected" && Object.keys(entities).length == 0)) {
                return true;
            }
        }
    }
)
export const basketFetch = createAsyncThunk(
    'basketData/basketFetch',
    async ({url, m = "GET", b = null}) =>{
        if(b !== null) {
            const data = new FormData();
            for(let k in b) {
                data.append(k, b[k]);
            }
            b = data;
        }
        const respons = await fetch(url, {method: m, body: b})
            .then(data=>{
                if(!data.ok) {
                    return null;
                }
                return data.json();

            }).catch(e=>{
                // throw new Response("", {
                //     status: 404,
                //     statusText: "Not Found",
                //     redirected: true
                // });
                return null;
            });
        return  respons;
    },
    {
        condition:({}, {getState, extra})=>{
            const {basketData : {entities, status} } = getState();
            if(status == 'idle' || status == 'rejected') {
                return true;
            } else if(status !== 'idle') {
                return false;
            }
        }
    }
)
export const favsFetch = createAsyncThunk(
    'favsData/basketFetch',
    async ({url}) =>{
        const respons = await fetch(url, {method: 'GET'})
            .then(data=>{
                if(!data.ok) {
                    return null;
                }
                return data.json();

            })
            .then((data)=>{
                return data[0];
            }).catch(e=>{
                // throw new Response("", {
                //     status: 404,
                //     statusText: "Not Found",
                //     redirected: true
                // });
                return null;
            });
        return  respons;
    },
    {
        condition:({}, {getState, extra})=>{
            const {favsData : {entities, status} } = getState();
            if(status == 'idle' || status == 'rejected') {
                return true;
            } else if(status !== 'idle') {
                return false;
            }
        }
    }
)