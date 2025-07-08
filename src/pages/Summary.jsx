import React from "react";
import Header3 from "../components/Header3";

const Summary = () => {
  return (
    <div>
      <Header3 title="Order Summary" />
      <div className="flex justify-center items-center  border-t border-gray-300 py-2">
        <img src="/assets/images/svg/p2.svg" alt="" />
      </div>
            <div className="h-2 bg-gray-100"></div>

    </div>
  );
};

export default Summary;
