"use client";
import { useEffect, useState } from "react";

export default function ShapelerEyes({ pupil="Normal", type, baby=false, male=true, blinkDurationCenter=200, blinkDurationSpread=100, blinkDelayCenter=5000, blinkDelaySpread=1000, editing=false }: { pupil?: "Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small", type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler", baby?:boolean, male?:boolean, blinkDurationCenter?:number, blinkDurationSpread?:number, blinkDelayCenter?:number, blinkDelaySpread?:number, editing?:boolean }) {

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
    const [mouseDown, setMouseDown] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 100;
            const y = (event.clientY / window.innerHeight) * 100;
            setMousePercent({ x: Math.min(100, Math.max(1, x)), y: Math.min(100, Math.max(1, y)) });
        };

        

        let timeout: number;
        const scheduleBlink = () => {
            const blinkDelay = Math.random() * blinkDelaySpread + blinkDelayCenter;
            const blinkDuration = Math.random() * blinkDurationSpread + blinkDurationCenter;

            timeout = window.setTimeout(() => {
                setIsBlinking(true);
                setTimeout(() => {
                    setIsBlinking(false);
                    scheduleBlink();
                }, blinkDuration);
            }, blinkDelay);
        }

        scheduleBlink();
        
        const handleDown = () => setMouseDown(true);
        const handleUp = () => setMouseDown(false);

        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
            clearTimeout(timeout);
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
            <img className="relative" style={{bottom: selectedOffsets.pupils.y + (editing ? pupilLookOffset.y : 0), right: selectedOffsets.pupils.x + (editing ? pupilLookOffset.x : 0)}} src={baby ? `/Parts/Shapelet/Eyes/Pupils/Shapelet-Pupil-${(editing && mouseDown) || isBlinking ? "Blink" : (pupil == "Normal" || pupil == "Blink" ? pupil : "Normal")}.png` : `/Parts/Shapeler/Eyes/Pupils/Pupil-${(editing && mouseDown) || isBlinking ? "Blink" : pupil}.png` } />
            <img className="relative -scale-x-100" style={{bottom: selectedOffsets.pupils.y + (editing ? pupilLookOffset.y : 0), left: selectedOffsets.pupils.x - (editing ? pupilLookOffset.x : 0)}} src={baby ? `/Parts/Shapelet/Eyes/Pupils/Shapelet-Pupil-${(editing && mouseDown) || isBlinking ? "Blink" : (pupil == "Normal" || pupil == "Blink" ? pupil : "Normal")}.png` : `/Parts/Shapeler/Eyes/Pupils/Pupil-${(editing && mouseDown) || isBlinking ? "Blink" : pupil}.png` } />
        </div>
    )
}