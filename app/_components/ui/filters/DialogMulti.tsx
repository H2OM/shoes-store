'use client';

import {useEffect, useState} from "react";
import {FilterModalOptions} from "@_types/filters";
import setQueryParams from "@hooks/setQueryParams";

export default function DialogMulti({modalOptions, closeAction}: {
    modalOptions: FilterModalOptions;
    closeAction: () => void;
}) {
    const {content, name, cords} = modalOptions;
    const {set, unset, confirm, get} = setQueryParams();
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        setSelected(get(name)?.split(",") || []);
    }, []);

    const triggerSelect = (value: string) => {
        setSelected(prev => prev.includes(value)
            ? prev.filter(element => element !== value)
            : [...prev, value]
        );
    }

    const handleClear = () => {
        unset(name);
        confirm();
        setSelected([]);
    }

    const handleConfirm = () => {
        if (selected.length === 0) return;

        set(name, selected.join(','));
        confirm();
        closeAction();
    }

    return (
        <div className="filters__tab__dialog" style={{top: cords.y, left: cords.x}}>
            <ul className="filters__tab__dialog__list">
                {content.map(value => {
                    return (
                        <li key={value.id + value.code}>
                            <label className={"filters__tab__dialog__list__option"
                                + ((selected.includes(value.code)) ? " _selected" : "")
                            }>
                                <input type="checkbox" hidden
                                       name={name}
                                       value={value.code ?? ''}
                                       onClick={() => triggerSelect(value.code)}/>
                                {value.name}
                            </label>
                        </li>
                    )
                })}
            </ul>
            <div className="filters__tab__dialog__footer">
                <div className="filters__tab__dialog__footer__submenu">
                    <button className="filters__tab__dialog__footer__submenu__clear" onClick={handleClear}>
                        Очистить
                    </button>
                    <span className="filters__tab__dialog__footer__submenu__count">Выбрано: {selected.length}</span>
                </div>
                <button className="filters__tab__dialog__footer__submit btn_small btn"
                        disabled={selected.length === 0}
                        onClick={handleConfirm}>
                    Подтвердить
                </button>
            </div>
        </div>
    )
}