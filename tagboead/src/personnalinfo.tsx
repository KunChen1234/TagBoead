import { useEffect, useState } from 'react';
import useSocket from './context/socket';
import Clock from './comment/Header/Clock';
import { time } from 'console';
import miner from './image/miner.png';
interface Props {
    section: string
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
    const socket = useSocket();
    const [IDInfo, setIDInfo] = useState<SignIn[]>();
    const [LampInfo, setLampInfo] = useState<RoobuckTag>();
    const a = [{
        id: 1,
        SN: "C0409W-4C7525BC7020",
        section: "maintanence",
        name: 'ken',
        photo: 'persontest.jpg',
        job: 'job1',
        time: '1'
    }
,{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},
{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "Transfer",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
},
{
    id: 1,
    SN: "C0409W-4C7525BC7020",
    section: "maintanence",
    name: 'ken',
    photo: 'persontest.jpg',
    job: 'job1',
    time: '1'
}]
    const [photoSrc, setphotoSrc] = useState<string>();
    useEffect(() => {
        socket.on("PersonalInfo", (msg) => {
            //  console.log(msg)
            setIDInfo(msg);

        });
        socket.on("LampInfo", (msg) => {
            setLampInfo(msg);
        })
        return function socketCleanup() {
            socket.removeAllListeners("PersonalInfo");
        };

    });
    console.log("ID: " + IDInfo, "Lamp: " + LampInfo, "photo:" + photoSrc)
    // IDInfo && LampInfo && photoSrc
    if (a) {
        return (
            <div className="grid grid-cols-9 gap-5 gap-y-5">
                {Array.from(a).map(entry => {
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