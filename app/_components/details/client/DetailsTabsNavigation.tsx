'use client';

import React, {ReactNode} from "react";

export default function DetailsTabsNavigation({children}: { children: ReactNode }) {
    const handleTabChange = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!target.classList.contains("Details__tabs__nav__tab")) return;

        const link = target.dataset.link!;
        const tabsHeader = target.parentElement!;
        const tabsBody = tabsHeader.nextElementSibling!;
        const currentContent = tabsBody.querySelector(`[data-link="${link}"]`)!;

        tabsHeader.querySelectorAll('.Details__tabs__nav__tab').forEach(tab => {
            tab.classList.remove("_active");
        });

        target.classList.add("_active");

        tabsBody.querySelectorAll(".Details__tabs__content__block").forEach(content => {
            content.classList.remove("_active");
        });

        currentContent.classList.add("_active");
    }

    return (
        <div className="Details__tabs__nav" onClick={handleTabChange}>
            {children}
        </div>
    )
}