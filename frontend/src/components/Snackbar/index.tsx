import * as Styled from "./style";
import ReactDOM from "react-dom";
import { useRecoilState } from "recoil";
import { snackbarState } from "@src/@atoms";
import { useEffect, useRef } from "react";

function Snackbar() {
  const [{ isOpened, message }, setState] = useRecoilState(snackbarState);

  const element = document.querySelector("#portal-root");
  const ref = useRef<any>({
    element: null,
    timeout: null,
  });

  useEffect(() => {
    if (isOpened) {
      if (ref.current.timeout) {
        const [showAnimation] = ref.current.element.getAnimations();

        showAnimation?.cancel();
        showAnimation?.play();
        clearTimeout(ref.current.timeout);
      }

      ref.current.timeout = setTimeout(() => {
        setState({
          isOpened: false,
          message: "",
        });
      }, 3000);
    }
  });

  return isOpened && element
    ? ReactDOM.createPortal(
        <Styled.Container ref={(el) => (ref.current.element = el)}>
          {message}
        </Styled.Container>,
        element
      )
    : null;
}

export default Snackbar;
