import React, { useRef, useEffect } from "react";

interface StarProps {
  rotationSpeedX?: number;  // radians per frame
  rotationSpeedY?: number;  // radians per frame
  color?: string;
  size?: number;  // pixels
  lineWidth?: number;
  twinkle?: boolean;  // Add new prop
  style?: React.CSSProperties;
}

const Star = ({ 
  rotationSpeedX = 0.02, 
  rotationSpeedY = 0.03, 
  color = "white", 
  size = 500,
  lineWidth = 2,
  twinkle = false,  // Add default value
  style
}: StarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = size;
    canvas.height = size;

    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    // Define star vertices in 3D
    const starVertices = [
      [0, 1, 0],      // top
      [0.2, 0.3, 0.2],
      [1, 0, 0],      // right
      [0.2, -0.3, 0.2],
      [0, -1, 0],     // bottom
      [-0.2, -0.3, 0.2],
      [-1, 0, 0],     // left
      [-0.2, 0.3, 0.2],
      [0, 0, -0.6],   // back point
      [0, 0, 0.6],    // front point (added)
    ];

    const starEdges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0],
      [0, 8],
      [2, 8],
      [4, 8],
      [6, 8],
      [0, 9],         // connect to front point
      [2, 9],
      [4, 9],
      [6, 9],
    ];

    let angleX = 0;
    let angleY = 0;

    let opacity = 1;
    let opacityDelta = -0.02;  // Increased speed (was -0.02)

    const project = ([x, y, z]: [number, number, number]) => {
      const scale = (size * 0.4) / (z + 3); // Adjusted scale based on canvas size
      return [
        x * scale + center.x,
        y * scale + center.y,
      ];
    };

    const rotate = ([x, y, z]: [number, number, number], angleX: number, angleY: number) => {
      // Rotate around X-axis
      const tempY = y * Math.cos(angleX) - z * Math.sin(angleX);
      let tempZ = y * Math.sin(angleX) + z * Math.cos(angleX);
      y = tempY;
      z = tempZ;

      // Rotate around Y-axis
      const tempX = x * Math.cos(angleY) - z * Math.sin(angleY);
      tempZ = x * Math.sin(angleY) + z * Math.cos(angleY);
      x = tempX;
      z = tempZ;

      return [x, y, tempZ];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update opacity for twinkling effect
      if (twinkle) {
        opacity += opacityDelta;
        if (opacity <= 0.7 || opacity >= 1) {
          // Randomize the direction and speed of the opacity change
          opacityDelta = (Math.random() * 0.1 - 0.05) * (opacity <= 0.7 ? 1 : -1);
          opacity = Math.max(0.7, Math.min(1, opacity)); // Clamp to new range
        }
      }

      ctx.strokeStyle = color.startsWith('rgba') ? color : `rgba(${color === 'white' ? '255,255,255' : '255,255,255'}, ${opacity})`;
      ctx.lineWidth = lineWidth;

      const rotatedVertices = starVertices.map((v) =>
        rotate(v as [number, number, number], angleX, angleY)
      );
      const projectedVertices = rotatedVertices.map((v) =>
        project(v as [number, number, number])
      );

      ctx.beginPath();
      starEdges.forEach(([start, end]) => {
        const [x1, y1] = projectedVertices[start];
        const [x2, y2] = projectedVertices[end];
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      });
      ctx.stroke();
    };

    const animate = () => {
      angleX += rotationSpeedX;
      angleY += rotationSpeedY;
      draw();
      requestAnimationFrame(animate);
    };

    animate();
  }, [color, size, rotationSpeedX, rotationSpeedY, lineWidth, twinkle]);  // Add twinkle to dependencies

  return <canvas ref={canvasRef} style={{ background: "transparent", width: size, height: size, ...style }} />;
};

export default Star;
