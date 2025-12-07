"use client";

import { useState } from "react";
import Shapeler from "./shapeler";

export default function ShapelerEditor() {
    const [color, setColor] = useState("#f36c60ff");
    const [type, setType] = useState<"Bloopler" | "Googler" | "Sprickler" | "Stronkler">("Googler");
    const [male, setMale] = useState(true);
    const [baby, setBaby] = useState(false);
    const [pupil, setPupil] = useState<"Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small">("Normal");
    const [mouth, setMouth] = useState<"Normal" | "Happy" | "Mad" | "Sad" | "Shocked" | "Big-Wave" | "Small-Wave" | "Wide">("Normal");
    const [eyebrow, setEyebrow] = useState<"Normal" | "Confused" | "Excited" | "Excited-Surround" | "Mad" | "Scared-Under-Round" | "Worried">("Normal");

    return (
        <div className = "absolute top-0 left-0 w-full h-full min-h-180">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                <Shapeler color={color} type={type} male={male} baby={baby} pupil={pupil} mouth={mouth} eyebrow={eyebrow} editing />
                <input className="relative bottom-65 text-6xl font-bold text-[#5b4636] border-b-4 text-center w-[20%]" placeholder="Name..."/>
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

                <button className={`size-24 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 transition-all ease-in-out duration-300 hover:-translate-y-2 ${baby ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => setBaby(!baby)}>
                    <img src="/UI/babySymbol.png" className="h-16"/>
                </button>

                <div className="flex flex-row gap-2 flex-wrap w-24">
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
            </div>

        </div>
    )
}