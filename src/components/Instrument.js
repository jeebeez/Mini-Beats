import React from "react";

function Instrument(props) {
  function switchInstrument(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        props.setKickAudio(selectionValue);
        break;
      case "snare-select":
        props.setSnareAudio(selectionValue);
        break;
      case "hihat-select":
        props.setHihatAudio(selectionValue);
        break;
      default:
        return;
    }
  }
  return (
    <div className="selector">
      <select
        name={props.instrument}
        className="select"
        onChange={(e) => switchInstrument(e)}
      >
        {props.sound.map(({ sound, soundName }) => (
          <option value={`/sounds/${sound}`} key={soundName}>
            {soundName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Instrument;
