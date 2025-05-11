
import React, { useRef } from "react";
import DecorationTab from "../DecorationTab/DecorationTab";
import s from "./BgImageWrapper.module.css";

const BgImageWrapper = () => {
  const backgroundRef = useRef(null);

  return (
    <div className={s.wrapper} ref={backgroundRef}>

      <div className={s.backgroundImage}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="/imgWelcomePage/Rec2xDesktop.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/imgWelcomePage/Rec2xLopTop.jpg"
          />
          <img
            src="/imgWelcomePage/Rec2xMob.jpg"
            alt="Welcome"
            className={s.mainImg}
          />
        </picture>


        <DecorationTab parentRef={backgroundRef} />

      </div>
    </div>
  );
};

export default BgImageWrapper;
