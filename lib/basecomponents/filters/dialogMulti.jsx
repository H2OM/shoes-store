'use client';

import SetQueryParams from "@/lib/hooks/SetQueryParams";
import { useEffect, useState } from "react";

export default function DialogMulti ({content, name, cords, close}) {
    const {set, unset, confirm, get} = SetQueryParams();
    let selected = get(name)?.split(",") || [];
    const [count, setCount] = useState(selected.length);
    useEffect(()=>{
        count > 0 
            ? document.querySelector(".filters__tab_active")?.classList.add("filters__tab_selected")
            : document.querySelector(".filters__tab_active")?.classList.remove("filters__tab_selected");
    }, [count]);
    
    let multies = content.map((value, i)=>{
        return (
            <li key={value.ValueCode}>
                <label className={"filters__tab__dialog__list__option" + ((selected.includes(value.ValueCode)) ? " filters__tab__dialog__list__option_selected" : "")}>
                    <input type="checkbox" name={name} hidden value={value} onClick={(e)=>{
                        e.stopPropagation();
                        if(!selected.includes(value.ValueCode)) {
                            set(name, ((selected.length == 0 || selected.includes("")) ? value.ValueCode : (selected.join(",") + "," + value.ValueCode)));

                        } else if (selected.includes(value.ValueCode)) {
                            selected.splice(selected.indexOf(value.ValueCode), 1);
                            selected.length == 0 ? unset(name) : set(name, selected.join(","));
                        }
                        if(e.target.parentElement.classList.contains("filters__tab__dialog__list__option_selected")) {
                            setCount((prev)=>--prev);
                            e.target.parentElement.classList.remove("filters__tab__dialog__list__option_selected");
                        } else {
                            setCount((prev)=>++prev);
                            e.target.parentElement.classList.add("filters__tab__dialog__list__option_selected");
                        }
                }}/>
                    {value.Name}
                </label> 
            </li>
        )
    });
    return (
        <div className="filters__tab__dialog" style={{top: cords.y, left: cords.x}}>
            <form className="filters__tab__dialog__form" onSubmit={(e)=>{
                e.preventDefault();
                confirm();
                close();
            }}>
                <ul className="filters__tab__dialog__list">
                    {multies}
                </ul>
                <div className="filters__tab__dialog__footer">
                    <div className="filters__tab__dialog__footer__submenu">
                        <input type="reset" className="filters__tab__dialog__footer__submenu__clear" value={"Очистить"} onClick={(e)=>{
                            e.stopPropagation();
                            unset(name);
                            setCount(0);
                            document.querySelector(".filters__tab_active").setAttribute("data-selected", "");
                            e.target.parentElement.parentElement.parentElement.querySelectorAll(".filters__tab__dialog__list__option_selected").forEach(elem=>elem.classList.remove("filters__tab__dialog__list__option_selected"));
                        }}/>
                        <span className="filters__tab__dialog__footer__submenu__count">Выбрано: {count}</span>
                    </div> 
                    <button type="submit" className="filters__tab__dialog__footer__submit btn_small btn">Подвердить</button>
                </div>
            </form>
        </div>
    )
}