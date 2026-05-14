'use client';

import './spinner.scss';

export default function Spinner({mini = false, color = false}: { mini?: boolean; color?: boolean }) {
    return (
        <div className={(mini ? 'spinner-mini' : 'spinner') + (color ? ' _color' : '')}></div>
    );
}