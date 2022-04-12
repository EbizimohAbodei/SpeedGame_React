import React from "react";

const GameOver = (props) => {
  return (
    <div className="overlay">
      <div className="gameEndPopup">
        <button onClick={props.close}></button>
        <h4>Your score is score={props.score}</h4>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default GameOver;
