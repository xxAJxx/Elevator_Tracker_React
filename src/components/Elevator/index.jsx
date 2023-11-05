import React, { useEffect, useState } from "react";
import "./styles.css";

const Elevator = (props) => {
  const { isOpen, liftPosn, buttonPressed } = props;
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    // When a button is pressed, add the floor to the list
    if (buttonPressed) {
      setFloors((prevFloors) => [...prevFloors, liftPosn]);
    }
  }, [buttonPressed, liftPosn]);

  const floor = 9 - liftPosn;
  const elevStyles = {
    top: `${floor * 100 + 220}px`,
  };
  const compClass = `flexRow elev ${isOpen ? "open" : "close"}`;

  return (
    <div style={elevStyles} className={compClass}>
      {floors.map((floor, index) => (
        <div key={index} className="floorLabel">
          {floor}
        </div>
      ))}
      <div className="gate left" />
      <div className="gate right" />
    </div>
  );
};

export default Elevator;
