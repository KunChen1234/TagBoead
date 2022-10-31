import { useEffect, useState } from 'react';
import useSocket from '../../context/socket';
import './section.css';
import Personalinfo from '../Personalinfo/personnalinfo';
import DepartmentInfo from '../hooks/DepartmentForm';
interface Prop {
    shiftTime: string;
}
function Section(prop: Prop) {
    const socket = useSocket();
    const [Department, setDepartment] = useState<DepartmentInfo[]>(() => {
        const user = sessionStorage.getItem("DepartmentInfo");
        console.log(user);
        if (user) {
            return JSON.parse(user)
        } else {
            return null;
        }
    });
    useEffect(() => {
        socket.on("UpdateDepartmentInfo", (msg) => {
            setDepartment(msg);
            sessionStorage.setItem("DepartmentInfo", JSON.stringify(msg));
        })
    });
    // Comment
    const a = [{
        Color: "white", Name: "maintanence",
    },
    {
        Color: "#0000ff", Name: "manager"
    }, {
        Color: "#008000", Name: "transfer"
    }, {
        Color: "#800080", Name: "section4"
    }, {
        Color: "#ffd700", Name: "section5"
    }
    ]
    if (a) {
        return (
            <div>
                {Array.from(a).map(entry => {
                    return (
                        <div className='pt-4'>
                            {/* border: `5px solid red`, */}
                            <div key={entry.Name} className="board clo-flow-1 min-h-[200px] shadow-lg p-2" style={{ background: entry.Color }}>
                                <p className='flex bg-white w-fit'>{entry.Name}</p>
                                <div className='pt-2'>
                                    <Personalinfo section={entry.Name} shiftTime={prop.shiftTime}></Personalinfo>
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