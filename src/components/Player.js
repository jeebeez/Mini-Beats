import React, { useState, useEffect, useMemo } from "react";
import Pad from "./Pad";
import { useGlobalContext } from "../context";
import Instrument from "./Instrument";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [bpm, setBpm] = useState("150");

  const {
    arr,

    kickSounds,
    snareSounds,
    hihatSounds,
  } = useGlobalContext();

  const [kickAudio, setKickAudio] = useState("/sounds/kick-classic.wav");
  const [snareAudio, setSnareAudio] = useState("/sounds/snare-808.wav");
  const [hihatAudio, setHihatAudio] = useState("/sounds/hihat-808.wav");

  const kickAudioSound = useMemo(() => new Audio(kickAudio), [kickAudio]);
  const snareAudioSound = useMemo(() => new Audio(snareAudio), [snareAudio]);
  const hihatAudioSound = useMemo(() => new Audio(hihatAudio), [hihatAudio]);

  let index = 0;
  const playBtn = document.querySelector(".play");

  console.log(kickAudioSound);

  const repeat = () => {
    const step = index % 15;
    const activeBars = document.querySelectorAll(`.b-${step}`);


    // Loop over the pads
    activeBars.forEach((bar) => {
      if (bar.classList.contains("pad_active")) {
        if (bar.classList.contains("kick-pad")) {
          kickAudioSound.currentTime = 0;
          kickAudioSound.play();
        }
        if (bar.classList.contains("snare-pad")) {
          snareAudioSound.currentTime = 0;
          snareAudioSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          hihatAudioSound.currentTime = 0;
          hihatAudioSound.play();
        }
      }
    });
    index++;
  };

  const start = () => {
    const interval = (60 / bpm) * 1000;

    // clearInterval(isPlaying);
    // setIsPlaying(null);
    // if (isPlaying) {
    //   //Clear the interval
    //   clearInterval(isPlaying);
    //   console.log(isPlaying);
    //   setIsPlaying(null);
    // } else {
    setIsPlaying(
      setInterval(() => {
        repeat();
      }, interval)
    );
    // }
  };

  const stop = () => {
    clearInterval(isPlaying);
    setIsPlaying(null);
  };

  const updateBtn = () => {
    playBtn.classList.add("active");
    // !isPlaying
    //   ? playBtn.classList.add("active")
    //   : playBtn.classList.remove("active");
  };

  const updateStopBtn = () => {
    playBtn.classList.remove("active");
  };

  useEffect(() => {
    kickAudioSound.src = kickAudio;
    snareAudioSound.src = snareAudio;
    hihatAudioSound.src = hihatAudio;
  }, [
    kickAudio,
    snareAudio,
    hihatAudio,
    kickAudioSound,
    snareAudioSound,
    hihatAudioSound,
  ]);

  useEffect(() => {
    // if (initial.current) {
    //   initial.current = false;
    clearInterval(isPlaying);
    setIsPlaying(null);
    //   return;
    // }
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      start();
    }
    return () => {
      // clearInterval(isPlaying);
      // setIsPlaying(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm]);

  // const updateTempo = (e) => {
  //   console.log("Reached here useEffect isPlaying", isPlaying);

  //   clearInterval(isPlaying);
  //   console.log("Reached here useEffect isPlaying", isPlaying);

  //   setIsPlaying(null);
  //   console.log("Reached here useEffect isPlaying", isPlaying);

  //   const playBtn = document.querySelector(".play");
  //   setBpm(e.target.value);
  //   if (playBtn.classList.contains("active")) {
  //     start();
  //   }
  // };

  return (
    <div className="player">
      <div className="playBtn">
        <button
          className="play"
          onClick={() => {
            start();
            updateBtn();
          }}
          disabled={isPlaying}
        >
          Play
        </button>
        <button
          className="play stop"
          onClick={() => {
            stop();
            updateStopBtn();
          }}
          disabled={!isPlaying}
        >
          Stop
        </button>
      </div>
      <div className="tempo">
        <p>
          Tempo-<span className="tempo-nr">{bpm}</span>
        </p>
        <input
          type="range"
          className="tempo-slider"
          max="300"
          min="10"
          value={bpm}
          onChange={(e) => {
            setBpm(e.target.value);
          }}
        />
      </div>
      <div className="board">
        <div className="kicks">
          <Instrument
            sound={[...kickSounds]}
            instrument="kick-select"
            setKickAudio={setKickAudio}
          />
          {arr.map((_, index) => (
            <Pad padType={"kick-pad"} index={index} />
          ))}
        </div>
        <div className="snares">
          <Instrument
            sound={[...snareSounds]}
            instrument="snare-select"
            setSnareAudio={setSnareAudio}
          />
          {arr.map((_, index) => (
            <Pad padType={"snare-pad"} index={index} />
          ))}
        </div>
        <div className="drums">
          <Instrument
            sound={[...hihatSounds]}
            instrument="hihat-select"
            setHihatAudio={setHihatAudio}
          />
          {arr.map((_, index) => (
            <Pad padType={"hihat-pad"} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;
