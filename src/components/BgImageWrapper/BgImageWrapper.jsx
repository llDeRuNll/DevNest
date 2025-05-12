import DecorationTab from "../DecorationTab/DecorationTab";
import s from "./BgImageWrapper.module.css";

const BgImageWrapper = ({ parentRef }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.backgroundImage} ref={parentRef}>
        <picture>
          <source
            type="image/avif"
            media="(min-width: 1440px)"
            srcSet="
              /imgWelcomePage/hero-desk.avif ,
              /imgWelcomePage/hero-desk@2x.avif ,
              
            "
            loading="lazy"
          />

          <source
            type="image/avif"
            media="(min-width: 768px)"
            srcSet="
              /imgWelcomePage/hero-tab.avif ,
              /imgWelcomePage/hero-tab@2x.avif ,
             
            "
            loading="lazy"
          />

          <source
            type="image/avif"
            srcSet="
              /imgWelcomePage/hero-mob.avif ,
              /imgWelcomePage/hero-mob@2x.avif ,
              
            "
            loading="lazy"
          />

          <img
            src="/imgWelcomePage/hero-mob.avif "
            srcSet=" /imgWelcomePage/hero-mob@2x.avif "
            alt="Welcome"
            className={s.mainImg}
            loading="lazy"
          />
        </picture>

        <DecorationTab parentRef={parentRef} />
      </div>
    </div>
  );
};

export default BgImageWrapper;
