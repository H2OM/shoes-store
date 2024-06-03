'use client';
import { useState } from "react"

export default function MaskInput ({className, name, required = false, baseValue =false, always = false}) {
    const [phoneMask, setMask] = useState({
        mask: baseValue || "+7 (___) ___-__-__",
        lastNumber:baseValue ? baseValue[baseValue.length - 1] : ''
    });

    return  <input className={className} name={name} type="text" required={required}
                defaultValue={always ? phoneMask.mask : null} 
                onFocus={(e)=>e.target.value = phoneMask.mask}
                onClick={(e)=>e.target.setSelectionRange(phoneMask.mask.indexOf('_'),phoneMask.mask.indexOf('_'))}
                onKeyDown={(e)=>{
                    if (e.key == "Backspace" && phoneMask.lastNumber != "(") {
                        e.preventDefault();
                        phoneMask.mask = phoneMask.mask.split('');
                        let indexLastNumber = phoneMask.mask.lastIndexOf(phoneMask.lastNumber);
            
                        for( let i = indexLastNumber-1;i>0;i--) {
                            phoneMask.lastNumber = phoneMask.mask[i];
                            if(phoneMask.lastNumber == '-' || phoneMask.lastNumber == ' ' ||  phoneMask.lastNumber == ')') {
                                continue;
                            } else {
                                break;
                            }
                        }
                        phoneMask.mask[indexLastNumber] = '_';
                        phoneMask.mask = phoneMask.mask.join('');
            
                    } else if(e.key != undefined && RegExp(/_/).test(phoneMask.mask) && (e.key).replace(/([^\d]|\,)/gi, '') != '') {
                        phoneMask.mask = phoneMask.mask.replace(/_/, e.key);
                        phoneMask.lastNumber = e.key;
                    }
                    setTimeout(()=>{
                        e.target.value = phoneMask.mask;
                        e.target.setSelectionRange(phoneMask.mask.indexOf('_'),phoneMask.mask.indexOf('_'));
                    });
                }}
                onSubmit={()=>setMask({mask: "+7 (___) ___-__-__", lastNumber: '' })}
            />


}