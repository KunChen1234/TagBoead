import { useEffect, useState } from 'react';
import useSocket from './context/socket';
import miner from './image/miner.png';
interface Props {
    section: string;
    shiftTime: string;
}
interface PeopleInfoTag {
    ID: string | undefined | null;
    section: string | undefined | null;
    name: string | undefined | null;
    photo: string | undefined | null;
    job: string | undefined | null;
    date: string | undefined | null;
    time: string | undefined | null;
    isDayShift: boolean | undefined | null;
}
interface LampInfo {
    MAC: string | undefined | null;
    SN: string | undefined | null;
    Bssid: string | undefined | null;
    ChargingStatus: boolean | undefined | null;
}
interface TagBoardInfo {
    person: PeopleInfoTag;
    lamp: LampInfo;
}
function Personalinfo(props: Props) {
    let detail: TagBoardInfo[] = [];
    const socket = useSocket();
    const [DayShift, setDayShift] = useState<TagBoardInfo[]>(() => {
        const user = sessionStorage.getItem("DayShift");
        if (user) {
            return JSON.parse(user)
        } else {
            return null;
        }
    });
    const [NightShift, setNightShift] = useState<TagBoardInfo[]>(() => {
        const user = sessionStorage.getItem("NightShift");
        if (user) {
            return JSON.parse(user)
        } else {
            return null;
        }
    });
    const [photoSrc, setphotoSrc] = useState<string>();

    const [test, setTest] = useState()
    useEffect(() => {
        socket.on("test", (msg) => {
            console.log(msg)
            setTest(msg)
        })
        socket.on("DayShift", (msg) => {
            // console.log("dayshift get data from server");
            setDayShift(msg);
            console.log(msg.person.ID);
            sessionStorage.setItem("DayShift", JSON.stringify(msg));
        });
        socket.on("NightShift", (msg) => {
            setNightShift(msg);
            console.log("a");
            sessionStorage.setItem("NightShift", JSON.stringify(msg));
        });

        socket.on("UpdateDayShift", (msg) => {
            setDayShift(msg);
            sessionStorage.setItem("DayShift", JSON.stringify(msg));
        });
        socket.on("UpdateNightShift", (msg) => {
            setNightShift(msg);
           console.log("uodate Nigh shift")
            sessionStorage.setItem("NightShift", JSON.stringify(msg));
        });
        return function socketCleanup() {
            socket.removeAllListeners("DayShift");
            socket.removeAllListeners("NightShift");
            socket.removeAllListeners("UpdateDayShift");
            socket.removeAllListeners("UpdateNightShift");
        };
    }, [DayShift, NightShift]);
    // console.log("ID: " + IDInfo, "Lamp: " + LampInfo, "photo:" + photoSrc)

    // console.log(props.shiftTime === "NightShift")
    // console.log(NightShift)

    if (props.shiftTime === "DayShift" && DayShift) {
        // console.log("detail= dayshift")
        detail = DayShift;
    } else if (props.shiftTime === "NightShift" && NightShift) {
        // console.log("detail= nightshift")
        detail = NightShift;
    }
    // if(!detail)
    // {
    //     console.log("get data failed")
    // }
    if (detail) {
        return (
            <div className="grid grid-cols-9 gap-5 gap-y-5">
                {Array.from(detail).map(entry => {
                    const person = entry.person;
                    const lamp = entry.lamp;
                    if (person.section === props.section) {
                        return (<div key={person.ID} className="min-w-[120px] max-w-sm max-h-sm bg-tag-back shadow-lg grid grid-flow-2">
                            <div className="clo-flow-1">
                                <img className="inline-block h-20 w-20 rounded-full ring-2 ring-black" src={require("./image/persontest.jpg")} alt={miner}></img>
                            </div>
                            <div className="clo-flow-1">
                                <p>SN: {person.ID}</p>
                                <p>Name: {person.name}</p>
                                <p>Job: {person.job}</p>
                                <p>Section: {person.section}</p>
                                <p>Time: {person.date}</p>
                                <p>Lamp Information</p>
                                <p>LampSN: {lamp.SN}</p>
                                <p>LampMAC: {lamp.MAC}</p>
                                <p>LampBssid: {lamp.Bssid}</p>
                                <p>ChargingStatus: {lamp.ChargingStatus?.toString()}</p>
                            </div>
                        </div>)
                    }
                })}
            </div>
        );
    }
    else {
        return null;
    }
}
export default Personalinfo;