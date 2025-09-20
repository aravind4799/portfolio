import { useEffect, useRef } from "react";
import {Star, Comet} from "../lib/types";
export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    const comets: Comet[] = [];
    const mouse = { x: null as number | null, y: null as number | null };
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
    };

    const createStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < starCount; i++) {
        const distanceFromCenter = (1 - Math.pow(Math.random(), 3)) * Math.max(center.x, center.y) * 0.8;
        stars.push({
          radius: Math.random() * 1.5 + 0.5,
          distanceFromCenter: distanceFromCenter,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() * 0.0005) + 0.0001,
          parallax: Math.random() * 0.5 + 0.1,
          opacity: Math.random(),
          twinkleSpeed: (Math.random() - 0.5) * 0.015,
        });
      }
    };

    const createComet = () => {
        const side = Math.floor(Math.random() * 4);
        let x, y, angle;
        if (side === 0) { x = Math.random() * canvas.width; y = 0; angle = Math.random() * Math.PI; }
        else if (side === 1) { x = canvas.width; y = Math.random() * canvas.height; angle = Math.random() * Math.PI + Math.PI / 2; }
        else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height; angle = Math.random() * Math.PI + Math.PI; }
        else { x = 0; y = Math.random() * canvas.height; angle = Math.random() * Math.PI - Math.PI / 2; }
        comets.push({ x, y, angle, speed: Math.random() * 5 + 5, length: Math.random() * 150 + 50, life: 100 });
    };
    
    let animationFrameId: number;
    const animate = () => {
      const time = Date.now() * 0.0002;
      const blueValue = Math.floor(Math.sin(time) * 15 + 30);
      ctx.fillStyle = `rgb(3, 0, ${blueValue})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.angle += star.speed;
        const baseX = center.x + star.distanceFromCenter * Math.cos(star.angle);
        const baseY = center.y + star.distanceFromCenter * Math.sin(star.angle);
        let finalX = baseX, finalY = baseY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - center.x;
          const dy = mouse.y - center.y;
          finalX = baseX - dx * star.parallax * 0.05;
          finalY = baseY - dy * star.parallax * 0.05;
        }

        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed *= -1;
        
        ctx.beginPath();
        ctx.arc(finalX, finalY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, Math.max(0, star.opacity) + 0.2)})`;
        ctx.fill();
      });

      if (Math.random() < 0.01) createComet();
      
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.life--;
        if (comet.life <= 0) { comets.splice(i, 1); continue; }
        const tailX = comet.x - Math.cos(comet.angle) * comet.length;
        const tailY = comet.y - Math.sin(comet.angle) * comet.length;
        const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.life / 100})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath(); ctx.moveTo(comet.x, comet.y); ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient; ctx.lineWidth = 2; ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => { mouse.x = event.clientX; mouse.y = event.clientY; };
    const handleResize = () => { setCanvasSize(); createStars(); };

    setCanvasSize();
    createStars();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};