import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const step = 16;
  const arr = new Array(step).fill(0);

  const [kickArray, setKickArray] = useState(arr);
  const [snareArray, setSnareArray] = useState(arr);
  const [hihatArray, setHihatArray] = useState(arr);

  // console.log("kickArray :", kickArray);
  // console.log("snareArray :", snareArray);
  // console.log("hihatArray :", hihatArray);

  const kickSounds = [
    { sound: "kick-classic.wav", soundName: "Classic Kick" },
    { sound: "kick-heavy.wav", soundName: "Heavy Kick" },
    { sound: "kick-softy.wav", soundName: "Soft Kick" },
  ];

  const snareSounds = [
    { sound: "snare-808.wav", soundName: "808 Snare" },
    { sound: "snare-acoustic01.wav", soundName: "ACoustic Snare" },
    { sound: "snare-vinyl02.wav", soundName: "Vinyl Snare" },
  ];

  const hihatSounds = [
    { sound: "hihat-808.wav", soundName: "808 Hihat" },
    { sound: "hihat-acoustic.wav", soundName: "Acoustic Hihat" },
  ];

  const clapSounds = [
    { sound: "kick-classic.wav", soundName: "Classic Kick" },
    { sound: "kick-classic.wav", soundName: "Classic Kick" },
    { sound: "kick-classic.wav", soundName: "Classic Kick" },
  ];

  return (
    <AppContext.Provider
      value={{
        arr,
        kickArray,
        snareArray,
        hihatArray,
        setKickArray,
        setSnareArray,
        setHihatArray,
        kickSounds,
        snareSounds,
        hihatSounds,
        clapSounds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
