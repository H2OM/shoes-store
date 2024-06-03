import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { basketFetch, favsFetch, fetchRequest, userFetch } from './thunks';


const fetchSlice = createSlice({
    name: 'fetchSlice',
    initialState: {
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(fetchRequest.pending, state=>{state.status = 'loading'})
            .addCase(fetchRequest.fulfilled, (state, action)=>{
                state.status = 'idle';
            })
            .addCase(fetchRequest.rejected,state=>{state.status = 'error'})
            .addDefaultCase(()=>{})
    }
});

const slicesAdapter = createEntityAdapter();
const userDataSlice = createSlice({
    name: 'userData',
    initialState: slicesAdapter.getInitialState({
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(userFetch.pending, state=>{state.status = 'loading'})
            .addCase(userFetch.fulfilled, (state, action)=>{
                state.status = 'idle';
                slicesAdapter.setOne(state, action.payload);
            })
            .addCase(userFetch.rejected,state=>{state.status = 'rejected'})
            .addDefaultCase(()=>{})
    }
});
const favsAdapter = createEntityAdapter({
    selectId: (product) => 1,
});
export const favsDataSlice = createSlice({
    name: 'favsData',
    initialState: favsAdapter.getInitialState({
        status: 'idle'
    }),
    reducers: {
        set(state, action) {
            favsAdapter.setOne(state, action.payload);
        }
    },
    extraReducers: (builder)=> {
        builder
            .addCase(favsFetch.pending, state=>{state.status = 'loading'})
            .addCase(favsFetch.fulfilled, (state, action)=>{
                state.status = 'idle';
                favsAdapter.setOne(state, action.payload);
            })
            .addCase(favsFetch.rejected,state=>{state.status = 'rejected'})
            .addDefaultCase(()=>{})
    }
}); 
const basketAdapter = createEntityAdapter({
    // selectId: (product) => (Array.isArray(product) ? product.map(v=>v.article) : null),
    selectId: (product) => 1,
});
const basketDataSlice = createSlice({
    name: 'basketData',
    initialState: basketAdapter.getInitialState({
        status: 'idle'
    }),
    reducers: {
        initiate(state, action) {
            basketAdapter.setOne(state, action.payload);
        }
    },
    extraReducers: (builder)=> {
        builder
            .addCase(basketFetch.pending, state=>{state.status = 'loading'})
            .addCase(basketFetch.fulfilled, (state, action)=>{
                state.status = 'idle';
                basketAdapter.setOne(state, action.payload);
            })
            .addCase(basketFetch.rejected,state=>{state.status = 'rejected'})
            .addDefaultCase(()=>{})
    }
});

export const { reducer: fetchReducer } = fetchSlice;
export const fetchSelector = createSelector(
    state => state.fetchSlice.status,
    (status) => ({status})
);
export const { reducer: userReducer } = userDataSlice;
export const userSelector = createSelector(
    (slicesAdapter.getSelectors(state=>state.userData)).selectAll,
    state => state.userData.status,
    (userData, status) => ({userData: userData[0], status})
);

export const { reducer : basketReducer } = basketDataSlice;
export const {initiate : basketInitiate } = basketDataSlice.actions;
export const basketSelector = createSelector(
    (basketAdapter.getSelectors(state=>state.basketData)).selectAll,
    state => state.basketData.status,
    (basketData, status) => ({basketData: basketData[0], status})
);

export const { reducer : favsReducer } = favsDataSlice;
export const {initiate : favsInitiate } = favsDataSlice.actions;
export const favsSelector = createSelector(
    (favsAdapter.getSelectors(state=>state.favsData)).selectAll,
    state => state.favsData.status,
    (favsData, status) => ({favsData: favsData[0], status})
);