'use client';

import {useSearchParams} from "next/navigation";
import {FilterModalOptions} from "@_types/filters";
import setQueryParams from "@hooks/setQueryParams";

export default function DialogSwitch({modalOptions, closeAction}: {
    modalOptions: FilterModalOptions;
    closeAction: () => void;
}) {
    const {content, name, cords} = modalOptions;
    const {set, unset, confirm} = setQueryParams();
    const searchParams = useSearchParams();
    const selected = searchParams.get(name);

    const handleOptionSelect = (code: string) => {
        if (code === selected) {
            unset(name);

        } else {
            set(name, code);
        }

        confirm();
        closeAction();
    }

    return (
        <div className="filters__tab__dialog" style={{top: cords.y, left: cords.x}}>
            <ul className={"filters__tab__dialog__list"}>
                {content.map(value => {
                    return (
                        <li key={value.code}>
                            <label className={"filters__tab__dialog__list__option"
                                + (value.code === selected ? " _selected" : "")
                            }>
                                <input type="radio" hidden
                                       name={name}
                                       value={value.code}
                                       onClick={() => handleOptionSelect(value.code)}/>
                                {value.name}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}