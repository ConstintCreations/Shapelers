"use client";
import { useEffect, useRef } from "react";

export default function ColorSwatch({ color }: { color: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const swatchPath = "/UI/blankColorSwatch.png";
        if (!canvasRef.current || !swatchPath || !color) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const swatchImage = new Image();
        swatchImage.src = swatchPath;
        swatchImage.onload = () => {
            canvas.width = swatchImage.width;
            canvas.height = swatchImage.height;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(swatchImage, 0, 0);
        }
    }, [color]);
    return <canvas className="h-9" ref={canvasRef} />;
}