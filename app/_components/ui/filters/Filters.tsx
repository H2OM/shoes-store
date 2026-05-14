'use client';

import './filters.scss';
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import DialogSwitch from "./DialogSwitch";
import DialogRange from "./DialogRange";
import DialogMulti from "./DialogMulti";
import {Filter, FilterModalOptions} from "@_types/filters";

export default function Filters({filters, category = false}: { filters: Filter[]; category: boolean; }) {
    const searchParams = useSearchParams();
    const [modalOptions, setModalOptions] = useState<FilterModalOptions>({
        modalType: "",
        cords: {
            x: "0px",
            y: "0px"
        },
        name: "",
        content: []
    });

    useEffect(() => {
        document.addEventListener('click', handleDocumentClose);
        window.addEventListener('resize', handleModalClose);

        return () => {
            document.removeEventListener('click', handleDocumentClose);
            window.removeEventListener('resize', handleModalClose);
        }
    }, []);

    const handleDocumentClose = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!target.classList.contains('filters__tab') && !target.closest('.filters__tab__dialog')) {
            handleModalClose();
        }
    }

    const handleModalClose = () => {
        setModalOptions({...modalOptions, name: "", modalType: "", content: []});
    };

    const handleModalOpen = (target: HTMLDivElement, filter: Filter) => {
        setModalOptions({
            modalType: filter.type,
            name: filter.code,
            content: filter.values,
            cords: {
                x: `${target.offsetLeft}px`,
                y: `${target.offsetTop + target.offsetHeight}px`
            }
        });
    }

    return (
        <div className="filters">
            {filters.map(filter => {
                if (filter.code === "category" && !category) return null;

                return (
                    <div className={"filters__tab"
                        + (searchParams.has(filter.code) ? " filters__tab_selected" : "")
                        + (modalOptions.name == filter.code ? " filters__tab_active" : "")}
                         key={filter.code + filter.name}
                         data-type={filter.type}
                         data-code={filter.code}
                         onClick={({currentTarget}) => {
                             filter.code === modalOptions.name
                                 ? handleModalClose()
                                 : handleModalOpen(currentTarget, filter);
                         }}>
                        {filter.name}
                    </div>
                );
            })}
            {modalOptions.modalType === "switch" &&
                <DialogSwitch modalOptions={modalOptions} closeAction={handleModalClose}/>}
            {modalOptions.modalType === "range" &&
                <DialogRange modalOptions={modalOptions} closeAction={handleModalClose}/>}
            {modalOptions.modalType === "multi" &&
                <DialogMulti modalOptions={modalOptions} closeAction={handleModalClose}/>}
        </div>
    );
}