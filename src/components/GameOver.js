import React from "react";
import classes from "./gameOver.module.css";

const GameOver = (props) => {
  let message = "";
  if (props.score <= 40) {
    message = "You can do better";
  } else if (props.score >= 100) {
    message = "Nice! Your a rockstar";
  } else if (props.score >= 70) {
    message = "Woah! Maestro";
  } else {
    message = "";
  }

  return (
    <div className={classes.gameOver}>
      <div className="gameEndPopup">
        <button className={classes.closeBtn} onClick={props.close}>
          x
        </button>
        <h4 className={classes.gameOverText}>GAMEOVER</h4>
        <h3 className={classes.scoreText}>Your score:</h3>
        <h4 className="score">{props.score}</h4>
        <p className={classes.message}>{message}</p>
      </div>
    </div>
  );
};

export default GameOver;
