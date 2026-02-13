import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "../contexts/ThemeContext";

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  mobileBreakpoint = 768,
}) => {
  const { isDarkMode: drakeMode } = useTheme();
  const cursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches;
      setIsMobile(mobile);
      if (mobile) {
        document.body.style.cursor = 'auto';
      } else if (hideDefaultCursor) {
        document.body.style.cursor = 'none';
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.body.style.cursor = 'auto';
    };
  }, [mobileBreakpoint, hideDefaultCursor]);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      const corners = cursor.querySelectorAll(".target-cursor-corner");
      let activeTarget = null;
      let resumeTimeout = null;
      let isAnimatingToTarget = false;

      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      const spinTl = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

      const moveCursor = (x, y) => {
        gsap.to(cursor, {
          x,
          y,
          duration: 0.1,
          ease: "power3.out",
          overwrite: true
        });
      };

      const updateCorners = (target, mouseX, mouseY) => {
        if (!target || !cursor || corners.length < 4) return;

        const rect = target.getBoundingClientRect();
        const cursorRect = cursor.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let offsets = [
          { x: rect.left - cursorCenterX - borderWidth, y: rect.top - cursorCenterY - borderWidth },
          { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.top - cursorCenterY - borderWidth },
          { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.bottom - cursorCenterY + borderWidth - cornerSize },
          { x: rect.left - cursorCenterX - borderWidth, y: rect.bottom - cursorCenterY + borderWidth - cornerSize },
        ];

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;
          offsets = offsets.map(off => ({ x: off.x + mouseOffsetX, y: off.y + mouseOffsetY }));
        }

        corners.forEach((corner, index) => {
          gsap.to(corner, {
            x: offsets[index].x,
            y: offsets[index].y,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true
          });
        });
      };

      const handleWindowMouseMove = (e) => {
        if (!activeTarget) {
          moveCursor(e.clientX, e.clientY);
        } else {
          // If we have an active target, we still want the "center dot" to follow a bit or update corners
          // But usually we just update corners based on move over the target
        }
      };

      const handleMouseOver = (e) => {
        const target = e.target.closest(targetSelector);
        if (!target || activeTarget === target) return;

        activeTarget = target;
        if (resumeTimeout) {
          clearTimeout(resumeTimeout);
          resumeTimeout = null;
        }

        spinTl.pause();
        gsap.to(cursor, { rotation: 0, duration: 0.2, overwrite: true });

        isAnimatingToTarget = true;
        updateCorners(target);
        setTimeout(() => { isAnimatingToTarget = false; }, 10);
      };

      const handleMouseMoveOnTarget = (e) => {
        if (!activeTarget || isAnimatingToTarget) return;
        updateCorners(activeTarget, e.clientX, e.clientY);
      };

      const handleMouseOut = (e) => {
        const target = e.target.closest(targetSelector);
        if (!target || target !== activeTarget) return;

        activeTarget = null;
        isAnimatingToTarget = false;

        const { cornerSize } = constants;
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
        ];

        corners.forEach((corner, index) => {
          gsap.to(corner, {
            x: positions[index].x,
            y: positions[index].y,
            duration: 0.3,
            ease: "power3.out",
            overwrite: true
          });
        });

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursor) {
            const currentRotation = gsap.getProperty(cursor, "rotation") % 360;
            spinTl.play();
            gsap.fromTo(cursor, { rotation: currentRotation }, {
              rotation: currentRotation + 360,
              duration: spinDuration,
              ease: "none",
              onComplete: () => spinTl.play()
            });
          }
        }, 50);
      };

      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
      window.addEventListener("mousemove", handleMouseMoveOnTarget);
      window.addEventListener("mouseout", handleMouseOut);

      return () => {
        window.removeEventListener("mousemove", handleWindowMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
        window.removeEventListener("mousemove", handleMouseMoveOnTarget);
        window.removeEventListener("mouseout", handleMouseOut);
        if (resumeTimeout) clearTimeout(resumeTimeout);
      };
    }, cursorRef);

    return () => ctx.revert();
  }, [isMobile, targetSelector, spinDuration, constants]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    >
      <div className={`absolute left-1/2 top-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2 ${drakeMode ? 'bg-white' : 'bg-black'}`} />
      <div className={`target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0 ${drakeMode ? 'border-white' : 'border-black'}`} />
      <div className={`target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0 ${drakeMode ? 'border-white' : 'border-black'}`} />
      <div className={`target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] translate-x-1/2 translate-y-1/2 border-l-0 border-t-0 ${drakeMode ? 'border-white' : 'border-black'}`} />
      <div className={`target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0 ${drakeMode ? 'border-white' : 'border-black'}`} />
    </div>
  );
};

export default TargetCursor;
