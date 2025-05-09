import { useMediaQuery } from "react-responsive";

const useIsDesktop = () => {
  return useMediaQuery({ minWidth: 1280 });
};

export default useIsDesktop;
