'use client';
import SetQueryParams from "@/lib/hooks/SetQueryParams";
import { useSearchParams } from "next/navigation";
export default function DialogSwitch ({content, name, cords, close}) {
    const {set, unset, confirm} = SetQueryParams();
    const searchParams = useSearchParams();
    
    const selected = searchParams.get(name);
    let switcher = content.map((value, i)=>{
        return (
            <li key={value.ValueCode}>
                <label className={"filters__tab__dialog__list__option" + (value.ValueCode==selected ? " filters__tab__dialog__list__option_selected" : "")}>
                    <input type="radio" name={name} hidden value={value.ValueCode} onClick={(e)=>{
                        e.stopPropagation();
                        const list = e.target.parentElement.parentElement.parentElement;
                        if(e.target.parentElement.classList.contains("filters__tab__dialog__list__option_selected")) {
                            list.querySelector(".filters__tab__dialog__list__option_selected")?.classList.remove("filters__tab__dialog__list__option_selected");
                            document.querySelector(".filters__tab_active")?.classList.remove("filters__tab_selected");
                        } else {
                            list.querySelector(".filters__tab__dialog__list__option_selected")?.classList.remove("filters__tab__dialog__list__option_selected");
                            e.target.parentElement.classList.add("filters__tab__dialog__list__option_selected");
                            document.querySelector(".filters__tab_active")?.classList.add("filters__tab_selected");
                        }
                        if(!searchParams.has(name, value.ValueCode)) {
                            set(name, value.ValueCode);
                            
                        } else unset(name);
                        confirm();
                        close();
                    }}/>
                    {value.Name}
                </label>
            </li>
        )
    });
    return (
        <div className="filters__tab__dialog" style={{top: cords.y, left: cords.x}}>
            <ul className="filters__tab__dialog__list">
                {switcher}  
            </ul>
        </div>
    )
}