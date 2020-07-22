import React from "react";
import moment from "moment";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SensorEntry = ({ event: { last_sync, is_entered } }) => {
  const icon =
    is_entered === "1" ? (
      <FaArrowUp color="#4dbd74" />
    ) : (
      <FaArrowDown color="#a82f11" />
    );
  const date = moment(last_sync).fromNow();
  const text =
    is_entered === "1"
      ? `Enter event detected ${date}`
      : `Exit event detected ${date}`;
  return (
    <h4>
      {icon}&nbsp;&nbsp;{text}
    </h4>
  );
};

export default SensorEntry;
