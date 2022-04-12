import React from "react";
import classes from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div>
      <button
        className={`${classes.circle} ${props.active ?? "active"}`}
        data-id={props.id}
        style={props.style}
        onClick={props.click}
      ></button>
    </div>
  );
};

export default Circle;
