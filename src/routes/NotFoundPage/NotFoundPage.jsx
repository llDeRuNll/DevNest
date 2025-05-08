import s from "./NotFoundPage.module.css";
import { FaRegFaceSadTear } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <>
      <h1 className={s.header}>
        Oops! Something went wrong.Please try again or refresh the page.
        <FaRegFaceSadTear />
      </h1>
    </>
  );
};

export default NotFoundPage;
