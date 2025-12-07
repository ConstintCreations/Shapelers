"use client";

import { useEffect, useState } from "react";
import Shapeler from "./shapeler";
import ColorSwatch from "./colorSwatch";

type ShapelerType = {
    color: string;
    type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler";
    male: boolean;
    baby: boolean;
    pupil: "Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small";
    mouth: "Normal" | "Happy" | "Mad" | "Sad" | "Shocked" | "Big-Wave" | "Small-Wave" | "Wide";
    eyebrow: "Normal" | "Confused" | "Excited" | "Excited-Surround" | "Mad" | "Scared-Under-Round" | "Worried";
    mood: "Normal" | "Hungry" | "Happy" | "Sad" | "Angry" | "Excited" | "Confused" | "Shocked";
}

export default function ShapelerEditor() {

    const [loaded, setLoaded] = useState(false);

    const [shapeler, setShapeler] = useState<ShapelerType>({
        color: "#f36c60ff",
        type: "Googler",
        male: true,
        baby: false,
        pupil: "Normal",
        mouth: "Normal",
        eyebrow: "Normal",
        mood: "Normal"
    });

    function setHexColorByChannel(hex: string, channel: "r" | "g" | "b", value: number) {
        const hexValue = value.toString(16).padStart(2, '0');
        const r = channel === 'r' ? hexValue : hex.slice(1, 3);
        const g = channel === 'g' ? hexValue : hex.slice(3, 5);
        const b = channel === 'b' ? hexValue : hex.slice(5, 7);
        return `#${r}${g}${b}ff`;
    }

    useEffect(() => {
        const savedShapeler = localStorage.getItem("shapeler");
        if (savedShapeler) {
            setShapeler(JSON.parse(savedShapeler));
        } else {
            setShapeler({
                color: "#f36c60ff",
                type: "Googler",
                male: true,
                baby: false,
                pupil: "Normal",
                mouth: "Normal",
                eyebrow: "Normal",
                mood: "Normal"
            });
        }
        setLoaded(true);
    }, []);

    function saveShapeler() {
        localStorage.setItem("shapeler", JSON.stringify(shapeler));
    }

    function logCurrentShapeler() {
        console.log(shapeler);
    }


    return (
        <div className = "absolute top-0 left-0 w-full h-full min-h-220">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                { loaded && <Shapeler color={shapeler.color} type={shapeler.type} male={shapeler.male} baby={shapeler.baby} pupil={shapeler.pupil} mouth={shapeler.mouth} eyebrow={shapeler.eyebrow} editing /> }
                <input className="relative bottom-65 text-6xl font-bold text-[#5b4636] border-b-4 text-center w-100 min-w-100 focus-visible:outline-none" placeholder={shapeler.baby ? shapeler.type.slice(0, -1) + "t" : shapeler.type}/>
                <div className="absolute bottom-60 flex flex-row gap-4">
                    <button onClick={() => {saveShapeler()}} className="bg-[#d7bd8d] cursor-pointer px-6 py-2 rounded-2xl border-5 border-[#b3855e] text-[#5b4636] font-bold transition-all ease-in-out duration-300 hover:-translate-y-2 focus-visible:outline-none">
                        Save
                    </button>
                    <button onClick={() => logCurrentShapeler()} className="bg-[#d7bd8d] cursor-pointer px-6 py-2 rounded-2xl border-5 border-[#b3855e] text-[#5b4636] font-bold transition-all ease-in-out duration-300 hover:-translate-y-2 focus-visible:outline-none">
                        Play
                    </button>
                </div>
            </div>
            <div className="fixed bottom-0 w-full flex flex-row gap-8 bg-[#efdbb7] rounded-t-4xl items-center p-10 overflow-auto min-h-24">
                <div className="flex flex-row gap-4">
                    <button className={`size-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${shapeler.male ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, male: true}))}>
                        <img src="/UI/maleSymbol.png" className="w-16"/>
                    </button>
                    <button className={`size-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${!shapeler.male ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, male: false}))}>
                        <img src="/UI/femaleSymbol.png" className="h-16"/>
                    </button>
                </div>

                <button className={`size-24 min-w-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${shapeler.baby ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, baby: !s.baby}))}>
                    <img src="/UI/babySymbol.png" className="w-14"/>
                </button>

                <div className="flex flex-row gap-2 flex-wrap w-24 min-w-24">
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.type=="Googler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, type: "Googler"}))}>
                        <img src="/Parts/Shapelet/Bodies/Body-Googlet.png" className="w-8"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.type=="Bloopler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, type: "Bloopler"}))}>
                        <img src="/Parts/Shapelet/Bodies/Body-Blooplet.png" className="w-8"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.type=="Sprickler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, type: "Sprickler"}))}>
                        <img src="/Parts/Shapelet/Bodies/Body-Spricklet.png" className="w-8"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.type=="Stronkler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setShapeler(s => ({...s, type: "Stronkler"}))}>
                        <img src="/Parts/Shapelet/Bodies/Body-Stronklet.png" className="w-8"/>
                    </button>
                </div>

                <div className="flex flex-row gap-2 flex-wrap w-115 min-w-115">
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#bdbdbdff"}))}>
                        <ColorSwatch color="#bdbdbdff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#9e9e9eff"}))}>
                        <ColorSwatch color="#9e9e9eff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#757575ff"}))}>
                        <ColorSwatch color="#757575ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#424242ff"}))}>
                        <ColorSwatch color="#424242ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#a1887fff"}))}>
                        <ColorSwatch color="#a1887fff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#8d6e63ff"}))}>
                        <ColorSwatch color="#8d6e63ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#f36c60ff"}))}>
                        <ColorSwatch color="#f36c60ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#ffb74dff"}))}>
                        <ColorSwatch color="#ffb74dff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#fff176ff"}))}>
                        <ColorSwatch color="#fff176ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#aed581ff"}))}>
                        <ColorSwatch color="#aed581ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#72d572ff"}))}>
                        <ColorSwatch color="#72d572ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#4db6acff"}))}>
                        <ColorSwatch color="#4db6acff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#4fc3f7ff"}))}>
                        <ColorSwatch color="#4fc3f7ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#91a7ffff"}))}>
                        <ColorSwatch color="#91a7ffff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#5c6bc0ff"}))}>
                        <ColorSwatch color="#5c6bc0ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#9575cdff"}))}>
                        <ColorSwatch color="#9575cdff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#ba68c8ff"}))}>
                        <ColorSwatch color="#ba68c8ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setShapeler(s => ({...s, color: "#f48fb1ff"}))}>
                        <ColorSwatch color="#f48fb1ff"/>
                    </button>
                </div>
                <button className={`h-24 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex flex-col gap-1 items-center justify-center border-5 border-[#cfa37d]`}>
                    <div className="flex flex-row gap-2 text-red-500 font-bold">R<input type="range" className="red" min={0} max={255} step={1} value={parseInt(shapeler.color.slice(1, 3), 16)} onChange={(e) => { setShapeler(s => ({...s, color: setHexColorByChannel(shapeler.color, "r", Number(e.target.value))})) }}/></div>
                    <div className="flex flex-row gap-2 text-green-500 font-bold">G<input type="range" className="bg-gray-300" min={0} max={255} step={1} value={parseInt(shapeler.color.slice(3, 5), 16)} onChange={(e) => { setShapeler(s => ({...s, color: setHexColorByChannel(shapeler.color, "g", Number(e.target.value))})) }}/></div>
                    <div className="flex flex-row gap-2 text-blue-500 font-bold">B<input type="range" className="bg-gray-300" min={0} max={255} step={1} value={parseInt(shapeler.color.slice(5, 7), 16)} onChange={(e) => { setShapeler(s => ({...s, color: setHexColorByChannel(shapeler.color, "b", Number(e.target.value))})) }}/></div>
                </button>
                <div className="flex flex-row gap-2 flex-wrap min-w-97">
                    <button className={`h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Normal" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Normal", eyebrow: "Normal", mouth: "Normal", pupil: "Normal" }));}}>
                        Normal
                    </button>
                    <button className={`h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Hungry" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Hungry", eyebrow: "Normal", mouth: "Wide", pupil: "Normal" }));}}>
                        Hungry
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Happy" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Happy", eyebrow: "Normal", mouth: "Happy", pupil: "Normal" }));}}>
                        Happy
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Sad" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Sad", eyebrow: "Worried", mouth: "Sad", pupil: "Crazy" }));}}>
                        Sad
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Angry" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Angry", eyebrow: "Mad", mouth: "Mad", pupil: "Normal" }));}}>
                        Angry
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Excited" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Excited", eyebrow: "Excited", mouth: "Shocked", pupil: "Excited" }));}}>
                        Excited
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Confused" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Confused", eyebrow: "Confused", mouth: "Small-Wave", pupil: "Dizzy" }));}}>
                        Confused
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Shocked" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Shocked", eyebrow: "Normal", mouth: "Shocked", pupil: "Normal" }));}}>
                        Shocked
                    </button>
                </div>
                
            </div>

        </div>
    )
}