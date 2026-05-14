'use client';

import {useState, KeyboardEvent} from "react";
import parsePhone from "@utils/parsePhone";

export default function MaskInput({
    name,
    baseValue,
    className = "",
    required = false,
    readonly = false
}: {
    name: string;
    baseValue?: string;
    className?: string;
    required?: boolean;
    readonly?: boolean;
}) {
    const [phoneMask, setPhoneMask] = useState<Record<string, string>>({
        mask: baseValue ? parsePhone(baseValue) : "+7 (___) ___-__-__",
    });

    const handleUpdatePosition = (
        target: HTMLInputElement,
        mask: string
    ) => {
        const pos = mask.indexOf('_');
        const finalPos = pos === -1 ? mask.length : pos;

        target.setSelectionRange(finalPos, finalPos);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newPhoneMask = {...phoneMask};

        if (e.key === "Backspace") {
            let mask: string[] = newPhoneMask.mask.split('');
            let indexToClear = -1;

            for (let i = mask.length - 1; i > 3; i--) {
                if (/\d/.test(mask[i])) {
                    indexToClear = i;
                    break;
                }
            }

            if (indexToClear !== -1) {
                mask[indexToClear] = '_';
                newPhoneMask.mask = mask.join('');
            }
        } else if (/^\d$/.test(e.key)) {
            e.preventDefault();
            newPhoneMask.mask = newPhoneMask.mask.replace(/_/, e.key);
        }

        setPhoneMask(newPhoneMask);
        requestAnimationFrame(() => handleUpdatePosition(e.target as HTMLInputElement, newPhoneMask.mask));
    }

    return (
        <input className={className} name={name} type="text" required={required} value={phoneMask.mask}
               autoComplete="tel"
               readOnly={readonly}
               onChange={() => {
               }}
               onClick={(e) => {
                   handleUpdatePosition(e.currentTarget, phoneMask.mask)
               }}
               onKeyDown={handleKeyDown}
               onSubmit={() => setPhoneMask({mask: "+7 (___) ___-__-__"})}
        />
    );
}