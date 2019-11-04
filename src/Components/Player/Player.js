import React from "react";
import "./Player.css";
import Timer from "../Timer/Timer"

const Player = props => {

  const backgroundStyles = {
    backgroundImage:`url(${
      props.item.album.images[0].url
    })`,
  };

  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };


  const t = new Date(props.progress_ms)
  const t_min = t.getUTCMinutes()
  const t_sec = (t.getUTCSeconds() < 10) ? `0${t.getUTCSeconds()}` : t.getUTCSeconds()

  const clockTime = t_min + ':' + t_sec

  return (
    <div className="App">
      <Timer interval_ms={1000} tick={props.onTick} />
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {props.is_playing ? `Playing ${clockTime}` : `Paused ${clockTime}` }
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />
      </div>
    </div>
  );
}

export default Player;