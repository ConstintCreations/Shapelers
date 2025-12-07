"use client";

import { useEffect, useState } from "react";
import Shapeler from "./shapeler";
import ColorSwatch from "./colorSwatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faDice } from "@fortawesome/free-solid-svg-icons";

type PupilTypes = "Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small";
type MouthTypes = "Normal" | "Happy" | "Mad" | "Sad" | "Shocked" | "Big-Wave" | "Small-Wave" | "Wide";
type EyebrowTypes = "Normal" | "Confused" | "Excited" | "Excited-Surround" | "Mad" | "Scared-Under-Round" | "Worried";
type MoodTypes = "Normal" | "Hungry" | "Happy" | "Sad" | "Angry" | "Excited" | "Confused" | "Shocked";

type ShapelerType = {
    color: string;
    type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler";
    male: boolean;
    baby: boolean;
    pupil: PupilTypes;
    mouth: MouthTypes;
    eyebrow: EyebrowTypes;
    mood: MoodTypes;
    name: string;
}

const DEFAULT_SHAPELER: ShapelerType = {
    color: "#f36c60ff",
    type: "Googler",
    male: true,
    baby: false,
    pupil: "Normal",
    mouth: "Normal",
    eyebrow: "Normal",
    mood: "Normal",
    name: ""
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
        mood: "Normal",
        name: ""
    });

    const [savedShapelers, setSavedShapelers] = useState<ShapelerType[] | null>(null);
    const [shapelerIndex, setShapelerIndex] = useState(0);

    function setHexColorByChannel(hex: string, channel: "r" | "g" | "b", value: number) {
        const hexValue = value.toString(16).padStart(2, '0');
        const r = channel === 'r' ? hexValue : hex.slice(1, 3);
        const g = channel === 'g' ? hexValue : hex.slice(3, 5);
        const b = channel === 'b' ? hexValue : hex.slice(5, 7);
        return `#${r}${g}${b}ff`;
    }

    useEffect(() => {
        const localStorageShapelers = localStorage.getItem("savedShapelers");
        if (localStorageShapelers) {
            const parsedShapelers = JSON.parse(localStorageShapelers);
            setSavedShapelers(parsedShapelers);
        } else {
            setSavedShapelers([DEFAULT_SHAPELER]);
        }
    }, []);

    function saveShapeler() {
        
        setSavedShapelers(s => { {
            if (!s) return [shapeler];
            const newSaved = [...s];
            newSaved[shapelerIndex] = shapeler;
            localStorage.setItem("savedShapelers", JSON.stringify(newSaved));
            return newSaved;
        }});
    }

    const moodFeatures = {
        "Normal": { eyebrow: "Normal" as EyebrowTypes, mouth: "Normal" as MouthTypes, pupil: "Normal" as PupilTypes },
        "Hungry": { eyebrow: "Normal" as EyebrowTypes, mouth: "Wide" as MouthTypes, pupil: "Normal" as PupilTypes },
        "Happy": { eyebrow: "Normal" as EyebrowTypes, mouth: "Happy" as MouthTypes, pupil: "Normal" as PupilTypes },
        "Sad": { eyebrow: "Worried" as EyebrowTypes, mouth: "Sad" as MouthTypes, pupil: "Crazy" as PupilTypes },
        "Angry": { eyebrow: "Mad" as EyebrowTypes, mouth: "Mad" as MouthTypes, pupil: "Normal" as PupilTypes },
        "Excited": { eyebrow: "Excited" as EyebrowTypes, mouth: "Shocked" as MouthTypes, pupil: "Excited" as PupilTypes },
        "Confused": { eyebrow: "Confused" as EyebrowTypes, mouth: "Small-Wave" as MouthTypes, pupil: "Dizzy" as PupilTypes },
        "Shocked": { eyebrow: "Normal" as EyebrowTypes, mouth: "Shocked" as MouthTypes, pupil: "Normal" as PupilTypes },
    }

    function randomizeShapeler() {
        const colors = ["#bdbdbdff", "#9e9e9eff", "#757575ff", "#424242ff", "#a1887fff", "#8d6e63ff", "#f36c60ff", "#ffb74dff", "#fff176ff", "#aed581ff", "#72d572ff", "#4db6acff", "#4fc3f7ff", "#91a7ffff", "#5c6bc0ff", "#9575cdff", "#ba68c8ff", "#f48fb1ff"];
        const types = ["Bloopler", "Googler", "Sprickler", "Stronkler"] as const;
        const moods:MoodTypes[] = ["Normal", "Hungry", "Happy", "Sad", "Angry", "Excited", "Confused", "Shocked"];
        const chosenMood = moods[Math.floor(Math.random() * moods.length)];
        const chosenGenderMale = Math.random() < 0.5 ? true : false;
        const neutralNames = ["Wiggle", "Wiggle", "Wobble", "Quirk", "Doodle", "Bubbles", "Gizmo", "Pebble", "Peanut", "Waffles", "Poopy", "Snuggles", "Squeaky", "Pip", "Peep", "Chubby", "Floop", "Blip"]
        const boyNames = [...neutralNames, "Bob", "Max", "Stompy", "Pogo", "Noodle", "Zig", "Zag", "Spike", "Chomper", "Rocky", "Rusty", "Taco", "Goofy", "Nacho", "Nugget", "Dave", "Charles", "George", "Frank", "Everett", "Barry", "Bongo", "Astro", "Comet", "Dart", "Flash", "Turbo", "Viper", "Jet", "Bolt", "Rex", "Mr. Gobbles"];
        const girlNames = [...neutralNames, "Linda", "Fluffy", "Blinky", "Daisy", "Muffin", "Sprinkle", "Fuzzy", "Snappy", "Cuddles", "Cupcake", "Squishy", "Coco", "Sarah", "Emily", "Lily", "Sophie", "Chloe", "Poppy", "Zoe", "Princess", "Astra", "Angel", "Snuffles", "Ms. Wiggles"];
        
        setShapeler(s => ({
            name: chosenGenderMale ? boyNames[Math.floor(Math.random() * boyNames.length)] : girlNames[Math.floor(Math.random() * girlNames.length)],
            male: chosenGenderMale,
            baby: Math.random() < 0.2 ? true : false,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: types[Math.floor(Math.random() * types.length)],
            mood: chosenMood,
            eyebrow: moodFeatures[chosenMood].eyebrow,
            mouth: moodFeatures[chosenMood].mouth,
            pupil: moodFeatures[chosenMood].pupil,
        }));
    }

    useEffect(() => {
        if (!savedShapelers) return;
        if (savedShapelers[shapelerIndex]) {
            setShapeler(savedShapelers[shapelerIndex]);
        } else {
            setShapeler(DEFAULT_SHAPELER);
        }
        setLoaded(true);
    }, [shapelerIndex, savedShapelers]);

    return (
        <div className = "absolute top-0 left-0 w-full h-full min-h-220">
            <button onClick={() => {localStorage.clear(); location.reload()}} className="fixed z-10 bottom-2 right-5 text-[#5b4636] font-bold cursor-pointer hover:bg-[#d7bd8d] px-3 py-1 rounded-2xl border-5 border-transparent hover:border-[#b3855e] transition-all ease-in-out duration-300 hover:-translate-y-2">Clear Data</button>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                { loaded && <Shapeler color={shapeler.color} type={shapeler.type} male={shapeler.male} baby={shapeler.baby} pupil={shapeler.pupil} mouth={shapeler.mouth} eyebrow={shapeler.eyebrow} editing /> }
                <button onClick={() => {if (shapelerIndex > 0) setShapelerIndex(shapelerIndex-1);}} className="relative w-12 right-5 -scale-x-100 cursor-pointer transition-transform ease-in-out duration-300 hover:-translate-y-2">
                    <img src="/UI/arrow.png" className={`w-12 ${shapelerIndex <= 0 ? "hidden" : ""}`}/>
                </button>
                <input spellCheck="false" autoCorrect="off" autoCapitalize="none" autoComplete="off" className="relative bottom-65 text-6xl font-bold text-[#5b4636] border-b-4 text-center w-100 min-w-100 focus-visible:outline-none" placeholder={shapeler.baby ? shapeler.type.slice(0, -1) + "t" : shapeler.type} value={shapeler.name} onChange={(e) => setShapeler(s => ({...s, name:e.target.value}))}/>
                <div className="absolute bottom-60 flex flex-row gap-3 bg-[#d7bd8d] px-3 py-2 rounded-2xl border-5 border-[#b3855e] text-[#5b4636] font-bold">
                    <button onClick={() => {saveShapeler()}} className="bg-[#d7bd8d] cursor-pointer  transition-transform ease-in-out duration-300 hover:-translate-y-1 focus-visible:outline-none">
                        <FontAwesomeIcon icon={faFloppyDisk} className="size-6"/>
                    </button>
                    <button onClick={() => randomizeShapeler()} className="cursor-pointer transition-transform ease-in-out duration-300 hover:-translate-y-1 focus-visible:outline-none">
                        <FontAwesomeIcon icon={faDice} className="size-6"/>
                    </button>
                    <button onClick={() => setShapeler(DEFAULT_SHAPELER)} className="cursor-pointer transition-transform ease-in-out duration-300 hover:-translate-y-1 focus-visible:outline-none">
                        <FontAwesomeIcon icon={faArrowRotateRight} className="text-red-500 size-6"/>
                    </button>
                </div>
                <button onClick={() => {if (!savedShapelers || shapelerIndex < savedShapelers.length) setShapelerIndex(shapelerIndex+1);}} className="relative w-12 left-5 cursor-pointer transition-transform ease-in-out duration-300 hover:-translate-y-2">
                    <img src="/UI/arrow.png" className={`w-12 ${!savedShapelers || shapelerIndex >= savedShapelers.length ? "hidden" : ""}`}/>
                </button>
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
                    <button className={`h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Normal" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Normal", eyebrow: moodFeatures["Normal"].eyebrow, mouth: moodFeatures["Normal"].mouth, pupil: moodFeatures["Normal"].pupil }));}}>
                        Normal
                    </button>
                    <button className={`h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Hungry" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Hungry", eyebrow: moodFeatures["Hungry"].eyebrow, mouth: moodFeatures["Hungry"].mouth, pupil: moodFeatures["Hungry"].pupil }));}}>
                        Hungry
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Happy" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Happy", eyebrow: moodFeatures["Happy"].eyebrow, mouth: moodFeatures["Happy"].mouth, pupil: moodFeatures["Happy"].pupil }));}}>
                        Happy
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Sad" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Sad", eyebrow: moodFeatures["Sad"].eyebrow, mouth: moodFeatures["Sad"].mouth, pupil: moodFeatures["Sad"].pupil }));}}>
                        Sad
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Angry" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Angry", eyebrow: moodFeatures["Angry"].eyebrow, mouth: moodFeatures["Angry"].mouth, pupil: moodFeatures["Angry"].pupil }));}}>
                        Angry
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Excited" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Excited", eyebrow: moodFeatures["Excited"].eyebrow, mouth: moodFeatures["Excited"].mouth, pupil: moodFeatures["Excited"].pupil }));}}>
                        Excited
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Confused" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Confused", eyebrow: moodFeatures["Confused"].eyebrow, mouth: moodFeatures["Confused"].mouth, pupil: moodFeatures["Confused"].pupil }));}}>
                        Confused
                    </button>
                    <button className={`${shapeler.baby == true ? "hidden" : ""} h-11 px-3 cursor-pointer rounded-2xl bg-[#d7bd8d] flex items-center justify-center border-5 text-[#5b4636] transition-all ease-in-out duration-300 hover:-translate-y-1 ${shapeler.mood=="Shocked" ? "border-[#cfa37d]" : "border-[#b3855e]"}`} onClick={() => {setShapeler(s => ({ ...s, mood: "Shocked", eyebrow: moodFeatures["Shocked"].eyebrow, mouth: moodFeatures["Shocked"].mouth, pupil: moodFeatures["Shocked"].pupil }));}}>
                        Shocked
                    </button>
                </div>
                
            </div>

        </div>
    )
}