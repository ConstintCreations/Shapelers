export default function ShapelerMouth({ mouth="Normal", type, baby=false }: { mouth?: "Normal" | "Happy" | "Mad" | "Sad" | "Shocked" | "Big-Wave" | "Small-Wave" | "Wide", type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler", baby?:boolean }) {
    
    const offsets = {
        "Bloopler": 50,
        "Googler": 50,
        "Sprickler": 70,
        "Stronkler": 60,
    }

    const babyOffSets = { 
        "Bloopler": 30,
        "Googler": 20,
        "Sprickler": 20,
        "Stronkler": 30,
    }
    
    const selectedOffsets = baby ? babyOffSets[type] : offsets[type];
    
    return (
        <div className="absolute flex flex-row justify-center items-center w-full h-full">
            <img className="relative" style={{top: selectedOffsets}} src={baby ? `/Parts/Shapelet/Mouths/Shapelet-Mouth-${mouth}.png` : `/Parts/Shapeler/Mouths/Mouth-${mouth}.png`} />
        </div>
    )
}