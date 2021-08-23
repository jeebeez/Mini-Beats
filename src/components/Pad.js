import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { useGlobalContext } from "../context";

const Pad = ({ padType, index }) => {
  const {
    kickArray,
    snareArray,
    hihatArray,
    setKickArray,
    setSnareArray,
    setHihatArray,
  } = useGlobalContext();

  const padValue = useRef("soundCard");

  console.log("Pad value");

  const togglePad = (padActive) => {
    if (padActive) {
      setPadActive(0);
    } else {
      setPadActive(1);
    }
  };

  const [padActive, setPadActive] = useState(0);
  useEffect(() => {
    const switchPad = () => {
      const updateArray = (array, setArray, padActive) => {
        let a = array;

        a[index] = padActive;

        setArray([...a]);
      };
      switch (padType) {
        case "kick-pad":
          return updateArray(kickArray, setKickArray, padActive);
        case "snare-pad":
          return updateArray(snareArray, setSnareArray, padActive);
        case "hihat-pad":
          return updateArray(hihatArray, setHihatArray, padActive);
        default:
          return;
      }
    };
    switchPad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [padActive]);

  return (
    <div
      className={cn(
        `b-${index}`,
        padType,
        padActive ? "pad_active" : "pad_inactive"
      )}
      onClick={() => togglePad(padActive)}
      ref={padValue}
      key={`b-${padType}-${index}`}
    />
  );
};

export default Pad;
