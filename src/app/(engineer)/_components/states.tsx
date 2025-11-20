import React from "react";
import StateCard from "./state-card";

const States = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <StateCard title="Active Projects" value="5" image="/state-1.png" />
      <StateCard title="Completed Projects" value="5" image="/state-2.png" />
      <StateCard title="Pending Requests" value="5" image="/state-3.png" />
    </div>
  );
};

export default States;
