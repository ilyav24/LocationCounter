import React from "react";
import moment from "moment";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SensorEntry = ({ event: { last_sync, is_entered } }) => {
  const icon =
    is_entered === "1" ? <FaArrowRight color="#a82f11" /> : <FaArrowLeft color="#4dbd74"/>;
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
