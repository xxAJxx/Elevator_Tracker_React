import React, { useState, useEffect } from "react";
import Building from "./components/Building/Building";
import Dialer from "./components/Dialer/";
import Elevator from "./components/Elevator";
import "./styles.css";
import FloorDisplay from "./FloorDisplay";

const initState = {
  liftPosn: 0,
  upFlrs: [],
  downFlrs: [],
  selectedFloor: [],
  direction: null,
  open: false,
  move: false,
  buttonPressed: null,
};

export default function App() {
  const [appState, updateApp] = useState(initState);
  const [currentFloor, setCurrentFloor] = useState(0);

  const moveLift = (liftPosn) => {
    console.log("appState", appState);
    if (!appState.liftPosn) {
      let liftDirection = "up";
      let liftPosn = appState.upFlrs[0];
      const selectedFloor = appState.upFlrs.slice(1, appState.upFlrs.length);
      updateApp((prevState) => {
        return {
          ...prevState,
          liftPosn,
          direction: liftDirection,
          upFlrs: selectedFloor
        };
      });
    } else {
      let isUp = appState.direction === "up";
      let direction = isUp ? "up" : "down";
      if (!appState.upFlrs.length && !appState.downFlrs.length) {
        updateApp((prevState) => {
          return {
            ...prevState,
            direction: null,
            move: false
          };
        });
        return;
      }

      if (isUp) {
        if (appState.upFlrs.length) {
          const upFlrs = [...appState.upFlrs];
          let liftPosn = upFlrs.shift();
          direction =
            !upFlrs.length && !appState.downFlrs.lenght ? null : direction;
          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              direction: direction,
              upFLrs: upFlrs
            };
          });
        } else if (appState.downFlrs.length) {
          direction = "down";
          isUp = false;
          const downFloorArr = [...appState.downFlrs];
          const liftPosn = downFloorArr.shift();
          direction =
            !downFloorArr.length && !appState.upFlrs.lenght ? null : direction;
          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              direction: direction,
              downFlrs: downFloorArr
            };
          });
        }
      } else {
        if (appState.downFlrs.length) {
          const downFloorArr = [...appState.downFlrs];
          const liftPosn = downFloorArr.shift();
          direction =
            !downFloorArr.length && !appState.upFlrs.lenght ? null : direction;

          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              downFlrs: downFloorArr
            };
          });
        } else if (appState.upFlrs.length) {
          direction = "up";
          isUp = true;
          const upFlrArr = [...appState.upFlrs];
          const liftPosn = upFlrArr.shift();
          direction =
            !upFlrArr.length && !appState.downFlrs.lenght ? null : direction;
          updateApp((prevState) => {
            return {
              ...prevState,
              liftPosn,
              direction: direction,
              upFlrs: upFlrArr
            };
          });
        }
      }
    }
  };

  /**
   * floor: number  -
   * @return void
   *  */
  const onFloorSelect = (floor, direction = null) => {
    if (floor === appState.liftPosn) {
      return;
    }
    let isUp = false;
    if (direction) {
      isUp = direction === "up";
    } else {
      const currPosition = appState.liftPosn || 0;
      isUp = floor > currPosition;
    }

    updateApp((prevState) => {
      return {
        ...prevState,
        upFlrs: isUp
          ? [...prevState.upFlrs, floor].sort((a, b) => a - b)
          : prevState.upFlrs,
        move: true,
        downFlrs: !isUp
          ? [...prevState.downFlrs, floor].sort((a, b) => b - a)
          : prevState.downFlrs
      };
    });
  };

  const openLift = () => {
    updateApp((prevState) => {
      return {
        ...prevState,
        open: true
      };
    });

    setTimeout(() => {
      updateApp((prevState) => {
        return {
          ...prevState,
          open: false
        };
      });
    }, 3000);
  };

  const closeLift = () => {
    updateApp((prevState) => {
      return {
        ...prevState,
        open: false
      };
    });
    moveLift();
  };


  const simulateButtonPress = () => {
    const randomFloor = Math.floor(Math.random() * 10) + 1; // Generates a random floor (1 to 10)
    onFloorSelect(randomFloor);
  };


  React.useEffect(() => {
    moveLift();
  }, [appState.move]);

  React.useEffect(() => {
    if (!appState.open) {
      const buttonPressInterval = setInterval(simulateButtonPress, 3000); // Press a button every 3 seconds
      return () => clearInterval(buttonPressInterval);
    }
  }, [appState.open]);

  React.useEffect(() => {
    console.log("lift called");
    setTimeout(() => {
      moveLift();
    }, 3000);
  }, [appState.liftPosn]);

  React.useEffect(() => {
    setCurrentFloor(appState.liftPosn);
  }, [appState.liftPosn]);

  return (
    <div className="App">
      <div className="elevatorContainer">
        <Building
          floors={10}
          selectedFloor={appState.selectedFloor}
          onFloorSelect={onFloorSelect}
          buttonPressed={appState.buttonPressed} // Pass the buttonPressed state
        />
        <Elevator
          liftPosn={appState.liftPosn}
          isOpen={appState.open}
          selectedFloor={appState.selectedFloor}
          buttonPressed={appState.buttonPressed} // Pass the buttonPressed state
        />
        <Dialer
          selectedFloor={[...appState.upFlrs, ...appState.downFlrs]}
          onFloorSelect={onFloorSelect}
          closeLift={closeLift}
        />
      </div>
      <FloorDisplay currentFloor={currentFloor} /> {/* Add the FloorDisplay component */}
    </div>
  );
}