import {notFound} from "next/navigation";
import '../catalog.scss';
import Filters from "@ui/filters/Filters";
import Cart from "@ui/cart/Cart";
import {catalogAPI} from "@api";
import {Product} from "@_types/product";
import Fallback from "@ui/fallback/Fallback";
import {Filter} from "@_types/filters";
import normalizeParams from "@utils/normalizeParams";
import {SearchParams} from "@_types/common";

export default async function Catalog({promiseParams, promiseSearchParams}: {
    promiseParams: Promise<{ type?: string; }>
    promiseSearchParams: Promise<SearchParams>;
}) {
    const rawSearchParams: SearchParams = await promiseSearchParams;
    const params = await promiseParams;

    const searchParams = normalizeParams(rawSearchParams);

    if (params.type) {
        searchParams.category = params.type.toLowerCase();
    }

    const data = await catalogAPI.get(searchParams);

    let title = searchParams.category;

    switch (title) {
        case undefined:
        case "":
            title = "";
            break;
        case "woman":
            title = "Женская обувь";
            break;
        case "man":
            title = "Мужская обувь";
            break;
        case "kids":
            title = "Детская обувь";
            break;
        case "all":
            title = "Унисекс";
            break;
        default:
            notFound();
    }

    const {catalog, filters}: {
        catalog?: Product[];
        filters?: Filter[];
    } = data.data ?? {};

    return (
        <section className="Catalog section">
            <div className="grid">
                {catalog &&
                    <>
                        <div className="Catalog__title">
                            <h1 className="title title_black">{title ? title : "Каталог"}</h1>
                            <span className="title__count"> - {catalog.length}</span>
                        </div>
                        {(Object.keys(searchParams).length !== 0 || catalog.length > 0) && filters &&
                            <Filters filters={filters} category={title === ""}/>
                        }
                        {catalog.length > 0 ?
                            <>
                                <div className="Catalog__content">
                                    {catalog.map(product => {
                                        return (
                                            <Cart product={product} key={product.id}/>
                                        )
                                    })}
                                </div>
                                {/* <div className="Catalog__navigation">
                                    <div className="btn btn_big Catalog__navigation__btn">Показать еще</div>
                                    <div className="pagination">
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
                                    </div>
                                </div> */}
                            </> :
                            <div className="title title_black" style={{marginTop: "20px", fontSize: "22px"}}>
                                Товаров не найдено
                            </div>
                        }
                    </>
                }
                {(!data.success || !catalog) && <Fallback message={data.message}/>}
            </div>
        </section>
    );
}