'use client';

import SetQueryParams from "@/lib/hooks/SetQueryParams";
import { useEffect, useState } from "react";

export default function DialogRange ({content, name, cords, close}) {
    const {set, unset, confirm, get } = SetQueryParams();
    let selected = get(name)?.split(",") || [];

    content = content[0].ValueCode.split(",");
    const [values, setValues] = useState({
        first: "",
        second: ""
    });
    useEffect(()=>{
        setValues({
            first: selected[0] ? selected[0] : content[0],
            second: selected[1]  ? selected[1] : content[1]
        });
    }, []);
    useEffect(()=>{
        ((values.first == content[0] || values.first == "") && (values.second == content[1] || values.second == "")) 
            ? unset(name) 
            : set(name, values.first +","+values.second);
    }, [values]);
    
    return (
        <div className="filters__tab__dialog" style={{top: cords.y, left: cords.x}}>
            <form className="filters__tab__dialog__form" onSubmit={(e)=>{
                e.preventDefault();
                confirm();
                close();
            }}>
                <div className="filters__tab__dialog__range">
                    <label className="filters__tab__dialog__range__option">
                        <input className="filters__tab__dialog__range__option__target" type="number" name={name+"[]"} value={values.first} 
                            onChange={({target})=>{
                                setValues({...values, first:target.value});
                            }}
                            onBlur={({target})=>{
                                if(target.value == "") {
                                    setValues({...values, first:content[0]});
                                }
                                if((values.first !== content[0] && values.first !== "") || values.second !== content[1]) {
                                    target.parentElement.classList.add("filters__tab__dialog__range__option_active");
                                    document.querySelector(".filters__tab_active")?.classList.add("filters__tab_selected");
                                } else if((values.first == content[0] || values.first == "") && values.second == content[1]) {
                                    target.parentElement.classList.remove("filters__tab__dialog__range__option_active");
                                    document.querySelector(".filters__tab_active")?.classList.remove("filters__tab_selected");
                                }
                            }}
                            />
                    </label> 
                    <span className="filters__tab__dialog__range__middle">—</span>
                    <label className="filters__tab__dialog__range__option">
                        <input className="filters__tab__dialog__range__option__target" type="number" name={name+"[]"} value={values.second} 
                            onChange={({target})=>{
                                setValues({...values, second:target.value});
                            }}
                            onBlur={({target})=>{
                                if(target.value == "") {
                                    setValues({...values, second:content[1]});
                                }
                                if((values.second !== content[1] && values.second !== "") || values.first !== content[0]) {
                                    target.parentElement.classList.add("filters__tab__dialog__range__option_active");
                                    document.querySelector(".filters__tab_active")?.classList.add("filters__tab_selected");
                                } else if((values.second == content[1] || values.second == "") && values.first == content[0]) {
                                    target.parentElement.classList.remove("filters__tab__dialog__range__option_active");
                                    document.querySelector(".filters__tab_active")?.classList.remove("filters__tab_selected");
                                }
                            }}
                            />
                    </label> 
                </div>
                <div className="filters__tab__dialog__footer">
                    <button type="submit" className="filters__tab__dialog__footer__submit btn_small btn">Подвердить</button>
                </div>
            </form>
        </div>
    )
}