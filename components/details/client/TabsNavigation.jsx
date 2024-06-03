'use client';

export default function TabsNavigation ({children}) {
    return (
        <div className="Details__tabs__nav" onClick={({target})=>{
            if(target.classList.contains("Details__tabs__nav__tab")) {
                target.parentElement.querySelectorAll(".Details__tabs__nav__tab").forEach(elem=>elem.classList.remove("Details__tabs__nav__tab_active"));
                target.classList.add("Details__tabs__nav__tab_active");
                target.parentElement.nextElementSibling.querySelectorAll(".Details__tabs__content__block").forEach(element=>{
                    element.classList.remove("Details__tabs__content__block_active");
                    if(element.dataset.link == target.dataset.link) element.classList.add("Details__tabs__content__block_active");
                });
            }
        }}>
            {children}
        </div>
    )
}