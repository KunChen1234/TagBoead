import { useEffect, useState } from 'react';
import useSocket from './context/socket';
import Personalinfo from './personnalinfo';
function Section() {
    const socket = useSocket();
    const a = [{
        color: "roobuck-blue", section: "maintanence",
    }, {
        color: "roobuck-blue", section: "transfer"
    }, {
        color: "roobuck-blue", section: "manager"
    }]
    if (a) {
        return (
            <div>
                {Array.from(a).map(entry => {
                    return (
                        <div>
                            <div><p>{entry.section}</p>
                            </div>
                            <div key={entry.section} className="max-w-sm max-h-sm  bg-white shadow-lg grid grid-flow-2">
                                <p>aa</p>
                                {/* <Personalinfo></Personalinfo> */}
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