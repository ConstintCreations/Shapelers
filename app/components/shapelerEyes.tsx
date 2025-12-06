"use client";
import { useEffect, useState } from "react";

export default function ShapelerEyes({ pupil="Normal", type, baby=false, male=true }: { pupil?: "Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small", type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler", baby?:boolean, male?:boolean }) {

    const offsets = {
        "Bloopler": { eyes: { x:40, y:48 }, pupils: { x:80, y:48 } },
        "Googler": { eyes: { x:40, y:40 }, pupils: { x:80, y:40 } },
        "Sprickler": { eyes: { x:20, y:40 }, pupils: { x:60, y:40 } },
        "Stronkler": { eyes: { x:60, y:48 }, pupils: { x:100, y:48 } },
    }

    const babyOffSets = { 
        "Bloopler": { eyes: { x:28, y:24 }, pupils: { x:48, y:24 } },
        "Googler": { eyes: { x:36, y:16 }, pupils: { x:56, y:16 } },
        "Sprickler": { eyes: { x:4, y:24 }, pupils: { x:24, y:24 } },
        "Stronkler": { eyes: { x:24, y:32 }, pupils: { x:44, y:32 } },
    }

    const bounds = {
        x: 25, y: 20
    }

    const babyBounds = {
        x: 15, y: 10
    }
    
    const selectedOffsets = baby ? babyOffSets[type] : offsets[type];
    const selectedBounds = baby ? babyBounds : bounds;

    const [mousePercent, setMousePercent] = useState({x: 50, y: 50});

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 100;
            const y = (event.clientY / window.innerHeight) * 100;
            setMousePercent({ x: Math.min(100, Math.max(1, x)), y: Math.min(100, Math.max(1, y)) });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    function clampPercent(value: number, min: number, max: number) {
        if (value < min) return 0;
        if (value > max) return 100;
        return ((value - min) / (max - min)) * 100;
    }

    const mousePercentClamped = {
        x: clampPercent(mousePercent.x, 25, 75),
        y: clampPercent(mousePercent.y, 25, 75),
    }

    const pupilLookOffset = {
        x: ((mousePercentClamped.x - 50) / 50) * -selectedBounds.x,
        y: ((mousePercentClamped.y - 50) / 50) * -selectedBounds.y,
    }

    return(
        <div className="flex flex-row justify-center items-center space-between w-full h-full absolute">
            <div className="flex flex-row justify-center items-center space-between w-full h-full absolute">
                <img className="relative" style={{bottom: selectedOffsets.eyes.y, right: selectedOffsets.eyes.x}} src={baby ? `/Parts/Shapelet/Eyes/Shapelet-Eye-${male ? "Male" : "Female" }.png` : `/Parts/Shapeler/Eyes/Eye-${male ? "Male" : "Female" }.png` } />
                <img className="relative -scale-x-100" style={{bottom: selectedOffsets.eyes.y, left: selectedOffsets.eyes.x}} src={baby ? `/Parts/Shapelet/Eyes/Shapelet-Eye-${male ? "Male" : "Female" }.png` : `/Parts/Shapeler/Eyes/Eye-${male ? "Male" : "Female" }.png` } />
            </div>
            <img className="relative" style={{bottom: selectedOffsets.pupils.y + pupilLookOffset.y, right: selectedOffsets.pupils.x + pupilLookOffset.x}} src={baby ? `/Parts/Shapelet/Eyes/Pupils/Shapelet-Pupil-${pupil}.png` : `/Parts/Shapeler/Eyes/Pupils/Pupil-${pupil}.png` } />
            <img className="relative -scale-x-100" style={{bottom: selectedOffsets.pupils.y + pupilLookOffset.y, left: selectedOffsets.pupils.x -pupilLookOffset.x}} src={baby ? `/Parts/Shapelet/Eyes/Pupils/Shapelet-Pupil-${pupil}.png` : `/Parts/Shapeler/Eyes/Pupils/Pupil-${pupil}.png` } />
        </div>
    )
}