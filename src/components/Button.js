import React from "react";

const Button = (props) => {
  return (
    <div className="buttonContainer">
      <button
        className="buttons"
        onClick={props.start_end}
        type={props.type || "button"}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
