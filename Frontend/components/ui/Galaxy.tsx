import React, { useRef, useEffect } from 'react';

interface GalaxyProps {
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  transparent?: boolean;
}

export const Galaxy: React.FC<GalaxyProps> = ({
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  speed = 1,
  glowIntensity = 0.3,
  saturation = 0,
  mouseRepulsion = false,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  transparent = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    
    // Particle class
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number;
      angle: number;
      radius: number;
      brightness: number;
      speedOffset: number;
      originalRadius: number;

      constructor(w: number, h: number) {
        this.angle = Math.random() * Math.PI * 2;
        // Distribute particles with a bias towards center (simulating galaxy core)
        this.radius = Math.random() * (Math.min(w, h) / 1.5) * Math.random(); 
        this.originalRadius = this.radius;
        this.size = Math.random() * 2 * (1 + glowIntensity);
        this.brightness = Math.random();
        this.speedOffset = Math.random();
      }

      update(time: number, w: number, h: number) {
        // Orbital rotation
        this.angle += (rotationSpeed * 0.001 * speed) + ((1/this.radius) * starSpeed * 0.1);

        // Twinkle
        this.brightness += (Math.random() - 0.5) * twinkleIntensity * 0.1;
        this.brightness = Math.max(0, Math.min(1, this.brightness));

        // Mouse Repulsion
        if (mouseRepulsion) {
            const centerX = w / 2;
            const centerY = h / 2;
            const px = centerX + Math.cos(this.angle) * this.radius;
            const py = centerY + Math.sin(this.angle) * this.radius;
            
            const dx = mouseRef.current.x - px;
            const dy = mouseRef.current.y - py;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 200) {
                const force = (200 - dist) / 200;
                this.radius += force * repulsionStrength;
            } else if (this.radius > this.originalRadius) {
                this.radius -= (this.radius - this.originalRadius) * 0.05;
            }
        }

        // Calculate final position
        this.x = (w / 2) + Math.cos(this.angle) * this.radius;
        this.y = (h / 2) + Math.sin(this.angle) * this.radius;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        // Dynamic color calculation based on props
        // If brightness is high, go towards white. If low, towards the hue.
        // For saturation=0 (grayscale), hue doesn't matter much.
        
        // We use a dark grey/black base for the particles if the theme is implied light
        // But galaxies usually glow. We'll use HSL.
        const lightness = 30 + (this.brightness * 50); // 30% to 80% lightness
        
        ctx.fillStyle = `hsla(${hueShift}, ${saturation}%, ${lightness}%, ${this.brightness})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      const count = Math.floor(density * 1000); // 1000 particles at density 1
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = (time: number) => {
      if (!transparent) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach(p => {
        p.update(time, canvas.width, canvas.height);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        init();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    window.addEventListener('resize', handleResize);
    if (mouseRepulsion) {
        window.addEventListener('mousemove', handleMouseMove);
    }

    // Initial setup
    handleResize();
    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [starSpeed, density, hueShift, speed, glowIntensity, saturation, mouseRepulsion, repulsionStrength, twinkleIntensity, rotationSpeed, transparent]);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};