'use client';
import './filters.scss';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DialogSwitch from "./dialogSwitch";
import DialogRange from "./dialogRange";
import DialogMulti from "./dialogMulti";

export default function Filters ({main, category = false}) {
    
    const searchParams = useSearchParams();
    const [modal, modalOptions] = useState({
        modalType: "",
        cords: {
            x: "0px",
            y: "0px"
        },
        name: "",
        content: [],
        selected: ""
    });
    const modalClose = () => {
        document.querySelectorAll(".filters__tab_active").forEach(element=>{
            // if(!searchParams.has(element.dataset.cont)) {element.classList.remove("filters__tab_selected");}
                // else if(!element.classList.contains("filters__tab_selected")) {element.classList.add("filters__tab_selected");}
            // element.classList.remove("filters__tab_active");
        });
        modalOptions({...modal, name: "", modalType: "", selected: [], content: []});
    };
    useEffect(()=>{
        const documentClose = ({target}) =>{
            if(!target.classList.contains('filters__tab') && !target.closest('.filters__tab__dialog')) {
                modalClose();
            }
        }
        document.addEventListener('click', documentClose);
        window.addEventListener('resize',modalClose);
        return () => {
            document.removeEventListener('click',documentClose);
            window.removeEventListener('resize',modalClose);
        }
    }, []);
    let filtersValues = {};
    const tabs = Object.keys(main).map(species=>{
        return main[species].map((categories,i)=>{
            if(categories.Code === "category" && !category) return false;
            filtersValues[categories.Code] = [];
            categories.Values.map(value=>{
                filtersValues[categories.Code].push(value);
            });
            return (
                <div className={"filters__tab" + (searchParams.has(categories.Code) ? " filters__tab_selected" : "") + (modal.name == categories.Code ? " filters__tab_active" : "")} key={categories.Code} 
                    data-type={species} data-cont={categories.Code}>{categories.Filter}</div>
            )
        });
    });
    return (
            <div className="filters" onClick={(e)=>{
                e.stopPropagation();
                if(e.target.classList.contains("filters") || e.target.classList.contains("filters__tab_active")) {
                    modalClose();

                } else if(e.target.classList.contains("filters__tab")) {
                    document.querySelector(".filters__tab_active")?.classList.remove("filters__tab_active");
                    e.target.classList.add("filters__tab_active");
                    switch(e.target.dataset.type) {
                        case "Switch":
                        case "Range":
                        case "Multi": 
                            if(filtersValues[e.target.dataset.cont] && filtersValues[e.target.dataset.cont].count != 0) {
                                modalOptions({
                                    modalType: e.target.dataset.type, 
                                    name: e.target.dataset.cont,
                                    content: filtersValues[e.target.dataset.cont], 
                                    cords: {x:e.target.offsetLeft, y: e.target.offsetTop + e.target.offsetHeight}
                                });
                                break;
                            }
                        default:
                            e.target.classList.remove("filters__tab_active");
                            break;
                    }
                }
            }}>
            {tabs}
            {
                  modal.modalType == "Switch" ? <DialogSwitch content={modal.content} name={modal.name} cords={modal.cords} close={modalClose}/> 
                : modal.modalType == "Range"  ? <DialogRange content={modal.content} name={modal.name} cords={modal.cords} close={modalClose}/>
                : modal.modalType == "Multi"  ? <DialogMulti content={modal.content} name={modal.name} cords={modal.cords} close={modalClose}/>
                : null
            }
        </div>
    )
}