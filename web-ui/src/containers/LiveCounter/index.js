import React, { useEffect, useState } from "react";
import moment from "moment";
import { RiRadioButtonLine } from "react-icons/ri";

async function getCount(type, id) {
  const body = {
    to: moment().add(3, "days"),
  };

  let requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${process.env.REACT_APP_BASE_API_URL}/stats/${type}/${id}`, requestOptions);
}

export const LiveCounter = ({ type, id }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCount(type, id).then((res) => res.json());
      const { num } = data ? data[0] : "Error";
      setCount(num);
    }
    let interval;
    if (id) {
      fetchData();

      // run in loops
      interval = setInterval(() => {
        fetchData();
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    }
  }, [id]);

  return (
    <h6>
      {count} <RiRadioButtonLine color="red" />
    </h6>
  );
};
