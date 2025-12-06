"use client";
import { useEffect, useRef } from "react";

export default function ShapelerEyebrows({ eyebrow="Normal", type, baby=false, editing=false }: { eyebrow?: "Normal" | "Confused" | "Excited" | "Excited-Surround" | "Mad" | "Scared-Under-Round" | "Worried", type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler", baby?:boolean, editing?:boolean }) {

    const offsets = {
        "Bloopler": { eyes: { x:40, y:48 }, brow: { y: 144}},
        "Googler": { eyes: { x:40, y:40 }, brow: { y: 144}},
        "Sprickler": { eyes: { x:20, y:40 }, brow: { y: 120}},
        "Stronkler": { eyes: { x:60, y:48 }, brow: { y: 132}},
    }

    const babyOffSets = { 
        "Bloopler": { eyes: { x:28, y:24 }, brow: { y: 72}},
        "Googler": { eyes: { x:36, y:16 }, brow: { y: 68}},
        "Sprickler": { eyes: { x:4, y:24 }, brow: { y: 68}},
        "Stronkler": { eyes: { x:24, y:32 }, brow: { y: 78}},
    }
    
    const selectedOffsets = baby ? babyOffSets[type] : offsets[type];

    return(
        <div className="flex flex-row justify-center items-center space-between w-full h-full absolute">
                <img className="relative" style={{bottom: selectedOffsets.brow.y, right: selectedOffsets.eyes.x}} src={baby ? `/Parts/Shapelet/Eyebrows/Shapelet-Eyebrow-Normal.png` : `/Parts/Shapeler/Eyebrows/Eyebrow-${eyebrow}.png` } />
                <img className="relative -scale-x-100" style={{bottom: selectedOffsets.brow.y, left: selectedOffsets.eyes.x}} src={baby ? `/Parts/Shapelet/Eyebrows/Shapelet-Eyebrow-Normal.png` : `/Parts/Shapeler/Eyebrows/Eyebrow-${eyebrow}.png` } />
        </div>
    )
}