import React from "react";
import "./FloorDisplay.css";

const FloorDisplay = (props) => {
  const { currentFloor } = props;

  return (
    <div className="FloorDisplay">
      <div className="floorInfo">Current Floor: {currentFloor}</div>
    </div>
  );
};

export default FloorDisplay;
