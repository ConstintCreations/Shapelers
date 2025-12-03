import ColorShapelerBody from "./components/colorShapelerBody";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ColorShapelerBody color="#e28787" type="Googler" baby />
    </div>
  );
}
