'use client'

import { createContext, useCallback, useEffect, useState } from "react"
import { basketSelector, favsSelector, fetchSelector, userSelector } from "./redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { basketFetch, favsFetch } from "./redux/thunks";
import './loading.scss';
import Spinner from "@/lib/basecomponents/spinner/spiner";
const ClientContext = createContext();

export const ClientProvider = ({children}) => {
    const dispatch = useDispatch();
    const {status : userStatus } = useSelector(userSelector);
    const {status : fetchStatus} = useSelector(fetchSelector);
    const {status : basketStatus} = useSelector(basketSelector);
    const {status : favsStatus} = useSelector(favsSelector);
    const [loading, setLoading] = useState(false);
    const [isContentLoaded, setContentLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [isAuth, setAuth] = useState('loading');
    const autorization = useCallback(async () => {
        const respons = await fetch('http://localhost/api/user/is-auth', {method: "GET"})
            .then(data=>{
                if(!data.ok) {
                    return false;
                }
                return data.json();
            })
            .catch(()=>false);
        setAuth(respons);
    }, []);
    useEffect(()=>{
        document.body.style.overflow = 'auto';
        setContentLoaded(true);
        autorization();
        dispatch(basketFetch({url:'http://localhost/api/basket/get-basket'}));
        
    }, []);
   
    useEffect(()=>{
        if(userStatus === 'loading' || fetchStatus === 'loading' || basketStatus === 'loading' || favsStatus === 'loading' ) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [userStatus, fetchStatus, basketStatus, favsStatus]);
    useEffect(()=>{
        if(isAuth == true) {
            dispatch(favsFetch({url: 'http://localhost/api/user/get-favs'}));
        }
    }, [isAuth]);
    useEffect(()=>{
        // setTimeout(()=>setError(false), 1500);
    }, [error]);
  
    return (
        <ClientContext.Provider
            value={{
                loading,
                setLoading,
                error,
                setError,
                isAuth
            }}>
            {!isContentLoaded ? <div className="loader"><Spinner/></div> : null}
            {/* <div className="loader"></div> */}
            {children}
        </ClientContext.Provider>
    )
} 

export default ClientContext;