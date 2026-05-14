'use client';

import {CSSProperties} from "react";

export default function Fallback({message = '', style = {}}: { message?: string; style?: CSSProperties; }) {
    return (
        <div className="fallback" style={style}>
            {message ? message : 'Произошла ошибка при загрузке данных! Проверьте соединение с интернетом'}
        </div>
    );
}