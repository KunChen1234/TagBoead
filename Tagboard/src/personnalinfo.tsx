import { useEffect, useState } from 'react';
import useSocket from './context/socket';
import miner from './image/miner.png';
interface Props {
    section: string;
    shiftTime: string;
}
interface SignIn {
    SN: string | null,
    section: string | null,
    name: string | null,
    photo: string | null | undefined,
    job: string | null,
    time: Date
}
interface RoobuckTag {
    MAC: string;
    SN: string;
}
function Personalinfo(props: Props) {
    let detail: SignIn[] = [];
    const socket = useSocket();
    const [DayShift, setDayShift] = useState<SignIn[]>(() => {
        const user = localStorage.getItem("DayShift");
        if (user) {
            return JSON.parse(user)
        } else {
            return null;
        }
    });
    const [NightShift, setNightShift] = useState<SignIn[]>(() => {
        const user = localStorage.getItem("NightShift");
        if (user) {
            return JSON.parse(user)
        } else {
            return null;
        }
    });
    const [LampInfo, setLampInfo] = useState<RoobuckTag>();
    // const a = [{
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }
    //     , {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }, {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // },
    // {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "Transfer",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // },
    // {
    //     id: 1,
    //     SN: "C0409W-4C7525BC7020",
    //     section: "maintanence",
    //     name: 'ken',
    //     photo: 'persontest.jpg',
    //     job: 'job1',
    //     time: '1'
    // }]
    const [photoSrc, setphotoSrc] = useState<string>();

    useEffect(() => {
        socket.on("DayShift", (msg) => {
            setDayShift(msg);
            localStorage.setItem("DayShift", JSON.stringify(msg));
            const a = JSON.stringify(msg);
            console.log("a" + JSON.parse(a).toString())
        });
        socket.on("NightShift", (msg) => {
            setNightShift(msg);
            localStorage.setItem("NightShift", JSON.stringify(msg));
            const a = JSON.stringify(msg);
            console.log("a" + JSON.parse(a).toString())
        });
        socket.on("LampInfo", (msg) => {
            setLampInfo(msg);
        })
        return function socketCleanup() {
            socket.removeAllListeners("DayShift");
            socket.removeAllListeners("NightShift");
            socket.removeAllListeners("LampInfo");
        };
    }, [DayShift, NightShift]);
    // console.log("ID: " + IDInfo, "Lamp: " + LampInfo, "photo:" + photoSrc)

    if (props.shiftTime === "DayShift" && DayShift) {
        detail = DayShift;
    } else if (props.shiftTime === "NightShift" && NightShift) {
        detail = NightShift;
    }

    if (detail) {
        return (
            <div className="grid grid-cols-9 gap-5 gap-y-5">
                {Array.from(detail).map(entry => {
                    if (entry.section === props.section) {
                        return (<div key={entry.SN} className="min-w-[120px] max-w-sm max-h-sm bg-tag-back shadow-lg grid grid-flow-2">
                            <div className="clo-flow-1">
                                <img className="inline-block h-20 w-20 rounded-full ring-2 ring-black" src={require("./image/" + entry.photo)} alt={miner}></img>
                            </div>
                            <div className="clo-flow-1">
                                <p>SN: {entry.SN}</p>
                                <p>Name: {entry.name}</p>
                                <p>Job: {entry.job}</p>
                                <p>Section: {entry.section}</p>
                                <p>Time: {entry.time.toString()}</p>
                                {/* <p>LampSN: {LampInfo.SN}</p> */}
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