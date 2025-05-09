import DecorationTab from "./DecorationTab";
import s from "../BgImageWrapper.module.css";
const BgImageWrapper = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.backgroundImage}></div>
      <DecorationTab />
    </div>
  );
};
export default BgImageWrapper;
