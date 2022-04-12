import "./index.css";
import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Circle from "./components/Circle";
import Button from "./components/Button";
import { circles } from "./circles";
import GameOver from "./components/GameOver";

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    score: 0,
    started: true,
    active: 0,
    current: 0,
    counter: 0,
    showGameOver: false,
  };
  timer;

  clickHandler = (i) => {
    this.setState({ score: this.state.score + 5 });
  };

  nextActiveCircle = () => {
    let active;
    do {
      active = generateRandomNumber(0, 3);
    } while (active === this.state.current);

    this.setState({ current: active });
    console.log("The next active is: ", this.state.current);
    this.timer = setTimeout(this.nextActiveCircle, 1000);
  };

  startGame = () => {
    this.setState({ started: false });
    this.nextActiveCircle();
    // this.generateRandomNumber = (min, max) =>
    //   Math.floor(Math.random() * (max - min + 1)) + min;
    // const myview = () => {
    //   const { active } = this.state;
    //   const prevState = this.setState((prevState) => {
    //     return { active: prevState.active };
    //   });
    //   setInterval(
    //     () => this.setState({ active: this.generateRandomNumber(1, 4) }),
    //     1500
    //   );
    //   if (prevState === active) {
    //     this.generateRandomNumber(1, 4);
    //   } else {
    //     return active;
    //   }
    // };
    // this.setState({
    //   active: myview(),
    // });
  };

  endGame = () => {
    this.setState({ started: true });
    this.setState({ showGameOver: true });
    clearTimeout(this.timer);
  };

  handleClick = (e) => {
    if (e.target.dataset === this.active) {
      this.setState({ counter: this.state.counter + 1 });
    }
    console.log(e.target.dataset.value);
  };

  closeHandler = () => {
    window.location.reload();
  };

  inputStyle = {
    backgroundColor: "red",
  };
  render() {
    return (
      <div className="App">
        <Header />
        <div className="scoreboard">
          <h2>Your Score:</h2>
        </div>
        <div className="score">
          <h2 id="score">{this.state.score}</h2>
        </div>
        {/* <div className="circles">
          <div>
            {this.state.active === 1 ? (
              <Circle id={1} click={(e) => this.handleClick(e, "id")} />
            ) : (
              <Circle style={this.inputStyle} />
            )}
          </div>
          <div>
            {this.state.active === 2 ? (
              <Circle id={2} click={(e) => this.handleClick(e, "id")} />
            ) : (
              <Circle style={this.inputStyle} />
            )}
          </div>
          <div>
            {this.state.active === 3 ? (
              <Circle id={3} click={(e) => this.handleClick(e, "id")} />
            ) : (
              <Circle style={this.inputStyle} />
            )}
          </div>
          <div>
            {this.state.active === 4 ? (
              <Circle id={4} click={(e) => this.handleClick(e, "id")} />
            ) : (
              <Circle style={this.inputStyle} />
            )}
          </div>
        </div> */}
        <div className="circles">
          {circles.map((_, index) => (
            <Circle
              key={index}
              id={index}
              active={this.state.current === index}
              click={() => this.clickHandler(index)}
            />
          ))}
        </div>
        <div>
          {this.state.showGameOver && (
            <GameOver score={this.state.score} close={this.closeHandler} />
          )}
        </div>
        <div className="buttonsContainer">
          {this.state.started ? (
            <Button text="Start Game" start_end={this.startGame} />
          ) : (
            <Button text="End Game" start_end={this.endGame} />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
