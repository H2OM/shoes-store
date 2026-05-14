'use client';

import {useEffect, useState} from "react";
import {FilterModalOptions} from "@_types/filters";
import setQueryParams from "@/_hooks/setQueryParams";

const Range = ({value, initialValue, setValue}: {
    value: string;
    initialValue: string;
    setValue: (value: string) => void;
}) => (
    <label className={"filters__tab__dialog__range__option" + (value && value !== initialValue ? ' _active' : '')}>
        <input className="filters__tab__dialog__range__option__target"
               type="number"
               value={value}
               onChange={({currentTarget}) => setValue(currentTarget.value)}
        />
    </label>
)

export default function DialogRange({modalOptions, closeAction}: {
    modalOptions: FilterModalOptions;
    closeAction: () => void;
}) {
    const {content, name, cords} = modalOptions;
    const {set, unset, confirm, get} = setQueryParams();
    const contentValues = content[0].code.split(',');
    const selected = get(name)?.split(",") || [];
    const [values, setValues] = useState({
        first: "",
        second: ""
    });

    useEffect(() => {
        setValues({
            first: selected[0] ?? contentValues[0],
            second: selected[1] ?? contentValues[1]
        });
    }, []);

    const handleConfirm = () => {
        if ((!values.first || values.first === contentValues[0]) && (!values.second || values.second === contentValues[1])) {
            unset(name);

        } else {
            set(name, `${values.first},${values.second}`);
        }

        confirm();
        closeAction();
    }

    return (
        <div className="filters__tab__dialog" style={{top: cords.y, left: cords.x}}>
            <div className="filters__tab__dialog__range">
                <Range value={values.first}
                       initialValue={contentValues[0]}
                       setValue={(value: string) => setValues({
                           ...values,
                           first: value
                       })}
                />
                <span className="filters__tab__dialog__range__middle">—</span>
                <Range value={values.second}
                       initialValue={contentValues[1]}
                       setValue={(value: string) => setValues({
                           ...values,
                           second: value
                       })}
                />
            </div>
            <div className="filters__tab__dialog__footer">
                <button className="filters__tab__dialog__footer__submit btn_small btn" onClick={handleConfirm}>
                    Подтвердить
                </button>
            </div>
        </div>
    );
}