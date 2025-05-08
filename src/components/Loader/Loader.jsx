import { PropagateLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <PropagateLoader />
    </div>
  );
};

export default Loader;
