import persontest from './image/persontest.jpg'
import { useEffect, useState } from 'react';
import useSocket from './context/socket';
interface Result {
    id: number,
    serialnumber: string | null,
    section: string | null,
    name: string | null,
    photo: string | null|undefined,
    job: string | null
}
function Personalinfo() {
    const socket = useSocket();
    const [showinfo, setshowinfo] = useState<Result[]>();
    // const a = [{
    //     id: 1, serialnumber: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: './image/persontest.jpg',
    //     job: 'job1'
    // }]
    const [photoSrc,setphotoSrc]=useState<string>();
    useEffect(() => {
        socket.on("PersonalInfo", (msg) => {
            //  console.log(msg)
            setshowinfo(msg)
        });
        return function socketCleanup() {
            socket.removeAllListeners("PersonalInfo");
        };

    });
    if (showinfo) {
        return (
            <div className="grid grid-cols-9 gap-5 gap-y-12">
                {Array.from(showinfo).map(entry => {
                    return <div key={entry.name} className="max-w-sm max-h-sm bg-white shadow-lg grid grid-flow-2">
                        <div className="clo-flow-1">
                            <img className="inline-block h-20 w-20 rounded-full ring-2 ring-black" src={require('./image/persontest.jpg')}></img>
                        </div>
                        <div className="clo-flow-1">
                            <p>SN: {entry.serialnumber}</p>
                            <p>Name: {entry.name}</p>
                            <p>Job: {entry.job}</p>
                            <p>Section: {entry.section}</p>
                        </div>
                    </div>
                })}

            </div>
        );
    }
    else {
        return null;
    }


}
export default Personalinfo;