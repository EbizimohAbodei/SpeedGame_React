import React from "react";
// import classes from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div>
      <button
        className={`circle ${props.active ? "active" : ""}`}
        style={{ pointerEvents: props.disabled }}
        data-id={props.id}
        onClick={props.click}
      ></button>
    </div>
  );
};

export default Circle;
