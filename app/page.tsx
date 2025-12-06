import Shapeler from "./components/shapeler";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <Shapeler color="#a1e287ff" type="Googler" pupil="Normal" male={true} baby />
    </div>
  );
}
