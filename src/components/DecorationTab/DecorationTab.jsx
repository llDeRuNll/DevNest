import React, { useEffect, useRef, useState } from "react";
import BalanceCard from "../BalanceCard/BalanceCard";
import s from "./DecorationTab.module.css";

const DecorationTab = ({ parentRef }) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const posX = useRef(0);
  const posY = useRef(0);
  const dirX = useRef(1);
  const dirY = useRef(1);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);

    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {

    const wrapper = parentRef?.current;
    const card = cardRef.current;
    if (!wrapper || !card || !isDesktop) return;

    cancelAnimationFrame(frameRef.current);
    const speed = 1.6;

    const animate = () => {
      const maxX = wrapper.clientWidth - card.offsetWidth;
      const maxY = wrapper.clientHeight - card.offsetHeight;

      let nextX = posX.current + dirX.current * speed;
      let nextY = posY.current + dirY.current * speed;

      if (nextX <= 0 || nextX >= maxX) {
        dirX.current *= -1;
        nextX = Math.max(0, Math.min(maxX, nextX));
      }

      if (nextY <= 0 || nextY >= maxY) {
        dirY.current *= -1;
        nextY = Math.max(0, Math.min(maxY, nextY));
      }

      card.style.transform = `translate(${nextX}px, ${nextY}px)`;
      posX.current = nextX;
      posY.current = nextY;


      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);


    return () => cancelAnimationFrame(frameRef.current);
  }, [isDesktop, parentRef]);

  return (
    <div className={s.wrapper}>

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
