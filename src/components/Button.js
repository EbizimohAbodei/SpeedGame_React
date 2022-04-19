import React from "react";

const Button = (props) => {
  return (
    <div className="buttonContainer">
      <button
        className="buttons"
        data-id={props.id}
        onClick={props.handleClick}
        type={props.type || "button"}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
