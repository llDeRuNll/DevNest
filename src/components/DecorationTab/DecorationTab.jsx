import React, { useEffect, useRef, useState } from "react";
import BalanceCard from "../BalanceCard/BalanceCard";
import s from "./DecorationTab.module.css";


const DecorationTab = () => {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const dirRef = useRef(1);
  const posRef = useRef(0);
  const frameRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    cancelAnimationFrame(frameRef.current);

    if (!isDesktop) {
      card.style.transform = "none";
      return;
    }

    const animate = () => {
      const max = wrapper.offsetWidth - card.offsetWidth + 10;
      let next = posRef.current + dirRef.current * 1.5;

      if (next <= -10 || next >= max) {
        dirRef.current *= -1;
        next = Math.max(-10, Math.min(max, next));
      }

      card.style.transform = `translateX(${next}px)`;
      posRef.current = next;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isDesktop]);

  return (
    <div ref={wrapperRef} className={s.wrapper}>
      <div
        ref={cardRef}
        className={`${s.cardWrapper} ${!isDesktop ? s.static : ""}`}
      >
        <BalanceCard />
      </div>
    </div>
  );
};

export default DecorationTab;
