import { useEffect, useState } from 'react';
import useSocket from './context/socket';
import './section.css';
import Personalinfo from './personnalinfo';
interface Prop {
    shiftTime: string;
}
function Section(prop: Prop) {
    const socket = useSocket();
    const a = [{
        color: "white", section: "maintanence",
    },
    {
        color: "#0000ff", section: "Transfer"
    }, {
        color: "#008000", section: "Manager"
    }, {
        color: "#800080", section: "Manager"
    }, {
        color: "#ffd700", section: "Manager"
    }
    ]
    if (a) {
        return (
            <div>
                {Array.from(a).map(entry => {
                    return (
                        <div className='pt-4'>
                            {/* border: `5px solid red`, */}
                            <div key={entry.section} className="board clo-flow-1 min-h-[200px] shadow-lg p-2" style={{ background: entry.color }}>
                                <p className='flex bg-white w-fit'>{entry.section}</p>
                                <div className='pt-2'>
                                    <Personalinfo section={entry.section} shiftTime={prop.shiftTime}></Personalinfo>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        );
    }
    else {
        return null;
    }

}
export default Section;