import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

export default function (props) {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: "100",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 0px 10px",
        }}
      >
        <Loader
          type="Oval"
          color="#2BAD60"
          height="100"
          width="100"
          timeout={3000}
        />
      </div>
    )
  );
}
