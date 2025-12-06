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
        <div className = "flex flex-row gap-10 w-full h-full justify-start">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-2">
                <Shapeler color={color} type={type} male={male} baby={baby} pupil={pupil} mouth={mouth} eyebrow={eyebrow} editing />
            </div>

            <div className="flex flex-col gap-4">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>

            <div className="flex flex-col gap-4">
                <select value={mouth} onChange={(e) => setMouth(e.target.value as any)}>
                    <option value="Normal">Normal</option>
                    <option value="Happy">Happy</option>
                    <option value="Mad">Mad</option>
                    <option value="Sad">Sad</option>
                    <option value="Shocked">Shocked</option>
                    <option value="Big-Wave">Big-Wave</option>
                    <option value="Small-Wave">Small-Wave</option>
                    <option value="Wide">Wide</option>
                </select>
            </div>
            
            <div className="flex flex-col gap-4">
                <input type="checkbox" checked={!male} onChange={(e) => setMale(!e.target.checked)} />
            </div>

            <div className="flex flex-col gap-4">
                <input type="checkbox" checked={baby} onChange={(e) => setBaby(e.target.checked)} />
            </div>

            <div className="flex flex-col gap-4">
                <select value={pupil} onChange={(e) => setPupil(e.target.value as any)}>
                    <option value="Normal">Normal</option>
                    <option value="Blink">Blink</option>
                    <option value="Crazy">Crazy</option>
                    <option value="Dizzy">Dizzy</option>
                    <option value="Excited">Excited</option>
                    <option value="Small">Small</option>
                </select>
            </div>

            <div className="flex flex-col gap-4">
                <select value={eyebrow} onChange={(e) => setEyebrow(e.target.value as any)}>
                    <option value="Normal">Normal</option>
                    <option value="Confused">Confused</option>
                    <option value="Excited">Excited</option>
                    <option value="Excited-Surround">Excited-Surround</option>
                    <option value="Mad">Mad</option>
                    <option value="Scared-Under-Round">Scared-Under-Round</option>
                    <option value="Worried">Worried</option>
                </select>
            </div>

            <div className="flex flex-col gap-4">
                <select value={type} onChange={(e) => setType(e.target.value as any)}>
                    <option value="Bloopler">Bloopler</option>
                    <option value="Googler">Googler</option>
                    <option value="Sprickler">Sprickler</option>
                    <option value="Stronkler">Stronkler</option>
                </select>
            </div>

        </div>
    )
}