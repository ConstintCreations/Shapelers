"use client";
import { useEffect, useRef } from "react";

export default function ColorShapelerBody({ color, type, baby=false }: { color: string, type: "Bloopler" | "Googler" | "Sprickler" | "Stronkler", baby?:boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const bodyPath = baby ? `/Parts/Shapelet/Bodies/Body-${type.slice(0, -1)}t.png` : `/Parts/Shapeler/Bodies/Body-${type}.png`;
        const outlinePath = baby ? `/Parts/Shapelet/Bodies/Outlines/Body-Outline-${type.slice(0, -1)}t.png` : `/Parts/Shapeler/Bodies/Outlines/Body-Outline-${type}.png`;

        if (!canvasRef.current || !bodyPath || !outlinePath || !color) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const bodyImage = new Image();
        bodyImage.src = bodyPath;
        bodyImage.onload = () => {
            canvas.width = bodyImage.width;
            canvas.height = bodyImage.height;

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(bodyImage, 0, 0);
            const outlineImage = new Image();
            outlineImage.src = outlinePath;
            outlineImage.onload = () => {
                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(outlineImage, 0, 0);
            };
        }
    }, [color, baby, type]);

    return <canvas ref={canvasRef} />;
}