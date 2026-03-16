import React, { useEffect, useRef } from 'react';
import { ThemeContext } from '../App';

export function Globe({ className = '' }: { className?: string }) {
  const { theme } = React.useContext(ThemeContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const C = canvas.getContext('2d');
    if (!C) return;

    const SZ = 1020;
    canvas.width = SZ;
    canvas.height = SZ;
    const CX = SZ / 2, CY = SZ / 2, R = 390;

    let rotY = 1.55, rotX = 0.22; // centred on India/Asia
    let autoRot = true, drag = false, lmx = 0, lmy = 0, t = 0, ping = 0;
    let animationFrameId: number;

    // Orthographic projection
    function proj(lon: number, lat: number) {
      const f = lat * Math.PI / 180, l = lon * Math.PI / 180;
      let x = Math.cos(f) * Math.cos(l), y = Math.sin(f), z = Math.cos(f) * Math.sin(l);
      const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
      const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
      const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
      return { sx: CX + x1 * R, sy: CY - y2 * R, vis: z2 > -0.08, depth: z2 };
    }

    // Continent outlines [lon,lat]
    const LAND = [
      // North America
      [[-168, 71], [-140, 72], [-100, 75], [-85, 72], [-63, 45], [-55, 48], [-65, 44], [-76, 42], [-83, 42], [-90, 46], [-100, 55], [-112, 63], [-126, 50], [-124, 37], [-115, 30], [-105, 20], [-90, 15], [-83, 10], [-80, 10], [-82, 10], [-88, 16], [-97, 19], [-105, 20], [-115, 30], [-124, 37], [-130, 54], [-140, 60], [-155, 59], [-162, 60], [-165, 64], [-168, 71]],
      // South America
      [[-80, 12], [-63, 10], [-53, 4], [-50, -1], [-38, -10], [-35, -8], [-38, -14], [-40, -20], [-45, -25], [-52, -33], [-60, -38], [-65, -55], [-68, -50], [-70, -30], [-72, -15], [-80, 0], [-80, 12]],
      // Europe
      [[-9, 36], [3, 36], [16, 37], [28, 38], [35, 42], [30, 45], [28, 43], [26, 46], [28, 56], [30, 60], [28, 70], [20, 71], [15, 70], [10, 57], [5, 50], [0, 46], [-5, 43], [-9, 36]],
      // Africa
      [[-18, 15], [-16, 10], [-14, 5], [-10, -2], [-8, -6], [10, -18], [20, -35], [30, -35], [40, -18], [50, -5], [45, 10], [42, 14], [43, 22], [38, 22], [32, 30], [25, 36], [10, 37], [0, 32], [-5, 35], [-10, 30], [-18, 15]],
      // Asia
      [[25, 42], [28, 40], [36, 36], [42, 12], [45, 23], [55, 25], [67, 24], [80, 8], [100, 5], [115, 5], [125, 8], [135, 35], [145, 44], [140, 54], [135, 54], [130, 48], [120, 54], [110, 53], [100, 50], [90, 50], [80, 45], [70, 42], [60, 36], [50, 30], [42, 36], [35, 36], [28, 40], [25, 42]],
      // India sub
      [[68, 23], [72, 22], [75, 8], [80, 8], [80, 14], [84, 18], [88, 22], [88, 27], [82, 28], [80, 30], [77, 28], [73, 22], [68, 23]],
      // Arabian peninsula
      [[37, 27], [44, 12], [58, 21], [56, 24], [55, 25], [50, 28], [43, 22], [37, 27]],
      // SE Asia
      [[100, 5], [103, 1], [105, -5], [108, -7], [115, -8], [120, -8], [125, 1], [120, 5], [115, 5], [105, 11], [100, 13], [100, 5]],
      // Japan
      [[130, 31], [135, 34], [139, 36], [141, 38], [141, 41], [132, 43], [130, 31]],
      // Australia
      [[115, -25], [120, -22], [130, -15], [136, -12], [139, -17], [146, -18], [151, -24], [153, -27], [150, -38], [145, -40], [140, -38], [130, -32], [120, -32], [115, -25]],
      // Greenland
      [[-25, 83], [-10, 77], [-18, 65], [-45, 60], [-55, 65], [-50, 78], [-25, 83]],
      // Scandinavia
      [[5, 58], [8, 57], [12, 56], [18, 56], [20, 60], [26, 65], [28, 70], [20, 71], [15, 70], [10, 58], [5, 58]],
    ];

    const DELHI = { lon: 77.2, lat: 28.6 };

    function drawLand(pts: number[][]) {
      if (!C) return;
      C.beginPath();
      let first = true, lastVis = false;
      pts.forEach(([lon, lat]) => {
        const p = proj(lon, lat);
        if (p.vis) { 
          if (first || !lastVis) { 
            C.moveTo(p.sx, p.sy); 
            first = false; 
          } else {
            C.lineTo(p.sx, p.sy); 
          }
          lastVis = true; 
        } else { 
          lastVis = false; 
        }
      });
      C.closePath();
      C.fillStyle = theme === 'light' ? 'rgba(220, 220, 220, 0.5)' : 'rgba(20,55,8,0.75)'; C.fill();
      C.strokeStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(179,255,0,0.3)'; C.lineWidth = 0.7; C.stroke();
    }

    function drawGrid() {
      if (!C) return;
      for (let lat = -75; lat <= 75; lat += 15) {
        C.beginPath(); let f = true;
        for (let lon = -180; lon <= 180; lon += 3) { 
          const p = proj(lon, lat); 
          if (p.vis) { 
            f ? C.moveTo(p.sx, p.sy) : C.lineTo(p.sx, p.sy); 
            f = false; 
          } else {
            f = true; 
          }
        }
        C.strokeStyle = theme === 'light' 
          ? `rgba(0,0,0,${lat === 0 ? 0.2 : 0.05})`
          : `rgba(179,255,0,${lat === 0 ? 0.2 : 0.07})`; 
        C.lineWidth = lat === 0 ? 0.8 : 0.35; 
        C.stroke();
      }
      for (let lon = -180; lon < 180; lon += 15) {
        C.beginPath(); let f = true;
        for (let lat = -90; lat <= 90; lat += 2) { 
          const p = proj(lon, lat); 
          if (p.vis) { 
            f ? C.moveTo(p.sx, p.sy) : C.lineTo(p.sx, p.sy); 
            f = false; 
          } else {
            f = true; 
          }
        }
        C.strokeStyle = theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(179,255,0,0.07)'; 
        C.lineWidth = 0.35; 
        C.stroke();
      }
    }

    function drawDelhi() {
      if (!C) return;
      const p = proj(DELHI.lon, DELHI.lat);
      if (!p.vis) return;
      const { sx, sy } = p;
      
      // Pulse rings
      for (let i = 0; i < 3; i++) {
        const ph = (ping + i * 0.33) % 1;
        const r = 5 + ph * 42;
        C.beginPath(); C.arc(sx, sy, r, 0, Math.PI * 2);
        C.strokeStyle = theme === 'light' ? `rgba(0, 0, 0,${(1 - ph) * 0.75})` : `rgba(179,255,0,${(1 - ph) * 0.75})`; C.lineWidth = 1.2; C.stroke();
      }
      
      // Center dot
      C.beginPath(); C.arc(sx, sy, 5, 0, Math.PI * 2); C.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(179,255,0,0.9)'; C.fill();
      C.beginPath(); C.arc(sx, sy, 2.5, 0, Math.PI * 2); C.fillStyle = theme === 'light' ? '#ffffff' : '#ffffff'; C.fill();
      
      // Crosshair
      C.setLineDash([3, 4]); C.strokeStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(179,255,0,0.55)'; C.lineWidth = 0.8;
      C.beginPath(); C.moveTo(sx - 22, sy); C.lineTo(sx + 22, sy); C.stroke();
      C.beginPath(); C.moveTo(sx, sy - 22); C.lineTo(sx, sy + 22); C.stroke();
      C.setLineDash([]);
      
      // Label
      const lx = sx + 14, ly = sy - 16;
      C.fillStyle = theme === 'light' ? 'rgba(255,255,255,0.88)' : 'rgba(4,5,13,0.88)'; C.fillRect(lx - 3, ly - 14, 116, 38);
      C.strokeStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(179,255,0,0.55)'; C.lineWidth = 0.8; C.strokeRect(lx - 3, ly - 14, 116, 38);
      C.fillStyle = theme === 'light' ? '#000000' : '#B3FF00'; C.font = 'bold 9px JetBrains Mono,monospace';
      C.fillText('◆ DELHI NCR', lx, ly);
      C.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(179,255,0,0.5)'; C.font = '8px JetBrains Mono,monospace';
      C.fillText('BASE 01 // 28.6°N 77.2°E', lx, ly + 15);
      C.beginPath(); C.moveTo(sx, sy); C.lineTo(lx - 3, ly + 10);
      C.strokeStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(179,255,0,0.3)'; C.lineWidth = 0.6; C.stroke();
    }

    const STARS = Array.from({ length: 220 }, () => ({
      x: Math.random() * SZ, y: Math.random() * SZ,
      r: Math.random() * 1.3 + 0.2, a: Math.random(),
      sp: (Math.random() - 0.5) * 0.006,
      col: Math.random() > 0.8 
        ? (theme === 'light' ? 'rgba(0, 0, 0,' : 'rgba(179,255,0,') 
        : (theme === 'light' ? 'rgba(0,0,0,' : 'rgba(240,239,235,')
    }));

    function draw() {
      if (!C || !canvas) return;
      C.clearRect(0, 0, SZ, SZ);
      t += 0.009; ping = (ping + 0.009) % 1;
      if (autoRot) rotY += 0.004;

      // Stars
      STARS.forEach(s => {
        const dx = s.x - CX, dy = s.y - CY;
        if (dx * dx + dy * dy < (R + 4) * (R + 4)) return;
        s.a += s.sp; if (s.a > 1 || s.a < 0.05) s.sp *= -1;
        C.beginPath(); C.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        C.fillStyle = s.col + s.a * 0.85 + ')'; C.fill();
      });

      // HUD rings
      C.save(); C.translate(CX, CY); C.rotate(t * 0.1);
      C.beginPath(); C.arc(0, 0, R + 42, 0, Math.PI * 2);
      C.setLineDash([7, 5]); C.strokeStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(179,255,0,0.18)'; C.lineWidth = 0.8; C.stroke();
      C.setLineDash([]); C.restore();

      C.save(); C.translate(CX, CY); C.rotate(-t * 0.06);
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        const r0 = R + 52, r1 = r0 + (i % 6 === 0 ? 14 : i % 3 === 0 ? 8 : 4);
        const al = i % 6 === 0 ? 0.6 : i % 3 === 0 ? 0.3 : 0.12;
        C.beginPath(); C.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); C.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
        C.strokeStyle = theme === 'light' ? `rgba(0, 0, 0,${al})` : `rgba(179,255,0,${al})`; C.lineWidth = i % 6 === 0 ? 1.2 : 0.5; C.stroke();
      }
      C.restore();

      C.save(); C.translate(CX, CY); C.rotate(t * 0.4);
      for (let i = 0; i < 18; i++) {
        const a0 = (i / 18) * Math.PI * 2, a1 = ((i + 0.55) / 18) * Math.PI * 2;
        C.beginPath(); C.arc(0, 0, R + 3, a0, a1);
        C.strokeStyle = i % 3 === 0 ? (theme === 'light' ? 'rgba(0, 0, 0, 0.65)' : 'rgba(179,255,0,0.65)') : (theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(179,255,0,0.15)');
        C.lineWidth = i % 3 === 0 ? 1.8 : 0.8; C.stroke();
      }
      C.restore();

      // Atmosphere glow
      const atmo = C.createRadialGradient(CX, CY, R - 6, CX, CY, R + 40);
      atmo.addColorStop(0, theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(179,255,0,0.05)');
      atmo.addColorStop(0.5, theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(80,160,0,0.08)');
      atmo.addColorStop(1, theme === 'light' ? 'rgba(0, 0, 0, 0)' : 'rgba(0,200,0,0)');
      C.beginPath(); C.arc(CX, CY, R + 40, 0, Math.PI * 2); C.fillStyle = atmo; C.fill();

      // Globe base
      C.save(); C.beginPath(); C.arc(CX, CY, R, 0, Math.PI * 2);
      const sg = C.createRadialGradient(CX - R * 0.3, CY - R * 0.3, R * 0.05, CX, CY, R);
      if (theme === 'light') {
        sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.6, '#f4f4f5'); sg.addColorStop(1, '#e4e4e7');
      } else {
        sg.addColorStop(0, '#0d1e06'); sg.addColorStop(0.6, '#060f03'); sg.addColorStop(1, '#020601');
      }
      C.fillStyle = sg; C.fill(); C.clip();

      drawGrid();
      LAND.forEach(pts => drawLand(pts));

      // Specular
      const hl = C.createRadialGradient(CX - R * .38, CY - R * .38, 0, CX - R * .3, CY - R * .3, R * .85);
      hl.addColorStop(0, theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.05)'); 
      hl.addColorStop(0.5, theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(179,255,0,0.02)'); 
      hl.addColorStop(1, 'rgba(0,0,0,0)');
      C.beginPath(); C.arc(CX, CY, R, 0, Math.PI * 2); C.fillStyle = hl; C.fill();

      drawDelhi();

      // Scanline
      const sy2 = ((t * 55) % SZ);
      const sl = C.createLinearGradient(0, sy2 - 5, 0, sy2 + 5);
      sl.addColorStop(0, 'rgba(179,255,0,0)'); 
      sl.addColorStop(.5, theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(179,255,0,0.07)'); 
      sl.addColorStop(1, 'rgba(179,255,0,0)');
      C.fillStyle = sl; C.fillRect(CX - R, sy2 - 5, R * 2, 10);
      C.restore();

      // Rim glow
      const rim = C.createRadialGradient(CX, CY, R * .93, CX, CY, R * 1.05);
      rim.addColorStop(0, 'rgba(179,255,0,0)'); 
      rim.addColorStop(.6, theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(179,255,0,0.07)'); 
      rim.addColorStop(1, theme === 'light' ? 'rgba(0, 0, 0, 0)' : 'rgba(50,150,0,0)');
      C.beginPath(); C.arc(CX, CY, R * 1.05, 0, Math.PI * 2); C.fillStyle = rim; C.fill();

      // HUD readouts
      C.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(179,255,0,0.38)'; C.font = '8.5px JetBrains Mono,monospace';
      const deg = (rotY * 180 / Math.PI % 360 + 360) % 360;
      C.fillText(`ROT: ${deg.toFixed(1)}°`, CX + R + 26, CY - 22);
      C.fillText('DRAG: INTERACTIVE', CX + R + 26, CY - 6);
      C.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(179,255,0,0.22)';
      C.fillText('LAT: 28.6°N', CX - R - 115, CY - 8);
      C.fillText('LON: 77.2°E', CX - R - 115, CY + 8);
      C.fillText('BASE_01: ACTIVE', CX - R - 115, CY + 26);

      animationFrameId = requestAnimationFrame(draw);
    }

    // Interaction Handlers
    let timeoutId: any;
    
    const handleDown = (e: MouseEvent | TouchEvent) => {
      drag = true; 
      autoRot = false;
      if ('touches' in e) {
        lmx = e.touches[0].clientX; lmy = e.touches[0].clientY;
      } else {
        lmx = e.clientX; lmy = e.clientY;
      }
      canvas.style.cursor = 'grabbing';
      clearTimeout(timeoutId);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!drag) return;
      let cx, cy;
      if ('touches' in e) {
        cx = e.touches[0].clientX; cy = e.touches[0].clientY;
      } else {
        cx = e.clientX; cy = e.clientY;
      }
      const dx = cx - lmx, dy = cy - lmy;
      rotY += dx * .005;
      rotX = Math.max(-1.1, Math.min(1.1, rotX + dy * .004));
      lmx = cx; lmy = cy;
    };

    const handleUp = () => {
      if (!drag) return;
      drag = false;
      canvas.style.cursor = 'crosshair';
      timeoutId = setTimeout(() => { autoRot = true; }, 3500);
    };

    canvas.addEventListener('mousedown', handleDown);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    canvas.addEventListener('touchstart', handleDown, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleUp);

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      canvas.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pointer-events-auto z-10 transition-all duration-75 ease-linear will-change-transform ${className}`}
      style={{ cursor: 'crosshair' }}
    />
  );
}
