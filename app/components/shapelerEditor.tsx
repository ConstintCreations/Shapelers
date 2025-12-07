"use client";

import { useState } from "react";
import Shapeler from "./shapeler";
import ColorSwatch from "./colorSwatch";

export default function ShapelerEditor() {
    const [color, setColor] = useState("#f36c60ff");
    const [type, setType] = useState<"Bloopler" | "Googler" | "Sprickler" | "Stronkler">("Googler");
    const [male, setMale] = useState(true);
    const [baby, setBaby] = useState(false);
    const [pupil, setPupil] = useState<"Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small">("Normal");
    const [mouth, setMouth] = useState<"Normal" | "Happy" | "Mad" | "Sad" | "Shocked" | "Big-Wave" | "Small-Wave" | "Wide">("Normal");
    const [eyebrow, setEyebrow] = useState<"Normal" | "Confused" | "Excited" | "Excited-Surround" | "Mad" | "Scared-Under-Round" | "Worried">("Normal");
    const [mood, setMood] = useState<"Normal" | "Hungry" | "Happy" | "Sad" | "Angry" | "Excited" | "Confused" | "Shocked">("Normal");

    function setHexColorByChannel(hex: string, channel: "r" | "g" | "b", value: number) {
        const hexValue = value.toString(16).padStart(2, '0');
        const r = channel === 'r' ? hexValue : hex.slice(1, 3);
        const g = channel === 'g' ? hexValue : hex.slice(3, 5);
        const b = channel === 'b' ? hexValue : hex.slice(5, 7);
        return `#${r}${g}${b}ff`;
    }

    return (
        <div className = "absolute top-0 left-0 w-full h-full min-h-180">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                <Shapeler color={color} type={type} male={male} baby={baby} pupil={pupil} mouth={mouth} eyebrow={eyebrow} editing />
                <input className="relative bottom-65 text-6xl font-bold text-[#5b4636] border-b-4 text-center w-100 min-w-100 focus-visible:outline-none" placeholder="Name..."/>
            </div>
            <div className="fixed bottom-0 w-full flex flex-row gap-8 bg-[#efdbb7] rounded-t-4xl items-center p-10 overflow-auto min-h-24">
                <div className="flex flex-row gap-4">
                    <button className={`size-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${male ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setMale(true)}>
                        <img src="/UI/maleSymbol.png" className="w-16"/>
                    </button>
                    <button className={`size-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${!male ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setMale(false)}>
                        <img src="/UI/femaleSymbol.png" className="h-16"/>
                    </button>
                </div>

                <button className={`size-24 min-w-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${baby ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setBaby(!baby)}>
                    <img src="/UI/babySymbol.png" className="w-14"/>
                </button>

                <div className="flex flex-row gap-2 flex-wrap w-24 min-w-24">
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${type=="Googler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setType("Googler")}>
                        <img src="/Parts/Shapelet/Bodies/Body-Googlet.png" className="w-8"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${type=="Bloopler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setType("Bloopler")}>
                        <img src="/Parts/Shapelet/Bodies/Body-Blooplet.png" className="w-8"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${type=="Sprickler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setType("Sprickler")}>
                        <img src="/Parts/Shapelet/Bodies/Body-Spricklet.png" className="w-8"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-3 transition-all ease-in-out duration-300 hover:-translate-y-1 ${type=="Stronkler" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setType("Stronkler")}>
                        <img src="/Parts/Shapelet/Bodies/Body-Stronklet.png" className="w-8"/>
                    </button>
                </div>

                <div className="flex flex-row gap-2 flex-wrap w-115 min-w-115">
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#bdbdbdff")}>
                        <ColorSwatch color="#bdbdbdff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#9e9e9eff")}>
                        <ColorSwatch color="#9e9e9eff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#757575ff")}>
                        <ColorSwatch color="#757575ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#424242ff")}>
                        <ColorSwatch color="#424242ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#a1887fff")}>
                        <ColorSwatch color="#a1887fff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#8d6e63ff")}>
                        <ColorSwatch color="#8d6e63ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#f36c60ff")}>
                        <ColorSwatch color="#f36c60ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#ffb74dff")}>
                        <ColorSwatch color="#ffb74dff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#fff176ff")}>
                        <ColorSwatch color="#fff176ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#aed581ff")}>
                        <ColorSwatch color="#aed581ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#72d572ff")}>
                        <ColorSwatch color="#72d572ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#4db6acff")}>
                        <ColorSwatch color="#4db6acff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#4fc3f7ff")}>
                        <ColorSwatch color="#4fc3f7ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#91a7ffff")}>
                        <ColorSwatch color="#91a7ffff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#5c6bc0ff")}>
                        <ColorSwatch color="#5c6bc0ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#9575cdff")}>
                        <ColorSwatch color="#9575cdff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#ba68c8ff")}>
                        <ColorSwatch color="#ba68c8ff"/>
                    </button>
                    <button className={`size-11 cursor-pointer rounded-2xl flex items-center justify-center transition-transform ease-in-out duration-300 hover:-translate-y-1`} onClick={() => setColor("#f48fb1ff")}>
                        <ColorSwatch color="#f48fb1ff"/>
                    </button>
                </div>
                <button className={`h-24 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex flex-col gap-1 items-center justify-center border-5 border-[#cfa37d]`} onClick={() => setMale(true)}>
                    <div className="flex flex-row gap-2 text-red-500 font-bold">R<input type="range" className="red" min={0} max={255} step={1} value={parseInt(color.slice(1, 3), 16)} onChange={(e) => { setColor(setHexColorByChannel(color, "r", Number(e.target.value))) }}/></div>
                    <div className="flex flex-row gap-2 text-green-500 font-bold">G<input type="range" className="bg-gray-300" min={0} max={255} step={1} value={parseInt(color.slice(3, 5), 16)} onChange={(e) => { setColor(setHexColorByChannel(color, "g", Number(e.target.value))) }}/></div>
                    <div className="flex flex-row gap-2 text-blue-500 font-bold">B<input type="range" className="bg-gray-300" min={0} max={255} step={1} value={parseInt(color.slice(5, 7), 16)} onChange={(e) => { setColor(setHexColorByChannel(color, "b", Number(e.target.value))) }}/></div>
                </button>
                <div className="flex flex-row gap-2 flex-wrap min-w-97">
                    <button className={`h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Normal" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Normal"); setEyebrow("Normal"); setMouth("Normal"); setPupil("Normal");}}>
                        Normal
                    </button>
                    <button className={`h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Hungry" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Hungry"); setEyebrow("Normal"); setMouth("Wide"); setPupil("Normal");}}>
                        Hungry
                    </button>
                    <button className={`${baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Happy" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Happy"); setEyebrow("Normal"); setMouth("Happy"); setPupil("Normal");}}>
                        Happy
                    </button>
                    <button className={`${baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Sad" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Sad"); setEyebrow("Worried"); setMouth("Sad"); setPupil("Crazy");}}>
                        Sad
                    </button>
                    <button className={`${baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Angry" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Angry"); setEyebrow("Mad"); setMouth("Mad"); setPupil("Normal");}}>
                        Angry
                    </button>
                    <button className={`${baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Excited" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Excited"); setEyebrow("Excited"); setMouth("Shocked"); setPupil("Excited");}}>
                        Excited
                    </button>
                    <button className={`${baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Confused" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Confused"); setEyebrow("Confused"); setMouth("Small-Wave"); setPupil("Dizzy");}}>
                        Confused
                    </button>
                    <button className={`${baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${mood=="Shocked" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setMood("Shocked"); setEyebrow("Normal"); setMouth("Shocked"); setPupil("Normal");}}>
                        Shocked
                    </button>
                </div>
                
            </div>

        </div>
    )
}