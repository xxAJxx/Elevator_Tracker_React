import "./styles.css";
import Dial from "../Dial/";
import * as React from "react";

const Dialer = (props) => {
  const getButtons = React.useCallback(() => {
    const buttons = [];
    for (let i = 9; i >= 0; i--) {
      if (i !== 0) {
        buttons.push(<Dial {...props} key={i} value={i} />);
      } else {
        buttons.push(<Dial {...props} key={"open"} value={"open"} />);
        buttons.push(<Dial {...props} key={i} value={i} />);
        buttons.push(<Dial {...props} key={"close"} value={"close"} />);
      }
    }
    return buttons;
  }, [props]);
  return <div className="Dialer">{getButtons()}</div>;
};

export default Dialer;
