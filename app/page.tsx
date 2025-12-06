import ColorShapelerBody from "./components/colorShapelerBody";
import ShapelerEyes from "./components/shapelerEyes";
import ShapelerEyebrows from "./components/shapelerEyebrows";
import ShapelerMouth from "./components/shapelerMouth";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute">
        <ShapelerMouth type="Sprickler" mouth="Sad" />
        <ShapelerEyebrows type="Sprickler" eyebrow="Worried" />
        <ShapelerEyes type="Sprickler" male={true} pupil="Crazy" />
        <ColorShapelerBody color="#b787e2ff" type="Sprickler" />
      </div>
    </div>
  );
}
