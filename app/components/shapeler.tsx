import ColorShapelerBody from "./colorShapelerBody";
import ShapelerEyes from "./shapelerEyes";
import ShapelerEyebrows from "./shapelerEyebrows";
import ShapelerMouth from "./shapelerMouth";

export default function Shapeler({color, type, male=true, pupil="Normal", mouth="Normal", eyebrow="Normal", baby=false, editing=false}: {color: string, type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler", male: boolean, pupil?: "Normal" | "Blink" | "Crazy" | "Dizzy" | "Excited" | "Small", mouth?: "Normal" | "Happy" | "Mad" | "Sad" | "Shocked" | "Big-Wave" | "Small-Wave" | "Wide", eyebrow?: "Normal" | "Confused" | "Excited" | "Excited-Surround" | "Mad" | "Scared-Under-Round" | "Worried", baby?: boolean, editing?: boolean }) {
    return (
        <div className="absolute">
            <ShapelerMouth type={type} mouth={mouth} baby={baby} editing={editing}/>
            <ShapelerEyebrows type={type} eyebrow={eyebrow} baby={baby} editing={editing}/>
            <ShapelerEyes type={type} male={male} pupil={pupil} baby={baby} editing={editing}/>
            <ColorShapelerBody color={color} type={type} baby={baby} editing={editing}/>
        </div>
    )
}