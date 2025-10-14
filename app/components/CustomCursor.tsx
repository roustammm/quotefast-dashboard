"use client";

import { useEffect } from 'react';

export function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      (cursorDot as HTMLElement).style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      (cursorOutline as HTMLElement).style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
      animationId = requestAnimationFrame(animateOutline);
    };

    const handleMouseEnter = () => cursorOutline.classList.add('hover');
    const handleMouseLeave = () => cursorOutline.classList.remove('hover');

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const removeListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(animateOutline);
    addListeners();

    const mutationObserver = new MutationObserver(() => {
      removeListeners();
      addListeners();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      removeListeners();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
    </>
  );
}
