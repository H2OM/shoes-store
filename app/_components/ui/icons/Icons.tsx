'use client';

import {CSSProperties} from "react";

const iconsSize: number = 20;

const ICONS_MAP = {
    unfiledHeart: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width={iconsSize} height={iconsSize} fill="currentColor" viewBox="0 0 16 16" className={className}
             style={style}>
            <path className="bi bi-suit-heart"
                  d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
        </svg>
    ),
    filedHeart: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width={iconsSize} height={iconsSize} fill="currentColor" viewBox="0 0 16 16" className={className}
             style={style}>
            <path className="bi bi-suit-heart"
                  d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
        </svg>
    ),
    basket: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width={iconsSize} height={iconsSize} viewBox="0 0 32 32" className={className} fill={'white'}
             style={style}>
            <path d="M12 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"/>
            <path d="M32 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"/>
            <path
                d="M32 16v-12h-24c0-1.105-0.895-2-2-2h-6v2h4l1.502 12.877c-0.915 0.733-1.502 1.859-1.502 3.123 0 2.209 1.791 4 4 4h24v-2h-24c-1.105 0-2-0.895-2-2 0-0.007 0-0.014 0-0.020l26-3.98z"/>
        </svg>
    ),
    user: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width={iconsSize} height={iconsSize} viewBox="0 0 32 32" fill="white" className={className} style={style}>
            <path
                  d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
        </svg>
    ),
    order: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={className} style={style}>
            <path fillRule="evenodd"
                  d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003 6.97 2.789ZM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2Z"/>
        </svg>
    ),
    exit: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={className} style={style}>
            <path fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
    ),
    octagon: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="16" height="16" fill="orange" viewBox="0 0 16 16" className={className} style={style}>
            <path
                d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
            <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
    ),
    dash: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="16" height="16" viewBox="0 0 16 16" className={className} fill="white" style={style}>
            <path fill="white" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
    ),
    plus: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="16" height="16" viewBox="0 0 16 16" className={className} fill="white" style={style}>
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
    ),
    cross: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="16" height="16" viewBox="0 0 16 16" className={className} fill="currentColor" style={style}>
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    ),
    vk: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg fill="none" width="14" height="14" viewBox="0 0 24 24" className={className} style={style}>
            <path clipRule="evenodd" fill="#000" fillRule="evenodd"
                  d="m23.4493 5.94799c.1668-.54645 0-.94799-.794-.94799h-2.6256c-.6676 0-.9754.34687-1.1423.72936 0 0-1.3353 3.19671-3.2268 5.27314-.6119.6011-.8901.7924-1.2239.7924-.1669 0-.4173-.1913-.4173-.7377v-5.10921c0-.65574-.1849-.94799-.7413-.94799h-4.12597c-.41719 0-.6681.30434-.6681.59278 0 .62163.94571.76499 1.04319 2.51363v3.79779c0 .8326-.15309.9836-.4869.9836-.89009 0-3.05525-3.21098-4.33939-6.88519-.25166-.71414-.50407-1.00261-1.1751-1.00261h-2.625612c-.750174 0-.900218.34687-.900218.72936 0 .68308.890141 4.07103 4.14464 8.55184 2.16965 3.06 5.22654 4.7188 8.00816 4.7188 1.669 0 1.8755-.3684 1.8755-1.003v-2.3128c0-.7368.1581-.8839.6866-.8839.3894 0 1.057.1913 2.6147 1.6667 1.7803 1.7486 2.0738 2.533 3.0751 2.533h2.6257c.7501 0 1.1252-.3684.9088-1.0955-.2368-.7246-1.0867-1.7759-2.2145-3.0222-.612-.7104-1.53-1.4754-1.8082-1.858-.3894-.4917-.2781-.7103 0-1.1474 0 0 3.199-4.42623 3.5328-5.92891z"/>
        </svg>
    ),
    telegram: ({className, style}: { className?: string; style?: CSSProperties }) => (
        <svg width="14" height="14" viewBox="0 0 28 28" className={className} style={style}>
            <path
                d="M18.578 20.422l2.297-10.828c0.203-0.953-0.344-1.328-0.969-1.094l-13.5 5.203c-0.922 0.359-0.906 0.875-0.156 1.109l3.453 1.078 8.016-5.047c0.375-0.25 0.719-0.109 0.438 0.141l-6.484 5.859-0.25 3.563c0.359 0 0.516-0.156 0.703-0.344l1.687-1.625 3.5 2.578c0.641 0.359 1.094 0.172 1.266-0.594zM28 14c0 7.734-6.266 14-14 14s-14-6.266-14-14 6.266-14 14-14 14 6.266 14 14z"></path>
        </svg>
    )
};

export type IconType = keyof typeof ICONS_MAP;

export function Icons({type, className, style}: { type: IconType, className?: string, style?: CSSProperties }) {
    return ICONS_MAP[type]({className: className, style: style});
}