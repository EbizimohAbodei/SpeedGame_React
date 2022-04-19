import "./index.css";
import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Circle from "./components/Circle";
import Button from "./components/Button";
import GameOver from "./components/GameOver";

import game_over from "./assets/sounds/game_over.mp3";
import gameStart from "./assets/sounds/gameStart.mp3";
import click from "./assets/sounds/click.wav";

const startSound = new Audio(gameStart);
const stopSound = new Audio(game_over);
const clickSound = new Audio(click);

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    difficultyLevel: "",
    disableStartButton: true,
    playerName: "",
    score: 0,
    gameStarted: false,
    randomNumb: 0,
    modalMessage: "",
    current: -1,
    counter: 0,
    showGameOver: false,
    circle: [],
    pace: 1400,
    rounds: 0,
  };
  timer = undefined;

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  clickHandler = (i) => {
    clickSound.play();
    if (this.state.current === i) {
      this.setState({ score: this.state.score + 5 });
    } else if (this.state.current !== i) {
      this.endGame();
      return;
    }
  };

  nextActiveCircle = () => {
    if (this.state.rounds >= 3) {
      this.endGame();
      return;
    }
    let active;
    do {
      active = generateRandomNumber(0, this.state.randomNumb);
    } while (active === this.state.current);

    this.setState({
      current: active,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextActiveCircle, this.state.pace);
  };

  startGame = () => {
    stopSound.pause();
    startSound.play();
    startSound.loop = true;
    this.setState({ gameStarted: true });
    this.nextActiveCircle();
  };

  handleDifficulty = (e) => {
    switch (e.target.dataset.id) {
      case "easy":
        this.setState({
          difficultyLevel: "easy",
          circle: [0, 0, 0, 0],
          randomNumb: 3,
        });
        break;
      case "medium":
        this.setState({
          difficultyLevel: "medium",
          circle: [0, 0, 0, 0, 0],
          randomNumb: 4,
        });
        break;
      case "hard":
        this.setState({
          difficultyLevel: "hard",
          circle: [0, 0, 0, 0, 0, 0],
          randomNumb: 5,
        });
        break;
      default:
        this.setState({ difficultyLevel: " " });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.playerName.value });
    console.log(e.target.playerName.value);
  };

  endGame = () => {
    clickSound.pause();
    startSound.pause();
    stopSound.play();
    this.setState({
      gameStarted: false,
      showGameOver: true,
      disableStartButton: false,
    });
    clearTimeout(this.timer);
  };

  closeHandler = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="difficulty">
          {!this.state.playerName && [
            <h3 className="playerLabel" key={""}>
              Enter your name below
            </h3>,
            <form key={"PlayerName"} onSubmit={this.handleSubmit}>
              <input className="playerName" name="playerName" type="text" />
              <input className="submit" type="submit" value="Submit" />
            </form>,
          ]}
          {!this.state.difficultyLevel && [
            <h3 className="levelText" key={"default"}>
              Select Difficulty Level
            </h3>,
            <Button
              key={"easy"}
              id={"easy"}
              handleClick={(e) => this.handleDifficulty(e, "id")}
              text="easy"
            />,
            <Button
              key={"medium"}
              id={"medium"}
              handleClick={(e) => this.handleDifficulty(e, "id")}
              text="medium"
            />,
            <Button
              key={"hard"}
              id={"hard"}
              handleClick={(e) => this.handleDifficulty(e, "id")}
              text="hard"
            />,
          ]}
        </div>
        <div className="circles">
          {this.state.playerName &&
            this.state.difficultyLevel && [
              <div key={"score"}>
                {" "}
                <div className="scoreboard">
                  <h2>Your Score:</h2>
                </div>
                <div className="score">
                  <h2 id="score">{this.state.score}</h2>
                </div>
              </div>,
              <div className="circleContainer" key={"circle"}>
                {this.state.circle.map((_, index) => (
                  <Circle
                    disabled={this.state.gameStarted ? "auto" : "none"}
                    key={index}
                    id={index}
                    active={this.state.current === index}
                    click={() => this.clickHandler(index)}
                  />
                ))}
              </div>,
            ]}
        </div>
        <div>
          {this.state.showGameOver && (
            <GameOver
              score={this.state.score}
              // message={this.modalMessage.state}
              close={this.closeHandler}
            />
          )}
        </div>
        <div>
          {this.state.playerName && this.state.difficultyLevel && (
            <div className="buttonsContainer">
              {!this.state.gameStarted && this.state.disableStartButton ? (
                <Button text="Start Game" handleClick={this.startGame} />
              ) : (
                <Button text="End Game" handleClick={this.endGame} />
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
