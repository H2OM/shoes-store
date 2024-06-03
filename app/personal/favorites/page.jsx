'use client';
import Cart from "@/lib/basecomponents/cart/cart";
import Filters from "@/lib/basecomponents/filters/filters";
import Spinner from "@/lib/basecomponents/spinner/spiner";
import ClientContext from "@/lib/clientProvider.jsx";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Favorites ({searchParams}) {
    const {isAuth, setLoading} = useContext(ClientContext);
    const [content, setContent] = useState('uninitiated');
    const fetchData = useCallback(async () => {
        setLoading(true);
        let params = "";
        Object.keys(searchParams).map((param)=>{
            params += "&"+param+"="+searchParams[param];
        });
        const respons = await fetch('http://localhost/api/catalog/get-catalog?fav=true'+params, {method: "GET"})
            .then(data=>{
                if(!data.ok) {
                    return undefined;
                }
                return data.json();
            })
            .catch(()=>undefined);
        setContent(respons);
        setLoading(false);
    }, [searchParams]);
    useEffect(()=>{
        if(isAuth == true) {
            fetchData();
        }
    }, [isAuth, searchParams]);
    return (
        <>
            {isAuth == true ? <h2 className="title title_black title_small">Избранное</h2> : null}
            {
                content == 'uninitiated' ? <Spinner/>
                :
                    <>  
                        {(typeof content === 'object' && Array.isArray(content.goods)) ? 
                            <>
                                {(Object.keys(searchParams).length != 0 || content.goods.length > 0) ? <Filters main={content.filters} category={true}/> : null}
                                { (content.goods.length > 0) ?
                                    <>
                                        <div className="Personal__split__content__grid">
                                            { content.goods.map(fav=><Cart key={fav.Article} info={fav}/>)}
                                        </div>
                                        {/* <div className="pagination">
                                            <button className="pagination__btns">
                                            </button>
                                            <div className="pagination__titles" onClick={({target})=>{
                                                if(target.classList.contains("pagination__titles__tab")) {
                                                    target.parentElement.querySelectorAll(".pagination__titles__tab_active").forEach(elem=>{
                                                        elem.classList.remove("pagination__titles__tab_active");
                                                    });
                                                    target.classList.add("pagination__titles__tab_active");
                                                }
                                            }}>
                                                <div className="pagination__titles__tab pagination__titles__tab_active">1</div>
                                                <div className="pagination__titles__tab">2</div>
                                                <div className="pagination__titles__tab">3</div>
                                                <div className="pagination__titles__dot">...</div>
                                                <div className="pagination__titles__tab">10</div>
                                            </div>
                                            <button className="pagination__btns">
                                            </button>
                                        </div> */}
                                    </> : <div className="title title_black title_lite">Нет избранных товаров</div>
                                }
                            </> : <div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>Здесь должна быть страница ошибки</div>}
                    </>
            }
        </>
    )
}